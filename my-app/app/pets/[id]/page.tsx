import { PrismaClient } from '@prisma/client'
import { notFound } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const prisma = new PrismaClient()

export default async function PetDetails({ params }: { params: { id: string } }) {
  const pet = await prisma.pet.findUnique({
    where: { id: parseInt(params.id) },
    include: { owner: true },
  })

  if (!pet) {
    notFound()
  }

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>{pet.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Type: {pet.type}</p>
          <p>Breed: {pet.breed}</p>
          <p>Age: {pet.age}</p>
          <p>Medical Info: {pet.medicalInfo || 'N/A'}</p>
          <p>Owner: {pet.owner.name}</p>
        </CardContent>
      </Card>
    </div>
  )
}

