"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Syringe, Stethoscope, PillIcon as Pills, FileText, Activity } from "lucide-react"

interface TimelineEvent {
  id: string
  type: "vaccination" | "checkup" | "medication" | "test" | "observation"
  title: string
  description: string
  date: Date
  provider?: string
}

export function MedicalTimeline() {
  // This would typically come from your API
  const events: TimelineEvent[] = [
    {
      id: "1",
      type: "vaccination",
      title: "Rabies Vaccination",
      description: "Annual rabies vaccination administered",
      date: new Date("2024-02-15"),
      provider: "Dr. Smith",
    },
    {
      id: "2",
      type: "checkup",
      title: "Regular Checkup",
      description: "All vitals normal, slight tartar buildup noted",
      date: new Date("2024-02-01"),
      provider: "Dr. Johnson",
    },
    {
      id: "3",
      type: "medication",
      title: "Flea Treatment",
      description: "Monthly flea treatment applied",
      date: new Date("2024-01-15"),
    },
    {
      id: "4",
      type: "test",
      title: "Blood Work",
      description: "Annual blood work completed - all results normal",
      date: new Date("2024-01-10"),
      provider: "Central Lab",
    },
  ]

  const getEventIcon = (type: TimelineEvent["type"]) => {
    switch (type) {
      case "vaccination":
        return <Syringe className="h-4 w-4" />
      case "checkup":
        return <Stethoscope className="h-4 w-4" />
      case "medication":
        return <Pills className="h-4 w-4" />
      case "test":
        return <FileText className="h-4 w-4" />
      case "observation":
        return <Activity className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-4">
      {events.map((event) => (
        <Card key={event.id}>
          <CardContent className="p-4">
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-primary/10 p-2">{getEventIcon(event.type)}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{event.title}</h4>
                    <p className="text-sm text-muted-foreground">{event.description}</p>
                  </div>
                  <Badge variant="outline">{event.type}</Badge>
                </div>
                <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{event.date.toLocaleDateString()}</span>
                  {event.provider && (
                    <>
                      <span>•</span>
                      <span>{event.provider}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

