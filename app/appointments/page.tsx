"use client"

import { useState } from "react"
import { CalendarIcon, Clock, MapPin } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { format } from "date-fns"

export default function AppointmentsPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  const appointments = [
    {
      id: 1,
      type: "Vet Visit",
      petName: "Max",
      provider: "Dr. Sarah Wilson",
      location: "Central Pet Clinic",
      date: "2024-03-15",
      time: "14:00",
      status: "upcoming",
    },
    {
      id: 2,
      type: "Grooming",
      petName: "Luna",
      provider: "PawFect Grooming",
      location: "Downtown",
      date: "2024-03-20",
      time: "10:30",
      status: "upcoming",
    },
    {
      id: 3,
      type: "Training",
      petName: "Rocky",
      provider: "Elite K9 Academy",
      location: "West Side",
      date: "2024-03-12",
      time: "15:00",
      status: "completed",
    },
  ]

  return (
    <div className="flex-1 container py-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Appointments</h1>
          <p className="text-muted-foreground mt-2">Manage your pet care appointments</p>
        </div>

        <div className="grid gap-6 md:grid-cols-[300px_1fr]">
          <Card>
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
              <CardDescription>Select a date to view appointments</CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Tabs defaultValue="upcoming" className="space-y-4">
              <TabsList>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
              </TabsList>
              <TabsContent value="upcoming" className="space-y-4">
                {appointments
                  .filter((apt) => apt.status === "upcoming")
                  .map((appointment) => (
                    <Card key={appointment.id}>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0">
                        <div>
                          <CardTitle>{appointment.type}</CardTitle>
                          <CardDescription>For {appointment.petName}</CardDescription>
                        </div>
                        <Badge>{appointment.status}</Badge>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid gap-2 text-sm">
                          <div className="flex items-center gap-2">
                            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                            <span>
                              {format(new Date(appointment.date), "PPP")} at {appointment.time}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>{appointment.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>With {appointment.provider}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline">Reschedule</Button>
                          <Button variant="destructive">Cancel</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

