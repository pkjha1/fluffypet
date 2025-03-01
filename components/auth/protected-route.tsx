"use client"

import type React from "react"

import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRoles?: string[]
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
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

  if (!isLoaded || !user) {
    return null
  }

  return <>{children}</>
}

