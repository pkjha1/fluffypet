"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Clock } from "lucide-react"

interface ServiceProvider {
  id: string
  name: string
  type: "vet" | "groomer" | "trainer"
  imageUrl: string
  rating: number
  location: string
  availability: string
  verified: boolean
}

export function ServiceProviders() {
  const providers: ServiceProvider[] = [
    {
      id: "1",
      name: "Dr. Sarah Wilson",
      type: "vet",
      imageUrl: "/placeholder.svg",
      rating: 4.8,
      location: "Downtown Pet Clinic",
      availability: "Available Today",
      verified: true,
    },
    {
      id: "2",
      name: "Happy Paws Grooming",
      type: "groomer",
      imageUrl: "/placeholder.svg",
      rating: 4.6,
      location: "Pet Care Center",
      availability: "Next Available: Tomorrow",
      verified: true,
    },
    {
      id: "3",
      name: "Elite Pet Training",
      type: "trainer",
      imageUrl: "/placeholder.svg",
      rating: 4.9,
      location: "Pet Training Academy",
      availability: "Available This Week",
      verified: true,
    },
  ]

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recommended Service Providers</CardTitle>
        <Button variant="outline" size="sm" asChild>
          <Link href="/services">View All</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {providers.map((provider) => (
            <Card key={provider.id}>
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className="relative h-16 w-16 rounded-lg overflow-hidden">
                    <Image
                      src={provider.imageUrl || "/placeholder.svg"}
                      alt={provider.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold">{provider.name}</h3>
                        <Badge variant="secondary">{provider.type}</Badge>
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-primary text-primary" />
                        <span className="ml-1 text-sm">{provider.rating}</span>
                      </div>
                    </div>
                    <div className="mt-2 space-y-1">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="mr-1 h-4 w-4" />
                        {provider.location}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="mr-1 h-4 w-4" />
                        {provider.availability}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

