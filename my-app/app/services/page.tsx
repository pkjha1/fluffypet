import { PrismaClient } from '@prisma/client'
import ServiceCard from '@/components/ServiceCard'

const prisma = new PrismaClient()

export default async function ServicesPage() {
  const services = await prisma.serviceProvider.findMany()

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Pet Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  )
}

