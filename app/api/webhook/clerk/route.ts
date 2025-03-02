import { Webhook } from "svix"
import { headers } from "next/headers"
import type { WebhookEvent } from "@clerk/nextjs/server"
import { clerkClient } from "@clerk/nextjs"
import { getClient } from "@/lib/db"

export async function POST(req: Request) {
  // Get the headers
  const headerPayload = headers()
  const svix_id = headerPayload.get("svix-id")
  const svix_timestamp = headerPayload.get("svix-timestamp")
  const svix_signature = headerPayload.get("svix-signature")

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.error("Error occurred -- missing svix headers")
    return new Response("Error occurred -- missing svix headers", {
      status: 400,
    })
  }

  // Get the body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  // Create a new Svix instance with your webhook secret
  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET || ""

  if (!webhookSecret) {
    console.error("Error: CLERK_WEBHOOK_SECRET is not set")
    return new Response("Error: Webhook secret not configured", {
      status: 500,
    })
  }

  const wh = new Webhook(webhookSecret)

  let evt: WebhookEvent

  // Verify the webhook
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error("Error verifying webhook:", err)
    return new Response("Error verifying webhook signature", {
      status: 400,
    })
  }

  // Handle the webhook
  const eventType = evt.type

  console.log(`Processing webhook: ${eventType}`)

  if (eventType === "user.created") {
    const { id, email_addresses, first_name, last_name } = evt.data
    const primaryEmail = email_addresses[0]?.email_address

    if (!primaryEmail) {
      console.error("User created without email address")
      return new Response("User created without email address", { status: 400 })
    }

    // Set default role as pet_owner
    let role = "pet_owner"

    // Check for admin emails
    if (primaryEmail?.endsWith("@fluffypet.com")) {
      role = "admin"
    }

    try {
      // Update user metadata
      await clerkClient.users.updateUser(id, {
        publicMetadata: {
          role,
        },
        privateMetadata: {
          createdAt: new Date().toISOString(),
        },
      })

      console.log(`Updated Clerk user ${id} with role ${role}`)

      // Create user in your database
      try {
        const client = getClient()
        const query = `
          INSERT User {
            id := <str>$id,
            email := <str>$email,
            first_name := <str>$firstName,
            last_name := <str>$lastName,
            role := <str>$role,
            created_at := datetime_current()
          }
        `

        await client.query(query, {
          id,
          email: primaryEmail,
          firstName: first_name || "",
          lastName: last_name || "",
          role,
        })

        console.log(`Created user in database: ${id}`)
      } catch (dbError) {
        console.error("Database error:", dbError)
        // Don't fail the webhook if DB insert fails
      }
    } catch (error) {
      console.error("Error updating user:", error)
      return new Response("Error updating user", { status: 500 })
    }
  }

  return new Response("Webhook processed successfully", { status: 200 })
}

export const runtime = "nodejs"

