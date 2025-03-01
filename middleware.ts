import { clerkMiddleware } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

// Define public routes that don't require authentication
const publicRoutes = ["/", "/about", "/services(.*)", "/explore", "/gallery", "/events", "/adopt", "/volunteer"]

export default clerkMiddleware({
  publicRoutes,
  ignoredRoutes: ["/api/webhook/clerk"],
  afterAuth(auth, req) {
    // Handle response
    const response = NextResponse.next()

    // Add geolocation header for explore page
    if (req.nextUrl.pathname === "/explore") {
      response.headers.set("Permissions-Policy", 'geolocation=(self "https://fluffypet.vercel.app")')
    }

    return response
  },
})

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
}

// Removed duplicate import and configuration