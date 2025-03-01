"use client"

import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function AppointmentScheduler() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Appointment Scheduler</CardTitle>
      </CardHeader>
      <CardContent>
        <Calendar mode="single" />
      </CardContent>
    </Card>
  )
}

