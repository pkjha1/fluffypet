import { currentUser } from "@clerk/nextjs"

export async function checkUserRole() {
  const user = await currentUser()

  if (!user) {
    return null
  }

  return user.publicMetadata.role as string
}

export async function isAdmin() {
  const role = await checkUserRole()
  return role === "admin"
}

export async function requireAdmin() {
  const isUserAdmin = await isAdmin()
  if (!isUserAdmin) {
    throw new Error("Unauthorized")
  }
}

