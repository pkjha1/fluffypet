'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface Pet {
  id: number
  name: string
  type: string
  breed: string | null
  age: number
  medicalInfo: string | null
}

export default function PetList() {
  const [pets, setPets] = useState<Pet[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await fetch(`/api/pets?page=${page}&limit=10`)
        if (!response.ok) {
          throw new Error('Failed to fetch pets')
        }
        const data = await response.json()
        setPets(prevPets => [...prevPets, ...data.pets])
        setHasMore(data.hasMore)
      } catch (err) {
        setError('Failed to load pets. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchPets()
  }, [page])

  const loadMore = () => {
    setPage(prevPage => prevPage + 1)
  }

  if (isLoading && page === 1) return <div>Loading pets...</div>
  if (error) return <div className="text-red-500">{error}</div>

  return (
    <div className="space-y-4">
      <div className="grid gap-4">
        {pets.map((pet) => (
          <Card key={pet.id}>
            <CardHeader>
              <CardTitle>{pet.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Type: {pet.type}</p>
              <p>Breed: {pet.breed || 'N/A'}</p>
              <p>Age: {pet.age}</p>
              {pet.medicalInfo && <p>Medical Info: {pet.medicalInfo}</p>}
            </CardContent>
          </Card>
        ))}
      </div>
      {hasMore && (
        <Button onClick={loadMore} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Load More'}
        </Button>
      )}
    </div>
  )
}

