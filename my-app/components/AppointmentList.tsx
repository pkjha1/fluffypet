'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface Appointment {
  id: number
  petName: string
  service: string
  date: string
  time: string
}

export default function AppointmentList() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch('/api/appointments')
        if (!response.ok) {
          throw new Error('Failed to fetch appointments')
        }
        const data = await response.json()
        setAppointments(data)
      } catch (err) {
        setError('Failed to load appointments. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchAppointments()
  }, [])

  if (isLoading) return <div>Loading appointments...</div>
  if (error) return <div className="text-red-500">{error}</div>

  return (
    <div className="grid gap-4">
      {appointments.map((appointment) => (
        <Card key={appointment.id}>
          <CardHeader>
            <CardTitle>{appointment.petName}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Service: {appointment.service}</p>
            <p>Date: {appointment.date}</p>
            <p>Time: {appointment.time}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

