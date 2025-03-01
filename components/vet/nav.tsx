"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Activity, Calendar, ClipboardList, FileText, Home, MessageSquare, Settings, Users } from "lucide-react"

const navigation = [
  { name: "Overview", href: "/vet/dashboard", icon: Home },
  { name: "Patients", href: "/vet/patients", icon: Users },
  { name: "Appointments", href: "/vet/appointments", icon: Calendar },
  { name: "Medical Records", href: "/vet/records", icon: FileText },
  { name: "AI Diagnostics", href: "/vet/diagnostics", icon: Activity },
  { name: "Messages", href: "/vet/messages", icon: MessageSquare },
  { name: "Tasks", href: "/vet/tasks", icon: ClipboardList },
  { name: "Settings", href: "/vet/settings", icon: Settings },
]

export function VetNav() {
  const pathname = usePathname()

  return (
    <nav className="space-y-1">
      {navigation.map((item) => {
        const isActive = pathname === item.href
        return (
          <Button
            key={item.name}
            variant="ghost"
            asChild
            className={cn("w-full justify-start", isActive && "bg-muted")}
          >
            <Link href={item.href}>
              <item.icon className="mr-2 h-4 w-4" />
              {item.name}
            </Link>
          </Button>
        )
      })}
    </nav>
  )
}

