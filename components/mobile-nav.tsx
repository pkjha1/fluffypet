"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, PawPrint, Calendar, Bell, Menu } from "lucide-react"
import { cn } from "@/lib/utils"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

export function MobileNav() {
  const pathname = usePathname()

  const mainItems = [
    {
      href: "/dashboard",
      label: "Home",
      icon: Home,
    },
    {
      href: "/pets",
      label: "Pets",
      icon: PawPrint,
    },
    {
      href: "/appointments",
      label: "Bookings",
      icon: Calendar,
    },
    {
      href: "/notifications",
      label: "Alerts",
      icon: Bell,
    },
  ]

  const services = [
    {
      title: "Find a Vet",
      href: "/services/vets",
    },
    {
      title: "Pet Boarding",
      href: "/services/boarding",
    },
    {
      title: "Grooming",
      href: "/services/grooming",
    },
    {
      title: "Training",
      href: "/services/training",
    },
  ]

  const community = [
    {
      title: "Adoption",
      href: "/adopt",
    },
    {
      title: "Volunteer",
      href: "/volunteer",
    },
    {
      title: "Events",
      href: "/events",
    },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 block border-t bg-background p-2 backdrop-blur-lg md:hidden">
      <nav className="flex items-center justify-around">
        {mainItems.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 rounded-lg p-2 text-muted-foreground transition-colors hover:text-primary",
                pathname === item.href && "text-primary",
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs">{item.label}</span>
            </Link>
          )
        })}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="flex flex-col items-center gap-1 p-2">
              <Menu className="h-5 w-5" />
              <span className="text-xs">Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-4 py-4">
              <div className="space-y-2">
                <div className="text-sm font-medium text-muted-foreground">Services</div>
                {services.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
              <div className="space-y-2">
                <div className="text-sm font-medium text-muted-foreground">Community</div>
                {community.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
              <Link href="/about" className="text-sm font-medium">
                About
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  )
}

