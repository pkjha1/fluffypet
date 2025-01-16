import { PrismaClient } from '@prisma/client'
import { notFound } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const prisma = new PrismaClient()

export default async function AppointmentDetails({ params }: { params: { id: string } }) {
  const appointment = await prisma.appointment.findUnique({
    where: { id: parseInt(params.id) },
    include: { pet: true, user: true, serviceProvider: true, veterinarian: true },
  })

  if (!appointment) {
    notFound()
  }

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Appointment Details</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Date: {appointment.date.toLocaleString()}</p>
          <p>Status: {appointment.status}</p>
          <p>Pet: {appointment.pet.name}</p>
          <p>Owner: {appointment.user.name}</p>
          {appointment.serviceProvider && (
            <p>Service Provider: {appointment.serviceProvider.name}</p>
          )}
          {appointment.veterinarian && (
            <p>Veterinarian: {appointment.veterinarian.name}</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

