"use client"

import type React from "react"

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { BreederNav } from "@/components/breeder/navigation/breeder-nav"

export default function BreederDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <BreederNav />
      <SidebarInset className="bg-background">{children}</SidebarInset>
    </SidebarProvider>
  )
}

