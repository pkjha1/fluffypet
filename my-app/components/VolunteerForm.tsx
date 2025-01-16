'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useUser } from '@clerk/nextjs'

export default function VolunteerForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [experience, setExperience] = useState('')
  const router = useRouter()
  const { isSignedIn, user } = useUser()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isSignedIn) {
      // Redirect to sign in page or show sign in modal
      return
    }

    try {
      const response = await fetch('/api/volunteer-applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, experience, userId: user.id }),
      })
      if (response.ok) {
        router.push('/volunteers/thank-you') // Redirect to thank you page after successful application
      } else {
        // Handle error
        console.error('Application submission failed')
      }
    } catch (error) {
      console.error('Error during application submission:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Input
        type="tel"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />
      <Textarea
        placeholder="Tell us about your experience with animals"
        value={experience}
        onChange={(e) => setExperience(e.target.value)}
        required
      />
      <Button type="submit">Submit Application</Button>
    </form>
  )
}

