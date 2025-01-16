import { PrismaClient } from '@prisma/client'
import { notFound } from 'next/navigation'
import ReviewForm from '@/components/ReviewForm'
import BookingForm from '@/components/BookingForm'

const prisma = new PrismaClient()

export default async function VetPage({ params }: { params: { id: string } }) {
  const vet = await prisma.veterinarian.findUnique({
    where: { id: parseInt(params.id) },
    include: { reviews: true }
  })

  if (!vet) {
    notFound()
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">{vet.name}</h1>
      <p>Specialty: {vet.specialty}</p>
      <p>Location: {vet.location}</p>
      
      <section>
        <h2 className="text-2xl font-semibold mb-4">Book an Appointment</h2>
        <BookingForm vetId={vet.id} />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
        {vet.reviews.map((review) => (
          <div key={review.id} className="border p-4 rounded mb-4">
            <p>Rating: {review.rating}/5</p>
            <p>{review.comment}</p>
          </div>
        ))}
        <ReviewForm vetId={vet.id} />
      </section>
    </div>
  )
}

