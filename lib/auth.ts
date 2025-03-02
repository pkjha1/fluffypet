import { currentUser } from "@clerk/nextjs"

export async function checkUserRole() {
  const user = await currentUser()

  if (!user) {
    return null
  }

  // Default to pet_owner if no role is set
  return (user.publicMetadata.role as string) || "pet_owner"
}

export async function isAdmin() {
  const role = await checkUserRole()
  return role === "admin"
}

export async function hasRole(allowedRoles: string[]) {
  const role = await checkUserRole()

  if (!role) return false

  // Admin has access to everything
  if (role === "admin") return true

  return allowedRoles.includes(role)
}

export async function requireAdmin() {
  const isUserAdmin = await isAdmin()
  if (!isUserAdmin) {
    throw new Error("Unauthorized: Admin access required")
  }
}

export async function requireRole(allowedRoles: string[]) {
  const role = await checkUserRole()

  if (!role) {
    throw new Error("Unauthorized: Authentication required")
  }

  if (role === "admin") return // Admin has access to everything

  if (!allowedRoles.includes(role)) {
    throw new Error(`Unauthorized: Required role not found. You need one of: ${allowedRoles.join(", ")}`)
  }
}

