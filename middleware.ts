import { authMiddleware } from "@clerk/nextjs"
import { NextResponse } from "next/server"

// Define public routes that don't require authentication
const publicRoutes = [
  "/",
  "/about",
  "/services(.*)",
  "/explore",
  "/gallery",
  "/events",
  "/adopt",
  "/volunteer",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/webhook/clerk",
]

export default authMiddleware({
  publicRoutes,
  afterAuth(auth, req) {
    // If the user is not signed in and the route is not public, redirect to sign-in
    if (!auth.userId && !auth.isPublicRoute) {
      const signInUrl = new URL("/sign-in", req.url)
      signInUrl.searchParams.set("redirect_url", req.url)
      return NextResponse.redirect(signInUrl)
    }

    // Allow the request to proceed
    return NextResponse.next()
  },
})

// Export config to ensure middleware runs only on matched routes
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
}

