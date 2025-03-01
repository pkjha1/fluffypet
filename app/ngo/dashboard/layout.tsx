"use client"

import type React from "react"

import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader } from "@/components/ui/sidebar"
import { NGONavigation } from "@/components/ngo/navigation/ngo-nav"

export default function NGODashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarHeader className="border-b px-6 py-3">
            <h2 className="text-lg font-semibold">NGO Dashboard</h2>
          </SidebarHeader>
          <SidebarContent>
            <NGONavigation />
          </SidebarContent>
        </Sidebar>
        <main className="flex-1">{children}</main>
      </div>
    </SidebarProvider>
  )
}

