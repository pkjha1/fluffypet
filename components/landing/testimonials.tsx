import Image from "next/image"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Star } from "lucide-react"

export function Testimonials() {
  return (
    <section className="bg-muted/50">
      <div className="container space-y-8 py-12 lg:py-20">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="text-3xl font-bold leading-[1.1] sm:text-4xl md:text-5xl">Loved by Pet Parents</h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Don't just take our word for it. Here's what our users have to say.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, i) => (
            <Card key={i} className="border-0 bg-background">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Image
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="rounded-full object-cover"
                    width={48}
                    height={48}
                  />
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-1">
                  {Array(5)
                    .fill(null)
                    .map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                </div>
                <p className="mt-2 text-muted-foreground">{testimonial.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

const testimonials = [
  {
    name: "Sarah Johnson",
    title: "Dog Parent",
    avatar: "/placeholder.svg?height=48&width=48",
    content:
      "FluffyPet's AI diagnostics caught my dog's heart condition early. The 24/7 virtual vet support gives me peace of mind.",
  },
  {
    name: "Michael Chen",
    title: "Cat Parent",
    avatar: "/placeholder.svg?height=48&width=48",
    content:
      "The smart collar and real-time monitoring have been a game-changer. I can track my cat's activity and health effortlessly.",
  },
  {
    name: "Emily Rodriguez",
    title: "Multi-Pet Parent",
    avatar: "/placeholder.svg?height=48&width=48",
    content:
      "Managing multiple pets has never been easier. The blockchain verification ensures all their records are secure and accessible.",
  },
]

