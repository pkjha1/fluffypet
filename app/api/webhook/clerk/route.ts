import { Webhook } from "svix"
import { headers } from "next/headers"
import type { WebhookEvent } from "@clerk/nextjs/server"
import { clerkClient } from "@clerk/nextjs"

export async function POST(req: Request) {
  // Get the headers
  const headerPayload = headers()
  const svix_id = headerPayload.get("svix-id")
  const svix_timestamp = headerPayload.get("svix-timestamp")
  const svix_signature = headerPayload.get("svix-signature")

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.error("Missing svix headers")
    return new Response("Error occured -- no svix headers", {
      status: 400,
    })
  }

  // Get the body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  // Create a new Svix instance with your webhook secret
  const wh = new Webhook(process.env.WEBHOOK_SECRET || "")

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
    return new Response("Error occured", {
      status: 400,
    })
  }

  // Handle the webhook
  const eventType = evt.type
  console.log(`Processing webhook: ${eventType}`)

  if (eventType === "user.created") {
    const { id, email_addresses } = evt.data
    const primaryEmail = email_addresses[0]?.email_address

    console.log(`New user created: ${primaryEmail}`)

    if (primaryEmail?.endsWith("@dimechain.in")) {
      console.log(`Assigning admin role to ${primaryEmail}`)
      // Set user role to admin for @dimechain.in emails
      await clerkClient.users.updateUser(id, {
        publicMetadata: {
          role: "admin",
        },
      })
    } else {
      console.log(`Assigning pet_owner role to ${primaryEmail}`)
      // Set default role as pet_owner for other users
      await clerkClient.users.updateUser(id, {
        publicMetadata: {
          role: "pet_owner",
        },
      })
    }
  }

  return new Response("Webhook processed successfully", { status: 200 })
}

export const runtime = "nodejs"

