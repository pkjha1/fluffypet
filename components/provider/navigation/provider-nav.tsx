"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart,
  Calendar,
  CreditCard,
  Layout,
  List,
  MessageSquare,
  Settings,
  Star,
  UserCircle,
  Users,
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
  SidebarProvider,
} from "@/components/ui/sidebar"

export function ProviderNav() {
  const pathname = usePathname()

  return (
    <SidebarProvider defaultOpen>
      <Sidebar>
        <SidebarHeader className="border-b px-4 py-2">
          <h2 className="text-lg font-semibold">Service Provider Portal</h2>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname === "/provider/dashboard"}>
                    <Link href="/provider/dashboard">
                      <BarChart className="h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                {/* Profile Section */}
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname.startsWith("/provider/profile")}>
                    <Link href="/provider/profile">
                      <UserCircle className="h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </SidebarMenuButton>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <Link href="/provider/profile/credentials">Credentials & Certifications</Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <Link href="/provider/profile/portfolio">Portfolio</Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </SidebarMenuItem>

                {/* Services Section */}
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname.startsWith("/provider/services")}>
                    <Link href="/provider/services">
                      <Layout className="h-4 w-4" />
                      <span>Services</span>
                    </Link>
                  </SidebarMenuButton>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <Link href="/provider/services/manage">Manage Services</Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <Link href="/provider/services/availability">Availability</Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <Link href="/provider/services/locations">Service Areas</Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </SidebarMenuItem>

                {/* Bookings Section */}
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname.startsWith("/provider/bookings")}>
                    <Link href="/provider/bookings">
                      <Calendar className="h-4 w-4" />
                      <span>Bookings</span>
                    </Link>
                  </SidebarMenuButton>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <Link href="/provider/bookings/calendar">Calendar</Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <Link href="/provider/bookings/requests">Requests</Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <Link href="/provider/bookings/history">History</Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>Business</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {/* Clients Section */}
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname.startsWith("/provider/clients")}>
                    <Link href="/provider/clients">
                      <Users className="h-4 w-4" />
                      <span>Clients</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                {/* Reviews Section */}
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname.startsWith("/provider/reviews")}>
                    <Link href="/provider/reviews">
                      <Star className="h-4 w-4" />
                      <span>Reviews</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                {/* Messages Section */}
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname.startsWith("/provider/messages")}>
                    <Link href="/provider/messages">
                      <MessageSquare className="h-4 w-4" />
                      <span>Messages</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                {/* Financial Section */}
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname.startsWith("/provider/finances")}>
                    <Link href="/provider/finances">
                      <CreditCard className="h-4 w-4" />
                      <span>Finances</span>
                    </Link>
                  </SidebarMenuButton>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <Link href="/provider/finances/earnings">Earnings</Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <Link href="/provider/finances/payouts">Payouts</Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <Link href="/provider/finances/invoices">Invoices</Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>Resources</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {/* Analytics Section */}
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname.startsWith("/provider/analytics")}>
                    <Link href="/provider/analytics">
                      <List className="h-4 w-4" />
                      <span>Analytics</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                {/* Settings Section */}
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname.startsWith("/provider/settings")}>
                    <Link href="/provider/settings">
                      <Settings className="h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </SidebarMenuButton>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <Link href="/provider/settings/account">Account Settings</Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <Link href="/provider/settings/notifications">Notifications</Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <Link href="/provider/settings/integrations">Integrations</Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="border-t p-4">
          <div className="text-xs text-muted-foreground">
            <p>FluffyPet Service Provider</p>
            <p>Version 1.0</p>
          </div>
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  )
}

