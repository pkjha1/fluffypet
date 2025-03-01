import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function HowItWorks() {
  return (
    <section className="container space-y-8 py-12 lg:py-20">
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <h2 className="text-3xl font-bold leading-[1.1] sm:text-4xl md:text-5xl">How It Works</h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          Experience seamless pet care with our integrated platform
        </p>
      </div>
      <div className="mx-auto grid max-w-5xl gap-8">
        {steps.map((step, index) => (
          <Card key={index} className="relative overflow-hidden">
            <CardContent className="flex flex-col gap-4 p-6 md:flex-row md:items-center">
              <Badge variant="outline" className="w-fit">
                Step {index + 1}
              </Badge>
              <div className="grid flex-1 gap-1">
                <h3 className="text-xl font-bold">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
              <div className="relative aspect-video w-full max-w-sm rounded-lg bg-muted md:w-[200px]">
                <Image
                  src={step.image || "/placeholder.svg"}
                  alt={step.title}
                  className="rounded-lg object-cover"
                  fill
                  sizes="(max-width: 768px) 100vw, 200px"
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

const steps = [
  {
    title: "Connect Your Pet",
    description: "Set up your pet's profile and connect their smart collar for real-time monitoring.",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    title: "Monitor Health",
    description: "Track vital signs, activity levels, and receive AI-powered health insights.",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    title: "Get Expert Care",
    description: "Connect with veterinarians and receive immediate assistance when needed.",
    image: "/placeholder.svg?height=200&width=400",
  },
]

