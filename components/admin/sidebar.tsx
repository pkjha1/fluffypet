"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  Building2,
  Stethoscope,
  Dog,
  Briefcase,
  Heart,
  UserCheck,
  Hotel,
} from "lucide-react"

const routes = [
  {
    label: "Overview",
    icon: LayoutDashboard,
    href: "/admin",
  },
  {
    label: "Users",
    icon: Users,
    href: "/admin/users",
  },
  {
    label: "Blog",
    icon: FileText,
    href: "/admin/blog",
  },
  {
    label: "Pet Owners",
    icon: Dog,
    href: "/dashboard",
  },
  {
    label: "Vets",
    icon: Stethoscope,
    href: "/vet/dashboard",
  },
  {
    label: "Breeders",
    icon: Building2,
    href: "/breeder/dashboard",
  },
  {
    label: "Service Providers",
    icon: Briefcase,
    href: "/provider/dashboard",
  },
  {
    label: "NGOs/Shelters",
    icon: Heart,
    href: "/ngo/dashboard",
  },
  {
    label: "Volunteers",
    icon: UserCheck,
    href: "/volunteer/dashboard",
  },
  {
    label: "Hostels",
    icon: Hotel,
    href: "/hostel/dashboard",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/admin/settings",
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="space-y-4 py-4 flex flex-col h-full">
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold">Admin Dashboard</h2>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center gap-x-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors hover:bg-secondary",
                pathname === route.href ? "bg-secondary text-secondary-foreground" : "text-muted-foreground",
              )}
            >
              <route.icon className="h-4 w-4" />
              {route.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

