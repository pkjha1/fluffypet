import { PrismaClient } from '@prisma/client'
import PlaceCard from '@/components/PlaceCard'

const prisma = new PrismaClient()

export default async function PlacesPage() {
  const places = await prisma.place.findMany()

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Pet-Friendly Places</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {places.map((place) => (
          <PlaceCard key={place.id} place={place} />
        ))}
      </div>
    </div>
  )
}

