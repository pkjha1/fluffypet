"use client"

import {
  AlertTriangle,
  Heart,
  Home,
  Users,
  Calendar,
  BarChart,
  Settings,
  PawPrint,
  HandHeart,
  MessageCircle,
} from "lucide-react"
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar"

export function NGONavigation() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <a href="/ngo/dashboard">
            <Home className="h-4 w-4" />
            <span>Overview</span>
          </a>
        </SidebarMenuButton>
      </SidebarMenuItem>

      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <a href="/ngo/rescues">
            <AlertTriangle className="h-4 w-4" />
            <span>Rescue Cases</span>
          </a>
        </SidebarMenuButton>
      </SidebarMenuItem>

      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <a href="/ngo/fosters">
            <Heart className="h-4 w-4" />
            <span>Foster Program</span>
          </a>
        </SidebarMenuButton>
      </SidebarMenuItem>

      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <a href="/ngo/adoptions">
            <PawPrint className="h-4 w-4" />
            <span>Adoptions</span>
          </a>
        </SidebarMenuButton>
      </SidebarMenuItem>

      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <a href="/ngo/volunteers">
            <Users className="h-4 w-4" />
            <span>Volunteers</span>
          </a>
        </SidebarMenuButton>
      </SidebarMenuItem>

      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <a href="/ngo/donations">
            <HandHeart className="h-4 w-4" />
            <span>Donations</span>
          </a>
        </SidebarMenuButton>
      </SidebarMenuItem>

      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <a href="/ngo/events">
            <Calendar className="h-4 w-4" />
            <span>Events</span>
          </a>
        </SidebarMenuButton>
      </SidebarMenuItem>

      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <a href="/ngo/messages">
            <MessageCircle className="h-4 w-4" />
            <span>Messages</span>
          </a>
        </SidebarMenuButton>
      </SidebarMenuItem>

      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <a href="/ngo/analytics">
            <BarChart className="h-4 w-4" />
            <span>Analytics</span>
          </a>
        </SidebarMenuButton>
      </SidebarMenuItem>

      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <a href="/ngo/settings">
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </a>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

