"use client"

import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"

export function AppointmentCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <Card>
      <CardHeader>
        <CardTitle>Appointments</CardTitle>
        <CardDescription>Manage your schedule</CardDescription>
      </CardHeader>
      <CardContent>
        <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
      </CardContent>
    </Card>
  )
}

