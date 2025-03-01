"use client"

import Link from "next/link"
import { Plus, Search } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function PetsPage() {
  const pets = [
    {
      id: 1,
      name: "Max",
      type: "Dog",
      breed: "Golden Retriever",
      age: "3 years",
      image: "/placeholder.svg?height=400&width=600",
      status: "Healthy",
      lastCheckup: "2024-02-15",
    },
    {
      id: 2,
      name: "Luna",
      type: "Cat",
      breed: "Persian",
      age: "2 years",
      image: "/placeholder.svg?height=400&width=600",
      status: "Vaccination Due",
      lastCheckup: "2024-01-20",
    },
  ]

  return (
    <div className="flex-1 container py-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">My Pets</h1>
            <p className="text-muted-foreground mt-2">Manage your pets' profiles and health records</p>
          </div>
          <Button asChild>
            <Link href="/pets/add">
              <Plus className="mr-2 h-4 w-4" />
              Add Pet
            </Link>
          </Button>
        </div>

        <div className="flex gap-4 items-center">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search pets..." className="pl-8" />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Pet type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Pets</SelectItem>
              <SelectItem value="dog">Dogs</SelectItem>
              <SelectItem value="cat">Cats</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {pets.map((pet) => (
            <Card key={pet.id} className="overflow-hidden">
              <img src={pet.image || "/placeholder.svg"} alt={pet.name} className="w-full aspect-video object-cover" />
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{pet.name}</CardTitle>
                    <CardDescription>
                      {pet.breed} • {pet.age}
                    </CardDescription>
                  </div>
                  <Badge variant={pet.status === "Healthy" ? "outline" : "destructive"}>{pet.status}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-sm">Last checkup: {new Date(pet.lastCheckup).toLocaleDateString()}</div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" asChild>
                  <Link href={`/pets/${pet.id}/profile`}>View Profile</Link>
                </Button>
                <Button asChild>
                  <Link href={`/pets/${pet.id}/health`}>Health Records</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

