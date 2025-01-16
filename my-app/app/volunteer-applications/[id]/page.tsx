import { PrismaClient } from '@prisma/client'
import { notFound } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const prisma = new PrismaClient()

export default async function VolunteerApplicationDetails({ params }: { params: { id: string } }) {
  const application = await prisma.volunteerApplication.findUnique({
    where: { id: parseInt(params.id) },
    include: { user: true },
  })

  if (!application) {
    notFound()
  }

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Volunteer Application Details</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Applicant: {application.user.name}</p>
          <p>Service Type: {application.serviceType}</p>
          <p>Status: {application.status}</p>
        </CardContent>
      </Card>
    </div>
  )
}

