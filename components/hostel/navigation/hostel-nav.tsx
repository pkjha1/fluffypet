"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart,
  Calendar,
  CreditCard,
  Users,
  PawPrint,
  Bell,
  ClipboardCheck,
  Settings,
  HeartPulse,
  UserCircle,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"

export function HostelNav() {
  const pathname = usePathname()

  return (
    <Sidebar>
      <SidebarHeader className="border-b px-4 py-2">
        <h2 className="text-lg font-semibold">FluffyPet Hostel</h2>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/hostel/dashboard"}>
                  <Link href="/hostel/dashboard">
                    <BarChart className="h-4 w-4" />
                    <span>Overview</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Bookings Section */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname.startsWith("/hostel/bookings")}>
                  <Link href="/hostel/bookings">
                    <Calendar className="h-4 w-4" />
                    <span>Bookings</span>
                  </Link>
                </SidebarMenuButton>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton asChild>
                      <Link href="/hostel/bookings/calendar">Calendar</Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton asChild>
                      <Link href="/hostel/bookings/check-in">Check-in/out</Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton asChild>
                      <Link href="/hostel/bookings/waitlist">Waitlist</Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </SidebarMenuItem>

              {/* Pets Section */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname.startsWith("/hostel/pets")}>
                  <Link href="/hostel/pets">
                    <PawPrint className="h-4 w-4" />
                    <span>Current Guests</span>
                  </Link>
                </SidebarMenuButton>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton asChild>
                      <Link href="/hostel/pets/monitoring">Monitoring</Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton asChild>
                      <Link href="/hostel/pets/activities">Activities</Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </SidebarMenuItem>

              {/* Health & Safety */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname.startsWith("/hostel/health")}>
                  <Link href="/hostel/health">
                    <HeartPulse className="h-4 w-4" />
                    <span>Health & Safety</span>
                  </Link>
                </SidebarMenuButton>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton asChild>
                      <Link href="/hostel/health/records">Medical Records</Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton asChild>
                      <Link href="/hostel/health/incidents">Incident Reports</Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* Staff Management */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname.startsWith("/hostel/staff")}>
                  <Link href="/hostel/staff">
                    <Users className="h-4 w-4" />
                    <span>Staff</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Finances */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname.startsWith("/hostel/finances")}>
                  <Link href="/hostel/finances">
                    <CreditCard className="h-4 w-4" />
                    <span>Finances</span>
                  </Link>
                </SidebarMenuButton>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton asChild>
                      <Link href="/hostel/finances/transactions">Transactions</Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton asChild>
                      <Link href="/hostel/finances/reports">Reports</Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </SidebarMenuItem>

              {/* Compliance */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname.startsWith("/hostel/compliance")}>
                  <Link href="/hostel/compliance">
                    <ClipboardCheck className="h-4 w-4" />
                    <span>Compliance</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Communication</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* Notifications */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname.startsWith("/hostel/notifications")}>
                  <Link href="/hostel/notifications">
                    <Bell className="h-4 w-4" />
                    <span>Updates & Alerts</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Profile & Settings */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname.startsWith("/hostel/settings")}>
                  <Link href="/hostel/settings">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <div className="flex items-center gap-2">
          <UserCircle className="h-6 w-6" />
          <div className="flex flex-col">
            <span className="text-sm font-medium">Hostel Admin</span>
            <span className="text-xs text-muted-foreground">View Profile</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

