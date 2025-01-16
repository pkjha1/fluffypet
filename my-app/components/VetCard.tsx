import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function VetCard({ vet }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{vet.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Specialty: {vet.specialty}</p>
        <p>Location: {vet.location}</p>
        <Link href={`/vets/${vet.id}`} className="text-blue-500 hover:underline">
          View Profile
        </Link>
      </CardContent>
    </Card>
  )
}

