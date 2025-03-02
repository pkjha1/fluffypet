"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Search, Star } from "lucide-react"
import { Header } from "@/components/ui/header"
import { useState } from "react"

export default function TrainingPage() {
  const trainers = [
    {
      id: 1,
      name: "Master Pet Training",
      image: "/placeholder.svg?height=400&width=600",
      specialties: ["Behavior Training", "Puppy Training", "Obedience"],
      rating: 4.9,
      reviews: 167,
      location: "North Side",
      distance: "2.1 miles away",
      priceRange: "$$",
      available: true,
      nextAvailable: "Today",
    },
    {
      id: 2,
      name: "Elite K9 Academy",
      image: "/placeholder.svg?height=400&width=600",
      specialties: ["Advanced Training", "Agility", "Protection"],
      rating: 4.8,
      reviews: 142,
      location: "West Side",
      distance: "3.4 miles away",
      priceRange: "$$$",
      available: true,
      nextAvailable: "Tomorrow",
    },
  ]

  const [selectedTrainingType, setSelectedTrainingType] = useState("all")

  const filteredTrainers =
    selectedTrainingType === "all"
      ? trainers
      : trainers.filter((trainer) =>
          trainer.specialties.some((specialty) => specialty.toLowerCase().includes(selectedTrainingType)),
        )

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container py-6">
        <div className="max-w-6xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold">Pet Training Services</h1>
            <p className="text-muted-foreground mt-2">Find expert trainers for your pet</p>
          </div>

          <div className="flex gap-4 items-center">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search trainers..." className="pl-8" />
            </div>
            <Select defaultValue="all" onValueChange={(value) => setSelectedTrainingType(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Training Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="behavior">Behavior</SelectItem>
                <SelectItem value="obedience">Obedience</SelectItem>
                <SelectItem value="puppy">Puppy Training</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {filteredTrainers.map((trainer) => (
              <Card key={trainer.id} className="overflow-hidden">
                <img
                  src={trainer.image || "/placeholder.svg"}
                  alt={trainer.name}
                  className="w-full aspect-video object-cover"
                />
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{trainer.name}</CardTitle>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-primary text-primary" />
                          <span className="ml-1 text-sm">{trainer.rating}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">({trainer.reviews} reviews)</span>
                        <Badge variant="outline">{trainer.priceRange}</Badge>
                      </div>
                    </div>
                    <Badge variant={trainer.available ? "outline" : "secondary"}>
                      Next Available: {trainer.nextAvailable}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>
                      {trainer.location} • {trainer.distance}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {trainer.specialties.map((specialty) => (
                      <Badge key={specialty} variant="secondary">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex justify-end">
                    <Button>Book Consultation</Button>
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

