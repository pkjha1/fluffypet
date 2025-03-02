"use client"

import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Square, Users } from "lucide-react"

export function RoomList({ hostel }) {
  const [selectedRoom, setSelectedRoom] = useState(null)
  const [selectedDates, setSelectedDates] = useState({
    from: null,
    to: null,
  })

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {hostel.rooms.map((room) => (
        <Card key={room.id} className="flex flex-col">
          <div className="relative aspect-video">
            <Image
              src={room.images[0] || "/placeholder.svg"}
              alt={room.name}
              fill
              className="object-cover rounded-t-lg"
            />
            {!room.available && (
              <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                <Badge variant="destructive">Not Available</Badge>
              </div>
            )}
          </div>
          <CardHeader>
            <CardTitle>{room.name}</CardTitle>
            <CardDescription>{room.type}</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="space-y-4">
              <div className="flex justify-between">
                <div className="flex items-center gap-2">
                  <Square className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{room.size_sqft} sq ft</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Up to {room.capacity} pets</span>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">Features</h4>
                <div className="flex flex-wrap gap-2">
                  {room.features.map((feature) => (
                    <Badge key={feature} variant="secondary">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-baseline justify-between">
                <div className="text-2xl font-bold">₹{room.price_per_night}</div>
                <div className="text-sm text-muted-foreground">per night</div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full" disabled={!room.available} onClick={() => setSelectedRoom(room)}>
                  Book Now
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Book {room.name}</DialogTitle>
                  <DialogDescription>Select dates and provide pet details</DialogDescription>
                </DialogHeader>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <Label>Select Dates</Label>
                    <Calendar
                      mode="range"
                      selected={selectedDates}
                      onSelect={setSelectedDates}
                      numberOfMonths={2}
                      disabled={(date) => date < new Date() || !room.available}
                    />
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label>Number of Pets</Label>
                      <Input type="number" min={1} max={room.capacity} />
                    </div>
                    <div>
                      <Label>Special Instructions</Label>
                      <Textarea placeholder="Any special requirements or notes" />
                    </div>
                    <div>
                      <Label>Total Amount</Label>
                      <div className="text-2xl font-bold">
                        ₹
                        {room.price_per_night *
                          (selectedDates.to && selectedDates.from
                            ? Math.ceil((selectedDates.to - selectedDates.from) / (1000 * 60 * 60 * 24))
                            : 1)}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {selectedDates.to && selectedDates.from
                          ? `${Math.ceil((selectedDates.to - selectedDates.from) / (1000 * 60 * 60 * 24))} nights`
                          : "1 night"}
                      </p>
                    </div>
                    <Button className="w-full">Proceed to Payment</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

