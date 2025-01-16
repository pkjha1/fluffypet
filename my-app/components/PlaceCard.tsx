import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function PlaceCard({ place }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{place.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Type: {place.type}</p>
        <p>Location: {place.location}</p>
        <Link href={`/places/${place.id}`} className="text-blue-500 hover:underline">
          View Details
        </Link>
      </CardContent>
    </Card>
  )
}

