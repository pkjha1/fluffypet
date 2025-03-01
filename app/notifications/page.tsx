"use client"

import { useState } from "react"
import { Bell, Calendar, MessageSquare, Settings, Star } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState("all")

  const notifications = [
    {
      id: 1,
      type: "appointment",
      title: "Upcoming Vet Appointment",
      description: "Reminder: Vet appointment for Max tomorrow at 2:00 PM",
      time: "1 hour ago",
      unread: true,
      icon: Calendar,
    },
    {
      id: 2,
      type: "reminder",
      title: "Vaccination Due",
      description: "Luna's rabies vaccination is due next week",
      time: "2 hours ago",
      unread: true,
      icon: Bell,
    },
    {
      id: 3,
      type: "message",
      title: "New Message from Dr. Smith",
      description: "Test results are ready for review",
      time: "1 day ago",
      unread: false,
      icon: MessageSquare,
    },
    {
      id: 4,
      type: "review",
      title: "Review Request",
      description: "How was your grooming session with PawFect?",
      time: "2 days ago",
      unread: false,
      icon: Star,
    },
  ]

  return (
    <div className="flex-1 container py-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Notifications</h1>
            <p className="text-muted-foreground mt-2">Stay updated with your pet's care</p>
          </div>
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </div>

        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">Unread</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="reminders">Reminders</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="space-y-4">
            {notifications.map((notification) => {
              const Icon = notification.icon
              return (
                <Card key={notification.id}>
                  <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                    <div className={`rounded-full p-2 ${notification.unread ? "bg-primary/10" : "bg-muted"}`}>
                      <Icon className={`h-4 w-4 ${notification.unread ? "text-primary" : "text-muted-foreground"}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">{notification.title}</CardTitle>
                        {notification.unread && <Badge>New</Badge>}
                      </div>
                      <CardDescription>{notification.time}</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{notification.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </TabsContent>
          {/* Other tab contents would be similar */}
        </Tabs>
      </div>
    </div>
  )
}

