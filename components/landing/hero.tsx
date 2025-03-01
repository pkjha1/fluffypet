import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PawPrint, Shield, Sparkles } from "lucide-react"

export function Hero() {
  return (
    <div className="relative">
      <div className="container flex flex-col items-center justify-center gap-4 py-12 text-center md:py-16 lg:py-20">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            The Future of Pet Care is{" "}
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              Here
            </span>
          </h1>
          <p className="mx-auto max-w-[700px] text-lg text-muted-foreground sm:text-xl">
            Revolutionizing pet care with AI-powered health monitoring, blockchain verification, and seamless veterinary
            coordination.
          </p>
        </div>
        <div className="flex flex-col gap-2 min-[400px]:flex-row">
          <Button size="lg" asChild>
            <Link href="/signup">
              <Sparkles className="mr-2 h-4 w-4" />
              Get Started
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="#features">Learn More</Link>
          </Button>
        </div>
        <div className="mt-8 flex items-center justify-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-primary" />
            <span>Secure & Private</span>
          </div>
          <div className="flex items-center gap-2">
            <PawPrint className="h-4 w-4 text-primary" />
            <span>10,000+ Happy Pets</span>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]" />
      </div>
    </div>
  )
}

