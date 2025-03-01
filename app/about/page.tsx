import { Header } from "@/components/ui/header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Shield, Users, Award } from "lucide-react"

export default function AboutPage() {
  const features = [
    {
      icon: Heart,
      title: "Pet-First Approach",
      description: "We prioritize the well-being and happiness of every pet in our care.",
    },
    {
      icon: Shield,
      title: "Trusted Network",
      description: "Our verified network of veterinarians and pet care professionals.",
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Built by and for pet lovers, supporting pet owners worldwide.",
    },
    {
      icon: Award,
      title: "Quality Service",
      description: "Committed to providing the highest standard of pet care services.",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About FluffyPet</h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Your trusted partner in pet care, making pet parenting easier and more enjoyable.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <img
                alt="About Us"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
                height="550"
                src="/placeholder.svg?height=550&width=550"
                width="550"
              />
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Our Mission</h2>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    We're on a mission to revolutionize pet care by connecting pet parents with quality services and
                    building a community of pet lovers. Our platform makes it easy to manage your pet's health, find
                    trusted care providers, and connect with other pet parents.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                    Join Our Community
                  </Button>
                  <Button variant="outline">Learn More</Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => {
                const Icon = feature.icon
                return (
                  <Card key={feature.title}>
                    <CardContent className="flex flex-col items-center space-y-4 p-6">
                      <Icon className="h-12 w-12 text-primary" />
                      <h3 className="text-xl font-bold">{feature.title}</h3>
                      <p className="text-center text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Join Our Community</h2>
                <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
                  Be part of a growing community of pet lovers and access premium pet care services.
                </p>
              </div>
              <Button className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                Get Started
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

