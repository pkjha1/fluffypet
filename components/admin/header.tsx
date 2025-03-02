"use client"

import { ModeToggle } from "@/components/mode-toggle"
import { Logo } from "@/components/logo"
import Link from "next/link"

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/admin" className="flex items-center gap-2">
            <Logo className="h-8 w-8" />
            <span className="font-bold">FluffyPet Admin</span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
            View Site
          </Link>
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}

