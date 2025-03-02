"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function RoomOverview() {
  const rooms = [
    { id: 1, name: "Deluxe Suite 1", status: "occupied", pet: "Max (Dog)", checkOut: "2024-03-05" },
    { id: 2, name: "Cat Room 3", status: "available", lastCleaned: "2024-03-01" },
    { id: 3, name: "Standard Room 5", status: "maintenance", issue: "Deep cleaning" },
    { id: 4, name: "Premium Suite 2", status: "reserved", checkIn: "2024-03-03" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Room Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {rooms.map((room) => (
            <div key={room.id} className="flex items-center justify-between border-b pb-4">
              <div>
                <h3 className="font-medium">{room.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {room.status === "occupied" && `Current Guest: ${room.pet}`}
                  {room.status === "available" && `Last Cleaned: ${room.lastCleaned}`}
                  {room.status === "maintenance" && `Issue: ${room.issue}`}
                  {room.status === "reserved" && `Check-in: ${room.checkIn}`}
                </p>
              </div>
              <Badge
                variant={
                  room.status === "available"
                    ? "success"
                    : room.status === "occupied"
                      ? "default"
                      : room.status === "maintenance"
                        ? "destructive"
                        : "secondary"
                }
              >
                {room.status}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

