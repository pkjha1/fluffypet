"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, CalendarIcon, User, MapPin } from "lucide-react"
import { updateBookingStatus, sendNotification } from "@/app/actions"

interface Booking {
  id: string
  serviceId: string
  serviceName: string
  petId: string
  petName: string
  ownerId: string
  ownerName: string
  status: "pending" | "confirmed" | "completed" | "cancelled"
  date: Date
  time: string
  duration: number
  location?: string
  notes?: string
}

export function BookingManagement({ booking }: { booking: Booking }) {
  const [isProcessing, setIsProcessing] = useState(false)

  async function handleStatusUpdate(status: Booking["status"]) {
    try {
      setIsProcessing(true)
      await updateBookingStatus(booking.id, status)
      await sendNotification({
        type: "booking_update",
        userId: booking.ownerId,
        data: {
          bookingId: booking.id,
          status,
          serviceName: booking.serviceName,
        },
      })
      // Show success message
    } catch (error) {
      // Show error message
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">View Details</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Booking Details</DialogTitle>
          <DialogDescription>Manage booking for {booking.serviceName}</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="details">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
          </TabsList>

          <TabsContent value="details">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Booking Information</CardTitle>
                  <Badge
                    variant={
                      booking.status === "confirmed"
                        ? "default"
                        : booking.status === "pending"
                          ? "warning"
                          : booking.status === "completed"
                            ? "success"
                            : "destructive"
                    }
                  >
                    {booking.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-4">
                  <User className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium">{booking.ownerName}</p>
                    <p className="text-sm text-muted-foreground">Pet: {booking.petName}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                    <span>{booking.date.toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {booking.time} ({booking.duration} mins)
                    </span>
                  </div>
                </div>

                {booking.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{booking.location}</span>
                  </div>
                )}

                {booking.notes && (
                  <div className="rounded-lg bg-muted p-4">
                    <p className="text-sm">{booking.notes}</p>
                  </div>
                )}

                <div className="flex gap-2">
                  {booking.status === "pending" && (
                    <>
                      <Button
                        className="flex-1"
                        onClick={() => handleStatusUpdate("confirmed")}
                        disabled={isProcessing}
                      >
                        Confirm Booking
                      </Button>
                      <Button
                        variant="destructive"
                        className="flex-1"
                        onClick={() => handleStatusUpdate("cancelled")}
                        disabled={isProcessing}
                      >
                        Cancel
                      </Button>
                    </>
                  )}
                  {booking.status === "confirmed" && (
                    <Button className="flex-1" onClick={() => handleStatusUpdate("completed")} disabled={isProcessing}>
                      Mark as Completed
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schedule">
            <Card>
              <CardHeader>
                <CardTitle>Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar mode="single" selected={booking.date} className="rounded-md border" />
                <div className="mt-4 space-y-2">
                  <p className="font-medium">Available Time Slots</p>
                  <div className="grid grid-cols-3 gap-2">
                    {["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"].map((time) => (
                      <Button
                        key={time}
                        variant="outline"
                        className={time === booking.time ? "border-primary" : "border-input"}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

