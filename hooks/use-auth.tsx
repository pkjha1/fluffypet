"use client"

import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export function useAuth(allowedRoles?: string[]) {
  const { user, isLoaded } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!isLoaded) return

    if (!user) {
      router.push("/sign-in")
      return
    }

    if (allowedRoles) {
      const userRole = user.publicMetadata.role as string
      const hasAccess = userRole === "admin" || allowedRoles.includes(userRole)

      if (!hasAccess) {
        router.push("/unauthorized")
      }
    }
  }, [user, isLoaded, router, allowedRoles])

  return { user, isLoaded }
}

