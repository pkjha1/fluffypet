import type React from "react"
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader } from "@/components/ui/sidebar"
import { VetNav } from "@/components/vet/nav"

export default function VetDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarHeader>
            <VetNav />
          </SidebarHeader>
          <SidebarContent>{/* Navigation content */}</SidebarContent>
        </Sidebar>
        <main className="flex-1">
          <div className="container py-6">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  )
}

