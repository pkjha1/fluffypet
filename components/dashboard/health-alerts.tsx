"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Brain, Activity, Calendar } from "lucide-react"

interface HealthAlert {
  id: string
  petId: string
  petName: string
  type: "ai_insight" | "checkup_due" | "abnormal_activity"
  severity: "low" | "medium" | "high"
  message: string
  timestamp: Date
}

export function HealthAlerts({ pets }) {
  // Simulated health alerts - in production, these would come from your AI system
  const alerts: HealthAlert[] = [
    {
      id: "1",
      petId: pets[0]?.id,
      petName: pets[0]?.name,
      type: "ai_insight",
      severity: "medium",
      message: "Unusual sleep pattern detected in the last 48 hours",
      timestamp: new Date(),
    },
    {
      id: "2",
      petId: pets[1]?.id,
      petName: pets[1]?.name,
      type: "checkup_due",
      severity: "low",
      message: "Annual vaccination due in 2 weeks",
      timestamp: new Date(),
    },
  ]

  const getAlertIcon = (type: HealthAlert["type"]) => {
    switch (type) {
      case "ai_insight":
        return <Brain className="h-4 w-4" />
      case "checkup_due":
        return <Calendar className="h-4 w-4" />
      case "abnormal_activity":
        return <Activity className="h-4 w-4" />
      default:
        return <AlertTriangle className="h-4 w-4" />
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Health Alerts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div key={alert.id} className="flex items-start gap-4 rounded-lg border p-4 hover:bg-muted/50">
              <div className="rounded-full bg-primary/10 p-2">{getAlertIcon(alert.type)}</div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{alert.petName}</p>
                  <Badge
                    variant={
                      alert.severity === "high" ? "destructive" : alert.severity === "medium" ? "warning" : "default"
                    }
                  >
                    {alert.severity}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{alert.message}</p>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">{alert.timestamp.toLocaleTimeString()}</p>
                  <Button variant="ghost" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          ))}
          {alerts.length === 0 && (
            <div className="text-center py-6">
              <p className="text-muted-foreground">No active health alerts</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

