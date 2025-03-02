"use client"

import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function BookingCalendar() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Booking Calendar</CardTitle>
        <CardDescription>Manage your appointments</CardDescription>
      </CardHeader>
      <CardContent>
        <Calendar mode="single" className="rounded-md border" />
      </CardContent>
    </Card>
  )
}

