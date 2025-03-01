"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AlertTriangle, Info } from "lucide-react"

export function EmergencyAlerts() {
  const alerts = [
    {
      id: 1,
      type: "Critical",
      message: "Injured dog found - requires immediate medical attention",
      location: "Pike Place Market",
      time: "10 minutes ago",
    },
    {
      id: 2,
      type: "Warning",
      message: "Space needed for incoming rescue animals",
      location: "Main Shelter",
      time: "1 hour ago",
    },
    // Add more alerts as needed
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          Emergency Alerts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px]">
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div key={alert.id} className="flex items-start gap-4 p-4 border rounded-lg">
                {alert.type === "Critical" ? (
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                ) : (
                  <Info className="h-5 w-5 text-warning" />
                )}
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <Badge variant={alert.type === "Critical" ? "destructive" : "warning"}>{alert.type}</Badge>
                    <span className="text-sm text-muted-foreground">{alert.time}</span>
                  </div>
                  <p className="mt-2">{alert.message}</p>
                  <p className="text-sm text-muted-foreground">{alert.location}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

