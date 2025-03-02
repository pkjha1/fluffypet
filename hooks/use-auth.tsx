"use client"

import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export function useAuth(allowedRoles?: string[]) {
  const { user, isLoaded } = useUser()
  const router = useRouter()
  const [hasAccess, setHasAccess] = useState<boolean | null>(null)

  useEffect(() => {
    if (!isLoaded) return

    if (!user) {
      const currentPath = window.location.pathname
      router.push(`/sign-in?redirect_url=${encodeURIComponent(currentPath)}`)
      setHasAccess(false)
      return
    }

    if (allowedRoles) {
      const userRole = (user.publicMetadata.role as string) || "pet_owner"

      // Admin has access to everything
      if (userRole === "admin") {
        setHasAccess(true)
        return
      }

      const authorized = allowedRoles.includes(userRole)
      setHasAccess(authorized)

      if (!authorized) {
        router.push("/unauthorized")
      }
    } else {
      // No specific roles required, just authentication
      setHasAccess(true)
    }
  }, [user, isLoaded, router, allowedRoles])

  return {
    user,
    isLoaded,
    hasAccess,
    role: (user?.publicMetadata.role as string) || "pet_owner",
    isAdmin: user?.publicMetadata.role === "admin",
  }
}

