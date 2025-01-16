import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function ServiceCard({ service }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{service.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Type: {service.type}</p>
        <p>Location: {service.location}</p>
        <Link href={`/services/${service.id}`} className="text-blue-500 hover:underline">
          View Details
        </Link>
      </CardContent>
    </Card>
  )
}

