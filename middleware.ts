//import { authMiddleware } from "@clerk/nextjs"
import { NextResponse } from "next/server"
import { clerkMiddleware } from '@clerk/nextjs/server'

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
   // Skip Next.js internals and all static files, unless found in search params
   '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
   // Always run for API routes
   '/(api|trpc)(.*)',
  ],
}
function authMiddleware({ publicRoutes, afterAuth }: { publicRoutes: string[], afterAuth: (auth: any, req: any) => NextResponse }) {
  return async (req: any) => {
    const url = new URL(req.url);
    const isPublicRoute = publicRoutes.some(route => new RegExp(`^${route}$`).test(url.pathname));

    // Simulate authentication check
    const auth = {
      userId: null, // Replace with actual user ID if authenticated
      isPublicRoute,
    };

    return afterAuth(auth, req);
  };
}

