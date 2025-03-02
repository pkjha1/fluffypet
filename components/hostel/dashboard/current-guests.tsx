"use client"

import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PawPrint, AlertTriangle, Bell } from "lucide-react"
import { PetMonitoring } from "@/components/hostel/pet-monitoring"

interface Guest {
  id: string
  petId: string
  name: string
  type: string
  breed: string
  room: string
  checkIn: Date
  checkOut: Date
  status: "normal" | "attention" | "alert"
  imageUrl: string
  alerts?: {
    type: string
    message: string
  }[]
}

export function CurrentGuests({ guests }: { guests: Guest[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PawPrint className="h-5 w-5" />
          Current Guests ({guests.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {guests.map((guest) => (
            <div key={guest.id} className="flex items-center justify-between gap-4 rounded-lg border p-4">
              <div className="flex items-center gap-4">
                <div className="relative h-12 w-12">
                  <Image
                    src={guest.imageUrl || "/placeholder.svg"}
                    alt={guest.name}
                    fill
                    className="rounded-full object-cover"
                  />
                  {guest.status !== "normal" && (
                    <div className="absolute -right-1 -top-1">
                      <Badge variant={guest.status === "alert" ? "destructive" : "warning"}>
                        {guest.status === "alert" ? "!" : "?"}
                      </Badge>
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="font-medium">{guest.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {guest.type} • Room {guest.room}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {guest.alerts && guest.alerts.length > 0 && (
                  <Button variant="outline" size="icon" className="text-amber-500">
                    <AlertTriangle className="h-4 w-4" />
                  </Button>
                )}
                <Button variant="outline" size="icon">
                  <Bell className="h-4 w-4" />
                </Button>
                <PetMonitoring pet={guest} />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

