"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Search, Star, PawPrint } from "lucide-react"
import Header from "@/components/Header" // Import the Header component

export default function BoardingPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [petType, setPetType] = useState("all")

  const facilities = [
    {
      id: 1,
      name: "Luxury Pet Resort",
      image: "/placeholder.svg?height=400&width=600",
      rating: 4.9,
      reviews: 234,
      location: "North Side",
      distance: "2.3 miles away",
      amenities: ["24/7 Supervision", "Webcam Access", "Daily Activities"],
      pricePerNight: 45,
      available: true,
      petTypes: ["Dogs", "Cats"],
    },
    {
      id: 2,
      name: "Cozy Pet Inn",
      image: "/placeholder.svg?height=400&width=600",
      rating: 4.7,
      reviews: 189,
      location: "Downtown",
      distance: "1.5 miles away",
      amenities: ["Indoor/Outdoor Runs", "Grooming Services", "Medication Administration"],
      pricePerNight: 35,
      available: true,
      petTypes: ["Dogs", "Cats", "Small Pets"],
    },
    // Add more facilities as needed
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container py-6">
        <div className="max-w-6xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold">Pet Boarding Services</h1>
            <p className="text-muted-foreground mt-2">Find the perfect home away from home for your pet</p>
          </div>

          <div className="flex gap-4 items-center">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search facilities..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={petType} onValueChange={setPetType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Pet type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Pets</SelectItem>
                <SelectItem value="dogs">Dogs</SelectItem>
                <SelectItem value="cats">Cats</SelectItem>
                <SelectItem value="small">Small Pets</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {facilities.map((facility) => (
              <Card key={facility.id} className="overflow-hidden">
                <img
                  src={facility.image || "/placeholder.svg"}
                  alt={facility.name}
                  className="w-full aspect-video object-cover"
                />
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{facility.name}</CardTitle>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-primary text-primary" />
                          <span className="ml-1 text-sm">{facility.rating}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">({facility.reviews} reviews)</span>
                      </div>
                    </div>
                    <Badge variant={facility.available ? "outline" : "secondary"}>
                      {facility.available ? "Rooms Available" : "Fully Booked"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>
                      {facility.location} • {facility.distance}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <PawPrint className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Accepts: {facility.petTypes.join(", ")}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {facility.amenities.map((amenity) => (
                        <Badge key={amenity} variant="secondary">
                          {amenity}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold">${facility.pricePerNight}</div>
                      <div className="text-sm text-muted-foreground">per night</div>
                    </div>
                    <Button>Book Now</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

