'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useUser } from '@clerk/nextjs'
// import { format, parse } from 'date-fns' // Removed as per update 1

export default function BookingForm({ serviceId }) {
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const router = useRouter()
  const { isSignedIn, user } = useUser()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isSignedIn) {
      // Redirect to sign in page or show sign in modal
      return
    }

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ serviceId, date, time, userId: user.id }),
      })
      if (response.ok) {
        router.push('/profile') // Redirect to profile page after successful booking
      } else {
        // Handle error
        console.error('Booking failed')
      }
    } catch (error) {
      console.error('Error during booking:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
        <Input
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="time" className="block text-sm font-medium text-gray-700">Time</label>
        <Input
          id="time"
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
      </div>
      <Button type="submit">Book Now</Button>
    </form>
  )
}

