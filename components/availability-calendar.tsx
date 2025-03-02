"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock } from "lucide-react"

export function AvailabilityCalendar({ provider }) {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState<string>()

  // Get available time slots for the selected date
  const getTimeSlots = (date: Date) => {
    const dayOfWeek = date.getDay()
    return provider.availability_slots
      .filter((slot) => slot.day_of_week === dayOfWeek && slot.is_available)
      .map((slot) => ({
        value: slot.start_time,
        label: `${slot.start_time} - ${slot.end_time}`,
      }))
  }

  const timeSlots = selectedDate ? getTimeSlots(selectedDate) : []

  return (
    <div className="grid gap-6 md:grid-cols-[1fr_300px]">
      <Card>
        <CardHeader>
          <CardTitle>Select Date & Time</CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            disabled={(date) =>
              date < new Date() || // Can't select past dates
              !provider.availability_slots.some((slot) => slot.day_of_week === date.getDay() && slot.is_available)
            }
            className="rounded-md border"
          />
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Available Times</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedDate ? (
              timeSlots.length > 0 ? (
                <div className="space-y-4">
                  <Select value={selectedTime} onValueChange={setSelectedTime}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((slot) => (
                        <SelectItem key={slot.value} value={slot.value}>
                          {slot.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button className="w-full" disabled={!selectedTime}>
                    Confirm Booking
                  </Button>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">No available slots for this date</p>
              )
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">Select a date to view available times</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Regular Hours</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {provider.availability_slots
                .filter((slot) => slot.is_available)
                .map((slot, index) => (
                  <div key={index} className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{getDayName(slot.day_of_week)}</Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>
                        {slot.start_time} - {slot.end_time}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function getDayName(dayOfWeek: number): string {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  return days[dayOfWeek]
}

