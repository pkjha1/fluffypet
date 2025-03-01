"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Bell } from "lucide-react"

export function MonitoringSystem() {
  const alerts = [
    {
      id: 1,
      title: "Temperature Alert",
      description: "Room 102 temperature above threshold (26°C)",
      severity: "high",
    },
    {
      id: 2,
      title: "Feeding Schedule",
      description: "Luna (Room 205) upcoming meal in 15 minutes",
      severity: "info",
    },
    {
      id: 3,
      title: "Medication Reminder",
      description: "Max (Room 103) needs medication at 3:00 PM",
      severity: "medium",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Live Monitoring</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alerts.map((alert) => (
            <Alert
              key={alert.id}
              variant={
                alert.severity === "high" ? "destructive" : alert.severity === "medium" ? "default" : "secondary"
              }
            >
              <Bell className="h-4 w-4" />
              <AlertTitle>{alert.title}</AlertTitle>
              <AlertDescription>{alert.description}</AlertDescription>
            </Alert>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

