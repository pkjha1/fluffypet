"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, AlertTriangle, TrendingUp } from "lucide-react"

export function AIInsights() {
  const insights = [
    {
      id: 1,
      type: "Prediction",
      title: "Seasonal Allergies Alert",
      description: "High pollen count predicted next week. 15 patients at risk.",
      icon: Brain,
      severity: "warning",
    },
    {
      id: 2,
      type: "Analysis",
      title: "Treatment Effectiveness",
      description: "92% success rate in recent arthritis treatments.",
      icon: TrendingUp,
      severity: "success",
    },
    {
      id: 3,
      type: "Alert",
      title: "Outbreak Risk",
      description: "Potential parvo outbreak in downtown area.",
      icon: AlertTriangle,
      severity: "error",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Insights</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {insights.map((insight) => (
            <div key={insight.id} className="flex items-start gap-4 p-4 border rounded-lg">
              <insight.icon className="h-5 w-5 mt-1" />
              <div className="space-y-1">
                <h4 className="font-medium">{insight.title}</h4>
                <p className="text-sm text-muted-foreground">{insight.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

