import { PrismaClient } from '@prisma/client'
import VetCard from '@/components/VetCard'

const prisma = new PrismaClient()

export default async function VetsPage() {
  const vets = await prisma.veterinarian.findMany()

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Veterinarians</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {vets.map((vet) => (
          <VetCard key={vet.id} vet={vet} />
        ))}
      </div>
    </div>
  )
}

