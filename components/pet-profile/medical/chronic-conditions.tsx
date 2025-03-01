"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertCircle } from "lucide-react"

export function ChronicConditions() {
  const conditions = [
    {
      id: 1,
      condition: "Diabetes Type 1",
      diagnosed: "2023-05-15",
      severity: "Moderate",
      status: "Managed",
      notes: "Daily insulin required",
    },
    {
      id: 2,
      condition: "Hip Dysplasia",
      diagnosed: "2023-02-10",
      severity: "Mild",
      status: "Monitored",
      notes: "Regular exercise and pain management",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5" />
          Chronic Conditions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {conditions.map((condition) => (
            <div key={condition.id} className="rounded-lg border p-4 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">{condition.condition}</h4>
                <Badge variant={condition.status === "Managed" ? "default" : "secondary"}>{condition.status}</Badge>
              </div>
              <div className="grid gap-1 text-sm">
                <div className="text-muted-foreground">
                  Diagnosed: {new Date(condition.diagnosed).toLocaleDateString()}
                </div>
                <div className="text-muted-foreground">Severity: {condition.severity}</div>
                <div className="text-muted-foreground">{condition.notes}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

