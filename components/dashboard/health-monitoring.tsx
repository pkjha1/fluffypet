"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { VirtualVet } from "./health/virtual-vet"
import { HealthMetrics } from "./health/health-metrics"
import { MedicalTimeline } from "./health/medical-timeline"
import { AlertCircle, Activity, Calendar, Brain } from "lucide-react"

interface HealthAlert {
  id: string
  petId: string
  petName: string
  type: "ai_insight" | "vital_change" | "medication_reminder" | "vaccination_due"
  severity: "low" | "medium" | "high"
  message: string
  timestamp: Date
}

interface HealthMonitoringProps {
  alerts: HealthAlert[]
}

export function HealthMonitoring({ alerts }: HealthMonitoringProps) {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <Card>
      <CardHeader>
        <CardTitle>Health Monitoring</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 lg:grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="virtual-vet">Virtual Vet</TabsTrigger>
            <TabsTrigger value="metrics">Health Metrics</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {alerts.map((alert) => (
              <div key={alert.id} className="flex items-start gap-4 rounded-lg border p-4 hover:bg-muted/50">
                <div className="rounded-full bg-primary/10 p-2">
                  {alert.type === "ai_insight" && <Brain className="h-4 w-4" />}
                  {alert.type === "vital_change" && <Activity className="h-4 w-4" />}
                  {alert.type === "medication_reminder" && <AlertCircle className="h-4 w-4" />}
                  {alert.type === "vaccination_due" && <Calendar className="h-4 w-4" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{alert.petName}</p>
                    <Button variant="ghost" size="sm">
                      View Details
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">{alert.message}</p>
                  <p className="text-xs text-muted-foreground">{alert.timestamp.toLocaleTimeString()}</p>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="virtual-vet">
            <VirtualVet />
          </TabsContent>

          <TabsContent value="metrics">
            <HealthMetrics />
          </TabsContent>

          <TabsContent value="timeline">
            <MedicalTimeline />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

