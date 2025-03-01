"use server"

import { auth } from "@clerk/nextjs"
import { revalidatePath } from "next/cache"
import { db } from "./db" // Import the db object

export async function updateUserRole(userId: string, role: string) {
  const { sessionClaims } = auth()

  if (sessionClaims?.role !== "admin") {
    throw new Error("Unauthorized")
  }

  // Update user role in your database
  // This is a placeholder - implement your database logic here
  await db.user.update({
    where: { id: userId },
    data: { role },
  })

  revalidatePath("/admin/users")
}

export async function fetchUsers() {
  const { sessionClaims } = auth()

  if (sessionClaims?.role !== "admin") {
    throw new Error("Unauthorized")
  }

  // Fetch users from your database
  // This is a placeholder - implement your database logic here
  const users = await db.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,
    },
  })

  return users
}

