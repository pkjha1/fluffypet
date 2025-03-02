import Link from "next/link"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Instagram, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container grid gap-8 py-12 lg:grid-cols-4 lg:py-20">
        <div className="space-y-4">
          <Link href="/" className="flex items-center gap-2">
            <Logo className="h-8 w-8" />
            <span className="font-bold">FluffyPet</span>
          </Link>
          <p className="text-sm text-muted-foreground">
            Revolutionizing pet care with AI, blockchain, and IoT technology.
          </p>
          <div className="flex gap-4">
            <Button variant="ghost" size="icon">
              <Facebook className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Twitter className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Instagram className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8 lg:col-span-2 lg:grid-cols-3">
          {footerLinks.map((section) => (
            <div key={section.title} className="space-y-4">
              <h3 className="text-sm font-medium">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.title}>
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground">
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Stay Updated</h3>
          <p className="text-sm text-muted-foreground">Subscribe to our newsletter for pet care tips and updates.</p>
          <div className="flex gap-2">
            <Input placeholder="Enter your email" type="email" />
            <Button>Subscribe</Button>
          </div>
        </div>
      </div>
      <div className="border-t">
        <div className="container flex flex-col gap-4 py-6 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-muted-foreground">© 2024 FluffyPet. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

const footerLinks = [
  {
    title: "Product",
    links: [
      { title: "Features", href: "#features" },
      { title: "Pricing", href: "#pricing" },
      { title: "AI Diagnostics", href: "#ai-diagnostics" },
      { title: "Virtual Vet", href: "#virtual-vet" },
    ],
  },
  {
    title: "Company",
    links: [
      { title: "About", href: "/about" },
      { title: "Blog", href: "/blog" },
      { title: "Careers", href: "/careers" },
      { title: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { title: "Help Center", href: "/help" },
      { title: "Pet Care Guide", href: "/guide" },
      { title: "API Docs", href: "/docs" },
      { title: "Community", href: "/community" },
    ],
  },
]

