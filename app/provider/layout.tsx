import type React from "react"
import { ProviderNav } from "@/components/provider/navigation/provider-nav"
import { SidebarTrigger } from "@/components/ui/sidebar"

export default function ProviderLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative flex min-h-screen">
      <ProviderNav />
      <main className="flex-1">
        <div className="container">
          <div className="flex h-16 items-center gap-4 border-b">
            <SidebarTrigger />
            {/* Add additional header content here */}
          </div>
          <div className="py-6">{children}</div>
        </div>
      </main>
    </div>
  )
}

