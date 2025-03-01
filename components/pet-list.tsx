"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { PawPrint, AlertCircle } from "lucide-react"
import { formatDate } from "@/lib/utils"
import type { Pet } from "@/lib/types"

interface PetListProps {
  initialPets: Pet[]
}

export function PetList({ initialPets }: PetListProps) {
  const [pets, setPets] = useState<Pet[]>(initialPets)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <div className="aspect-square relative bg-muted">
              <Skeleton className="h-full w-full" />
            </div>
            <CardHeader>
              <Skeleton className="h-8 w-3/4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3" />
            </CardContent>
            <CardFooter>
              <Skeleton className="h-10 w-full" />
            </CardFooter>
          </Card>
        ))}
      </div>
    )
  }

  if (pets.length === 0) {
    return (
      <div className="text-center py-12">
        <PawPrint className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-semibold">No pets found</h3>
        <p className="text-muted-foreground">Add your first pet to get started.</p>
        <Button asChild className="mt-4">
          <Link href="/pets/add">Add Pet</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {pets.map((pet) => (
        <Card key={pet.id} className="overflow-hidden">
          <div className="aspect-square relative bg-muted">
            {pet.imageUrl ? (
              <Image src={pet.imageUrl || "/placeholder.svg"} alt={pet.name} fill className="object-cover" />
            ) : (
              <div className="flex items-center justify-center h-full">
                <PawPrint className="h-12 w-12 text-muted-foreground" />
              </div>
            )}
          </div>
          <CardHeader>
            <CardTitle>{pet.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              {pet.species} {pet.breed ? `• ${pet.breed}` : ""}
            </p>
            <p className="text-muted-foreground text-sm mt-1">Added on {formatDate(pet.createdAt)}</p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href={`/pets/${pet.id}`}>View Details</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

