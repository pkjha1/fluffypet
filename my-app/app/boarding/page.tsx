import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function BoardingPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Pet Boarding Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href="/boarding/shared">
          <Button className="w-full h-32 text-lg">Shared Boarding</Button>
        </Link>
        <Link href="/boarding/independent">
          <Button className="w-full h-32 text-lg">Independent Boarding</Button>
        </Link>
      </div>
    </div>
  )
}

