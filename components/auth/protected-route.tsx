"use client"

import type React from "react"
import { useAuth } from "@/hooks/use-auth"
import { Loader2 } from "lucide-react"

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRoles?: string[]
  fallback?: React.ReactNode
}

export function ProtectedRoute({
  children,
  allowedRoles,
  fallback = (
    <div className="flex h-screen w-full items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  ),
}: ProtectedRouteProps) {
  const { isLoaded, hasAccess } = useAuth(allowedRoles)

  // Still loading auth state
  if (!isLoaded || hasAccess === null) {
    return fallback
  }

  // User doesn't have access
  if (!hasAccess) {
    return null
  }

  // User has access
  return <>{children}</>
}

