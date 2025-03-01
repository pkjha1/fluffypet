"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Camera, AlertTriangle, Bell, Send } from "lucide-react"
import { sendUpdateToOwner } from "@/app/actions"

interface PetStatus {
  id: string
  petId: string
  petName: string
  roomId: string
  roomName: string
  ownerId: string
  ownerName: string
  checkIn: Date
  checkOut: Date
  status: "normal" | "attention" | "alert"
  vitals: {
    temperature: number
    activity: number
    lastMeal: Date
    lastWalk: Date
  }
  alerts: {
    type: string
    message: string
    timestamp: Date
  }[]
}

export function PetMonitoring({ pet }: { pet: PetStatus }) {
  const [isLive, setIsLive] = useState(false)
  const [isSending, setIsSending] = useState(false)

  // Simulated real-time monitoring
  useEffect(() => {
    if (isLive) {
      const interval = setInterval(() => {
        // Update vitals in real-time
      }, 5000)

      return () => clearInterval(interval)
    }
  }, [isLive])

  async function handleSendUpdate(type: "routine" | "alert", message: string) {
    try {
      setIsSending(true)
      await sendUpdateToOwner({
        petId: pet.petId,
        ownerId: pet.ownerId,
        type,
        message,
      })
      // Show success message
    } catch (error) {
      // Show error message
    } finally {
      setIsSending(false)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Monitor Pet</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Pet Monitoring - {pet.petName}</DialogTitle>
          <DialogDescription>Room: {pet.roomName}</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Live Camera</CardTitle>
                  <Camera className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="relative aspect-video rounded-lg bg-muted">
                  {isLive ? (
                    <video className="h-full w-full rounded-lg object-cover" autoPlay muted loop>
                      <source src="/pet-cam-feed.mp4" type="video/mp4" />
                    </video>
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <Button onClick={() => setIsLive(true)}>Start Feed</Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Vitals Monitor</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Temperature</span>
                    <span>{pet.vitals.temperature}°F</span>
                  </div>
                  <Progress value={((pet.vitals.temperature - 97) / (103 - 97)) * 100} />
                </div>

                <div>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Activity Level</span>
                    <span>{pet.vitals.activity}%</span>
                  </div>
                  <Progress value={pet.vitals.activity} />
                </div>

                <div className="grid gap-2">
                  <div className="flex items-center justify-between rounded-lg border p-2 text-sm">
                    <span className="text-muted-foreground">Last Meal</span>
                    <span>
                      {pet.vitals.lastMeal.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border p-2 text-sm">
                    <span className="text-muted-foreground">Last Walk</span>
                    <span>
                      {pet.vitals.lastWalk.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {pet.alerts.length > 0 && (
            <Card className="border-destructive">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                  <CardTitle className="text-base">Active Alerts</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {pet.alerts.map((alert, index) => (
                    <div key={index} className="flex items-start justify-between rounded-lg border p-3">
                      <div>
                        <p className="font-medium">{alert.type}</p>
                        <p className="text-sm text-muted-foreground">{alert.message}</p>
                      </div>
                      <Badge variant="destructive">
                        {alert.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Owner Updates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Button
                  className="flex-1"
                  variant="outline"
                  onClick={() => handleSendUpdate("routine", "Regular status update")}
                  disabled={isSending}
                >
                  <Bell className="mr-2 h-4 w-4" />
                  Send Update
                </Button>
                <Button
                  className="flex-1"
                  variant="outline"
                  onClick={() => handleSendUpdate("alert", "Immediate attention required")}
                  disabled={isSending}
                >
                  <Send className="mr-2 h-4 w-4" />
                  Alert Owner
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}

