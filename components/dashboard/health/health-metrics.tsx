"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Activity, Heart, Thermometer, Scale } from "lucide-react"

interface HealthMetric {
  name: string
  value: number
  unit: string
  status: "normal" | "warning" | "alert"
  change?: {
    value: number
    trend: "up" | "down"
  }
}

export function HealthMetrics() {
  // This would typically come from your IoT devices or API
  const metrics: HealthMetric[] = [
    {
      name: "Activity Level",
      value: 85,
      unit: "steps/day",
      status: "normal",
      change: {
        value: 5,
        trend: "up",
      },
    },
    {
      name: "Heart Rate",
      value: 75,
      unit: "bpm",
      status: "normal",
    },
    {
      name: "Temperature",
      value: 38.5,
      unit: "°C",
      status: "normal",
    },
    {
      name: "Weight",
      value: 12.5,
      unit: "kg",
      status: "normal",
      change: {
        value: 0.2,
        trend: "up",
      },
    },
  ]

  const getMetricIcon = (name: string) => {
    switch (name) {
      case "Activity Level":
        return <Activity className="h-4 w-4" />
      case "Heart Rate":
        return <Heart className="h-4 w-4" />
      case "Temperature":
        return <Thermometer className="h-4 w-4" />
      case "Weight":
        return <Scale className="h-4 w-4" />
      default:
        return null
    }
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {metrics.map((metric) => (
        <Card key={metric.name}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              <div className="flex items-center gap-2">
                {getMetricIcon(metric.name)}
                {metric.name}
              </div>
            </CardTitle>
            <span
              className={`text-xs ${
                metric.status === "alert"
                  ? "text-destructive"
                  : metric.status === "warning"
                    ? "text-warning"
                    : "text-muted-foreground"
              }`}
            >
              {metric.status}
            </span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {metric.value} {metric.unit}
            </div>
            {metric.change && (
              <p className="text-xs text-muted-foreground">
                {metric.change.trend === "up" ? "↑" : "↓"} {metric.change.value} from last week
              </p>
            )}
            <Progress
              value={75}
              className="mt-2"
              variant={metric.status === "alert" ? "destructive" : metric.status === "warning" ? "warning" : "default"}
            />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

