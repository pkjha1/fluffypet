"use client"

import Link from "next/link"
import Image from "next/image"
import { PlusCircle, AlertCircle } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Pet {
  id: string
  petId: string
  name: string
  species: string
  breed?: string
  imageUrl?: string
  healthStatus: "healthy" | "attention" | "critical"
  lastCheckup?: Date
}

export function PetGrid({ pets }: { pets: Pet[] }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">My Pets</h2>
        <Button asChild size="sm" className="md:hidden">
          <Link href="/pets/add">
            <PlusCircle className="h-4 w-4" />
          </Link>
        </Button>
        <Button asChild className="hidden md:inline-flex">
          <Link href="/pets/add">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Pet
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {pets.map((pet) => (
          <Card key={pet.id} className="overflow-hidden">
            <CardHeader className="border-b p-0">
              <div className="aspect-video relative">
                <Image src={pet.imageUrl || "/placeholder.svg"} alt={pet.name} fill className="object-cover" />
                <Badge
                  variant={
                    pet.healthStatus === "healthy"
                      ? "default"
                      : pet.healthStatus === "attention"
                        ? "warning"
                        : "destructive"
                  }
                  className="absolute top-2 right-2"
                >
                  {pet.healthStatus === "attention" && <AlertCircle className="mr-1 h-3 w-3" />}
                  {pet.healthStatus}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-1">
                <CardTitle>{pet.name}</CardTitle>
                <div className="text-sm text-muted-foreground">
                  <p>ID: {pet.petId}</p>
                  <p>
                    {pet.species} • {pet.breed}
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button asChild variant="outline" className="w-full">
                <Link href={`/pets/${pet.id}`}>View Profile</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

