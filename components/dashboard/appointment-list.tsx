"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin } from "lucide-react"

interface Appointment {
  id: string
  petId: string
  petName: string
  type: "checkup" | "grooming" | "training"
  providerName: string
  location: string
  date: Date
  status: "upcoming" | "completed" | "cancelled"
}

export function AppointmentList({ appointments }: { appointments: Appointment[] }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Upcoming Appointments</CardTitle>
        <Button variant="outline" size="sm">
          Book New
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div key={appointment.id} className="flex flex-col gap-2 rounded-lg border p-4 hover:bg-muted/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge>{appointment.type}</Badge>
                  <span className="font-medium">{appointment.petName}</span>
                </div>
                <Badge variant="outline">{appointment.status}</Badge>
              </div>
              <div className="grid gap-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{appointment.date.toLocaleDateString()}</span>
                  <Clock className="h-4 w-4 ml-2" />
                  <span>{appointment.date.toLocaleTimeString()}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{appointment.location}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">with {appointment.providerName}</span>
                <Button variant="ghost" size="sm">
                  View Details
                </Button>
              </div>
            </div>
          ))}
          {appointments.length === 0 && (
            <div className="text-center py-6">
              <p className="text-muted-foreground">No upcoming appointments</p>
              <Button variant="outline" className="mt-4">
                Schedule an Appointment
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

