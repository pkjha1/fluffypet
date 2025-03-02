"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Search } from "lucide-react"
import { Logo } from "@/components/logo"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

const services = [
  {
    title: "Find a Vet",
    href: "/services/vets",
    description: "Connect with qualified veterinarians near you.",
  },
  {
    title: "Pet Boarding",
    href: "/services/boarding",
    description: "Safe and comfortable boarding facilities for your pets.",
  },
  {
    title: "Grooming",
    href: "/services/grooming",
    description: "Professional grooming services for all pet types.",
  },
  {
    title: "Training",
    href: "/services/training",
    description: "Expert pet training and behavioral services.",
  },
]

const community = [
  {
    title: "Adoption",
    href: "/adopt",
    description: "Find your perfect companion from verified shelters.",
  },
  {
    title: "Volunteer",
    href: "/volunteer",
    description: "Join our community of pet lovers making a difference.",
  },
  {
    title: "Events",
    href: "/events",
    description: "Pet-friendly events and meetups near you.",
  },
  {
    title: "Explore",
    href: "/explore",
    description: "Discover pet services and facilities near you.",
  },
]

// All searchable items
const searchItems = [
  ...services,
  ...community,
  { title: "Home", href: "/", description: "Return to home page" },
  { title: "Gallery", href: "/gallery", description: "View pet photos and memories" },
  { title: "Add Pet", href: "/pets/add", description: "Add a new pet to your profile" },
]

export function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)

  // Handle keyboard shortcut
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <Logo className="h-8 w-8" />
            <span className="font-bold">FluffyPet</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost">Services</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-[240px]">
                {services.map((service) => (
                  <DropdownMenuItem key={service.href} asChild>
                    <Link href={service.href} className="w-full">
                      <div className="flex flex-col">
                        <span>{service.title}</span>
                        <span className="text-xs text-muted-foreground">{service.description}</span>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost">Community</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-[240px]">
                {community.map((item) => (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link href={item.href} className="w-full">
                      <div className="flex flex-col">
                        <span>{item.title}</span>
                        <span className="text-xs text-muted-foreground">{item.description}</span>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="ghost" asChild>
              <Link href="/gallery">Gallery</Link>
            </Button>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="hidden md:flex" onClick={() => setOpen(true)}>
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
            <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
              <span className="text-xs">⌘</span>K
            </kbd>
          </Button>
          <ModeToggle />
          <Button asChild className="hidden md:inline-flex">
            <Link href="/pets/add">Add Pet</Link>
          </Button>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 py-4">
                <Button
                  variant="ghost"
                  className="justify-start"
                  onClick={() => {
                    setOpen(true)
                  }}
                >
                  <Search className="mr-2 h-4 w-4" />
                  Search
                </Button>
                <div className="space-y-2">
                  <div className="text-sm font-medium text-muted-foreground">Services</div>
                  {services.map((service) => (
                    <Link
                      key={service.title}
                      href={service.href}
                      className="block text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {service.title}
                    </Link>
                  ))}
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium text-muted-foreground">Community</div>
                  {community.map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      className="block text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
                <Button asChild className="w-full">
                  <Link href="/pets/add">Add Pet</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search across FluffyPet..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            {searchItems.map((item) => (
              <CommandItem
                key={item.href}
                onSelect={() => {
                  router.push(item.href)
                  setOpen(false)
                }}
              >
                <div className="flex flex-col">
                  <span>{item.title}</span>
                  <span className="text-xs text-muted-foreground">{item.description}</span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </header>
  )
}

