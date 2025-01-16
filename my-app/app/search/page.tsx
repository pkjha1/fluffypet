import { PrismaClient } from '@prisma/client'
import ServiceCard from '@/components/ServiceCard'
import VetCard from '@/components/VetCard'
import PlaceCard from '@/components/PlaceCard'

const prisma = new PrismaClient()

export default async function SearchResults({ searchParams }: { searchParams: { q: string } }) {
  const query = searchParams.q

  const services = await prisma.serviceProvider.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: 'insensitive' } },
        { type: { contains: query, mode: 'insensitive' } },
      ],
    },
    take: 5,
  })

  const vets = await prisma.veterinarian.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: 'insensitive' } },
        { specialty: { contains: query, mode: 'insensitive' } },
      ],
    },
    take: 5,
  })

  const places = await prisma.place.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: 'insensitive' } },
        { type: { contains: query, mode: 'insensitive' } },
      ],
    },
    take: 5,
  })

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Search Results for "{query}"</h1>
      
      <section>
        <h2 className="text-2xl font-semibold mb-4">Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Veterinarians</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {vets.map((vet) => (
            <VetCard key={vet.id} vet={vet} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Places</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {places.map((place) => (
            <PlaceCard key={place.id} place={place} />
          ))}
        </div>
      </section>
    </div>
  )
}

