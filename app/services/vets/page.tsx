"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Search, Star } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Header } from "@/components/ui/header"

// Mock data for vets
const vets = [
  {
    id: 1,
    name: "Dr. Sarah Wilson",
    clinic: "Central Pet Clinic",
    image: "/placeholder.svg?height=400&width=600",
    rating: 4.8,
    reviews: 156,
    distance: "0.8 km",
    address: "123 Vet Street, New York",
    specialties: ["General Practice", "Surgery", "Dental"],
    availability: "Available Today",
    experience: "15 years",
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    clinic: "PetCare Plus",
    image: "/placeholder.svg?height=400&width=600",
    rating: 4.9,
    reviews: 203,
    distance: "1.2 km",
    address: "456 Health Avenue, New York",
    specialties: ["Internal Medicine", "Dermatology", "Emergency Care"],
    availability: "Next Available: Tomorrow",
    experience: "12 years",
  },
  // Add more vets...
]

export default function VetsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container py-6">
        <div className="max-w-6xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold">Find a Veterinarian</h1>
            <p className="text-muted-foreground mt-2">Connect with qualified veterinarians near you</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search veterinarians..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button>Filter Results</Button>
          </div>

          <ScrollArea className="h-[calc(100vh-16rem)]">
            <div className="grid gap-6">
              {vets.map((vet) => (
                <Card key={vet.id} className="flex flex-col md:flex-row">
                  <div className="relative md:w-48 md:min-w-48">
                    <img
                      src={vet.image || "/placeholder.svg"}
                      alt={vet.name}
                      className="aspect-video md:aspect-square object-cover w-full h-full rounded-t-lg md:rounded-l-lg md:rounded-t-none"
                    />
                    <Badge
                      variant={vet.availability.includes("Today") ? "default" : "secondary"}
                      className="absolute top-2 right-2"
                    >
                      {vet.availability}
                    </Badge>
                  </div>
                  <div className="flex-1">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{vet.name}</CardTitle>
                          <CardDescription>{vet.clinic}</CardDescription>
                        </div>
                        <div className="text-sm text-muted-foreground text-right">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-primary text-primary" />
                            <span>
                              {vet.rating} ({vet.reviews} reviews)
                            </span>
                          </div>
                          <div>{vet.distance}</div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        {vet.address}
                      </div>
                      <div>
                        <div className="text-sm font-medium mb-2">Specialties</div>
                        <div className="flex flex-wrap gap-2">
                          {vet.specialties.map((specialty) => (
                            <Badge key={specialty} variant="outline">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">{vet.experience} of experience</div>
                        <Button>Book Appointment</Button>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>
      </main>
    </div>
  )
}

