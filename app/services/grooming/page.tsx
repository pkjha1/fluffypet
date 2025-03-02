"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Search, Star } from "lucide-react"
import { Header } from "@/components/ui/header"
import { useState } from "react"

export default function GroomingPage() {
  const groomers = [
    {
      id: 1,
      name: "PawFect Grooming",
      image: "/placeholder.svg?height=400&width=600",
      services: ["Full Grooming", "Bath & Brush", "Nail Trimming"],
      rating: 4.8,
      reviews: 203,
      location: "Downtown",
      distance: "1.5 miles away",
      priceRange: "$$",
      available: true,
      nextAvailable: "Today",
    },
    {
      id: 2,
      name: "Luxury Pet Spa",
      image: "/placeholder.svg?height=400&width=600",
      services: ["Premium Grooming", "Spa Treatments", "De-matting"],
      rating: 4.9,
      reviews: 178,
      location: "East Side",
      distance: "2.8 miles away",
      priceRange: "$$$",
      available: true,
      nextAvailable: "Tomorrow",
    },
  ]

  const [selectedPriceRange, setSelectedPriceRange] = useState("all")

  const filteredGroomers =
    selectedPriceRange === "all" ? groomers : groomers.filter((groomer) => groomer.priceRange === selectedPriceRange)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container py-6">
        <div className="max-w-6xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold">Pet Grooming Services</h1>
            <p className="text-muted-foreground mt-2">Find professional groomers for your furry friend</p>
          </div>

          <div className="flex gap-4 items-center">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search groomers..." className="pl-8" />
            </div>
            <Select value={selectedPriceRange} onValueChange={setSelectedPriceRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="$">Budget ($)</SelectItem>
                <SelectItem value="$$">Mid-Range ($$)</SelectItem>
                <SelectItem value="$$$">Premium ($$$)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {filteredGroomers.map((groomer) => (
              <Card key={groomer.id} className="overflow-hidden">
                <img
                  src={groomer.image || "/placeholder.svg"}
                  alt={groomer.name}
                  className="w-full aspect-video object-cover"
                />
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{groomer.name}</CardTitle>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-primary text-primary" />
                          <span className="ml-1 text-sm">{groomer.rating}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">({groomer.reviews} reviews)</span>
                        <Badge variant="outline">{groomer.priceRange}</Badge>
                      </div>
                    </div>
                    <Badge variant={groomer.available ? "outline" : "secondary"}>
                      Next Available: {groomer.nextAvailable}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>
                      {groomer.location} • {groomer.distance}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {groomer.services.map((service) => (
                      <Badge key={service} variant="secondary">
                        {service}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex justify-end">
                    <Button>Book Appointment</Button>
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

