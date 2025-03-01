import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Bell, PawPrint } from "lucide-react"
import Link from "next/link"

export default async function DashboardPage() {
  // Mock data - replace with actual data fetches
  const upcomingAppointments = [
    {
      id: 1,
      type: "Vet Visit",
      petName: "Max",
      date: "2024-03-15",
      time: "10:00 AM",
      provider: "Dr. Wilson",
    },
    {
      id: 2,
      type: "Grooming",
      petName: "Luna",
      date: "2024-03-18",
      time: "2:00 PM",
      provider: "PawFect Grooming",
    },
  ]

  const alerts = [
    {
      id: 1,
      type: "vaccination",
      petName: "Max",
      message: "Vaccination due in 5 days",
      priority: "high",
    },
    {
      id: 2,
      type: "checkup",
      petName: "Luna",
      message: "Annual checkup reminder",
      priority: "medium",
    },
  ]

  const recentActivities = [
    {
      id: 1,
      type: "medical",
      petName: "Rocky",
      action: "Medical records updated",
      timestamp: "2024-03-09T09:15:00",
    },
    {
      id: 2,
      type: "appointment",
      petName: "Luna",
      action: "Grooming appointment scheduled",
      timestamp: "2024-03-09T14:30:00",
    },
  ]

  return (
    <div className="flex-1 container py-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-2">Overview of your pet care activities</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Upcoming Appointments */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Upcoming Appointments
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{appointment.type}</p>
                    <p className="text-sm text-muted-foreground">
                      For {appointment.petName} • {appointment.provider}
                    </p>
                    <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(appointment.date).toLocaleDateString()}</span>
                      <Clock className="h-4 w-4 ml-2" />
                      <span>{appointment.time}</span>
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full" asChild>
                <Link href="/appointments">View All</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Health Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Health Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {alerts.map((alert) => (
                <div key={alert.id} className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{alert.petName}</p>
                    <p className="text-sm text-muted-foreground">{alert.message}</p>
                  </div>
                  <Badge variant={alert.priority === "high" ? "destructive" : "outline"}>{alert.priority}</Badge>
                </div>
              ))}
              <Button variant="outline" className="w-full" asChild>
                <Link href="/notifications">View All</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PawPrint className="h-5 w-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="space-y-1">
                  <p className="font-medium">{activity.petName}</p>
                  <p className="text-sm text-muted-foreground">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">{new Date(activity.timestamp).toLocaleString()}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

