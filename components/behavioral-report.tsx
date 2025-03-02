"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain } from "lucide-react"

export function BehavioralReport() {
  const behaviors = [
    {
      category: "Socialization",
      status: "Good",
      notes: "Friendly with other dogs and people",
      lastUpdated: "2024-02-20",
    },
    {
      category: "Training",
      status: "In Progress",
      notes: "Basic commands mastered, working on advanced training",
      lastUpdated: "2024-02-15",
    },
    {
      category: "Anxiety",
      status: "Mild",
      notes: "Shows some stress during thunderstorms",
      lastUpdated: "2024-02-10",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5" />
          Behavioral Report
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {behaviors.map((behavior) => (
            <div key={behavior.category} className="flex flex-col space-y-2 rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">{behavior.category}</h4>
                <Badge
                  variant={
                    behavior.status === "Good" ? "default" : behavior.status === "In Progress" ? "secondary" : "warning"
                  }
                >
                  {behavior.status}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{behavior.notes}</p>
              <p className="text-xs text-muted-foreground">
                Last updated: {new Date(behavior.lastUpdated).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

