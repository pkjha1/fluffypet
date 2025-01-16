'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from '@/components/ui/use-toast'

export default function BookAppointmentForm() {
  const [petName, setPetName] = useState('')
  const [service, setService] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ petName, service, date, time }),
      })
      if (!response.ok) {
        throw new Error('Failed to book appointment')
      }
      toast({
        title: 'Appointment booked successfully',
        description: `Appointment for ${petName} has been booked.`,
      })
      router.refresh()
      setPetName('')
      setService('')
      setDate('')
      setTime('')
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to book appointment. Please try again.',
        variant: 'destructive',
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="petName" className="block text-sm font-medium text-gray-700">Pet Name</label>
        <Input id="petName" value={petName} onChange={(e) => setPetName(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="service" className="block text-sm font-medium text-gray-700">Service</label>
        <Select value={service} onValueChange={setService} required>
          <SelectTrigger>
            <SelectValue placeholder="Select service" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="grooming">Grooming</SelectItem>
            <SelectItem value="training">Training</SelectItem>
            <SelectItem value="walking">Walking</SelectItem>
            <SelectItem value="vet-checkup">Veterinary Check-up</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
        <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="time" className="block text-sm font-medium text-gray-700">Time</label>
        <Input id="time" type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
      </div>
      <Button type="submit">Book Appointment</Button>
    </form>
  )
}

