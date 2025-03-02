"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { ScrollArea } from "@/components/ui/scroll-area"

export function VolunteerSchedule() {
  const schedule = [
    {
      id: 1,
      date: "2024-03-05",
      shifts: [
        {
          time: "9:00 AM - 1:00 PM",
          volunteers: ["John Doe", "Jane Smith"],
          task: "Kennel Cleaning",
        },
        {
          time: "2:00 PM - 6:00 PM",
          volunteers: ["Mike Wilson", "Sarah Johnson"],
          task: "Dog Walking",
        },
      ],
    },
    // Add more schedule entries as needed
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Volunteer Schedule</CardTitle>
      </CardHeader>
      <CardContent className="flex gap-4">
        <div className="w-full max-w-sm">
          <Calendar mode="single" />
        </div>
        <ScrollArea className="h-[300px] flex-1">
          <div className="space-y-4">
            {schedule.map((day) => (
              <div key={day.id} className="space-y-2">
                <h3 className="font-medium">{day.date}</h3>
                {day.shifts.map((shift, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <p className="font-medium">{shift.time}</p>
                    <p className="text-sm text-muted-foreground">{shift.task}</p>
                    <p className="text-sm">Volunteers: {shift.volunteers.join(", ")}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

