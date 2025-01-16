import { PrismaClient } from '@prisma/client'
import { notFound } from 'next/navigation'
import ReviewForm from '@/components/ReviewForm'
import BookingForm from '@/components/BookingForm'

const prisma = new PrismaClient()

export default async function ServicePage({ params }: { params: { id: string } }) {
  const service = await prisma.serviceProvider.findUnique({
    where: { id: parseInt(params.id) },
    include: { reviews: true }
  })

  if (!service) {
    notFound()
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">{service.name}</h1>
      <p>Type: {service.type}</p>
      <p>Location: {service.location}</p>
      
      <section>
        <h2 className="text-2xl font-semibold mb-4">Book this Service</h2>
        <BookingForm serviceId={service.id} />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
        {service.reviews.map((review) => (
          <div key={review.id} className="border p-4 rounded mb-4">
            <p>Rating: {review.rating}/5</p>
            <p>{review.comment}</p>
          </div>
        ))}
        <ReviewForm serviceId={service.id} />
      </section>
    </div>
  )
}

