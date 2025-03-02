"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, Stethoscope, Syringe, Pill } from "lucide-react"

export function MedicalTimeline() {
  const timeline = [
    {
      id: 1,
      type: "Vaccination",
      description: "Annual DHPP Booster",
      date: "2024-02-20",
      icon: Syringe,
      status: "completed",
    },
    {
      id: 2,
      type: "Check-up",
      description: "Routine Health Examination",
      date: "2024-01-15",
      icon: Stethoscope,
      status: "completed",
    },
    {
      id: 3,
      type: "Medication",
      description: "Heartworm Prevention",
      date: "2024-01-01",
      icon: Pill,
      status: "ongoing",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Medical Timeline
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative space-y-4">
          {timeline.map((event, index) => (
            <div key={event.id} className="flex gap-4">
              <div className="relative flex items-center">
                <div className="absolute left-0 h-full w-px bg-border" />
                <event.icon className="relative z-10 h-5 w-5 rounded-full bg-background p-1" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{event.type}</span>
                  <Badge variant={event.status === "completed" ? "default" : "secondary"}>{event.status}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{event.description}</p>
                <p className="text-sm text-muted-foreground">{new Date(event.date).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

