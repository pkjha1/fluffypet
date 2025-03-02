"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"

export function UpcomingBookings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Bookings</CardTitle>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="multiple"
          selected={[new Date(2024, 2, 5), new Date(2024, 2, 8), new Date(2024, 2, 10), new Date(2024, 2, 15)]}
          className="rounded-md border"
        />
      </CardContent>
    </Card>
  )
}

