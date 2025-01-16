import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function VolunteersPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Volunteer Opportunities</h1>
      <p>Join our community of pet lovers and make a difference in animals' lives!</p>
      <Link href="/volunteers/apply">
        <Button>Apply to Volunteer</Button>
      </Link>
    </div>
  )
}

