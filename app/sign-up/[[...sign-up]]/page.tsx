"use client"

import { SignUp } from "@clerk/nextjs"
import { useSearchParams } from "next/navigation"

export default function SignUpPage() {
  const searchParams = useSearchParams()
  const redirectUrl = searchParams.get("redirect_url") || "/dashboard"

  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignUp
        redirectUrl={redirectUrl}
        appearance={{
          elements: {
            formButtonPrimary: "bg-primary text-primary-foreground hover:bg-primary/90",
            footerActionLink: "text-primary hover:text-primary/90",
          },
        }}
      />
    </div>
  )
}

