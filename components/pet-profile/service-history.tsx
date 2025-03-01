"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, DollarSign } from "lucide-react"

interface ServiceHistoryProps {
  petId: string
}

export function ServiceHistory({ petId }: ServiceHistoryProps) {
  const services = [
    {
      id: "1",
      type: "Veterinary",
      provider: "Dr. Sarah Wilson",
      location: "Downtown Pet Clinic",
      date: "2024-02-15",
      status: "completed",
      cost: 150,
      description: "Annual checkup and vaccinations",
    },
    {
      id: "2",
      type: "Grooming",
      provider: "Happy Paws Grooming",
      location: "Pet Care Center",
      date: "2024-02-01",
      status: "completed",
      cost: 75,
      description: "Full grooming service",
    },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Recent Services</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {services.map((service) => (
              <div key={service.id} className="border-b last:border-0 pb-6 last:pb-0">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="font-semibold">{service.type}</h3>
                    <p className="text-sm text-muted-foreground">{service.provider}</p>
                  </div>
                  <Badge variant={service.status === "completed" ? "default" : "secondary"}>{service.status}</Badge>
                </div>
                <div className="grid gap-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {new Date(service.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {service.location}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <DollarSign className="h-4 w-4" />${service.cost}
                  </div>
                  <p className="mt-2">{service.description}</p>
                </div>
                <div className="flex justify-end mt-4">
                  <Button variant="outline">View Details</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Services</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
            <p className="text-muted-foreground">No upcoming services scheduled</p>
            <Button className="mt-4">Book a Service</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

