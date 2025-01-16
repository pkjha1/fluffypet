import { PrismaClient } from '@prisma/client'
import { notFound } from 'next/navigation'
import ReviewForm from '@/components/ReviewForm'

const prisma = new PrismaClient()

export default async function PlacePage({ params }: { params: { id: string } }) {
  const place = await prisma.place.findUnique({
    where: { id: parseInt(params.id) },
    include: { reviews: true }
  })

  if (!place) {
    notFound()
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">{place.name}</h1>
      <p>Type: {place.type}</p>
      <p>Location: {place.location}</p>
      
      <section>
        <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
        {place.reviews.map((review) => (
          <div key={review.id} className="border p-4 rounded mb-4">
            <p>Rating: {review.rating}/5</p>
            <p>{review.comment}</p>
          </div>
        ))}
        <ReviewForm placeId={place.id} />
      </section>
    </div>
  )
}

