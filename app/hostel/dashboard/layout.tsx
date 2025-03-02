import type React from "react"
import { HostelNav } from "@/components/hostel/navigation/hostel-nav"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

export default function HostelDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="relative flex min-h-screen">
        <HostelNav />
        <SidebarInset>
          <header className="flex h-16 items-center gap-4 border-b px-6">
            <SidebarTrigger />
            <div className="flex flex-1 items-center justify-between">
              <h1 className="text-lg font-semibold">Pet Hostel Dashboard</h1>
              {/* Add additional header content here */}
            </div>
          </header>
          <main className="flex-1 p-6">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}

