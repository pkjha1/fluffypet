"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, MapPin, Clock } from "lucide-react"

export function ServiceProviderCard() {
  const provider = {
    id: 1,
    name: "Happy Paws Grooming",
    image: "/placeholder.svg?height=100&width=100",
    rating: 4.8,
    reviews: 156,
    location: "Austin, TX",
    services: ["Grooming", "Nail Trimming", "Bath"],
    availability: "Available Today",
    distance: "2.5 miles away",
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <img
          src={provider.image || "/placeholder.svg"}
          alt={provider.name}
          className="h-16 w-16 rounded-full object-cover"
        />
        <div className="flex-1">
          <h3 className="font-semibold">{provider.name}</h3>
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-primary text-primary" />
              <span className="ml-1 text-sm">{provider.rating}</span>
            </div>
            <span className="text-sm text-muted-foreground">({provider.reviews} reviews)</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            {provider.distance} • {provider.location}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            {provider.availability}
          </div>
          <div className="flex flex-wrap gap-2">
            {provider.services.map((service) => (
              <Badge key={service} variant="secondary">
                {service}
              </Badge>
            ))}
          </div>
          <Button className="w-full">Book Appointment</Button>
        </div>
      </CardContent>
    </Card>
  )
}

