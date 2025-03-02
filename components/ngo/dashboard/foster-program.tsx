"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

export function FosterProgram() {
  const fosters = [
    {
      id: 1,
      fosterName: "Sarah Johnson",
      pets: ["Max (Dog)", "Luna (Cat)"],
      experience: "Advanced",
      availability: "Full-time",
      status: "Active",
    },
    {
      id: 2,
      fosterName: "Mike Wilson",
      pets: ["Bella (Dog)"],
      experience: "Intermediate",
      availability: "Weekends",
      status: "Available",
    },
    // Add more fosters as needed
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Foster Program</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px]">
          <div className="space-y-4">
            {fosters.map((foster) => (
              <div key={foster.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-medium">{foster.fosterName}</h3>
                  <p className="text-sm text-muted-foreground">Experience: {foster.experience}</p>
                  <p className="text-sm">Fostering: {foster.pets.join(", ")}</p>
                </div>
                <div className="text-right">
                  <Badge variant={foster.status === "Active" ? "default" : "secondary"}>{foster.status}</Badge>
                  <p className="text-sm text-muted-foreground mt-1">{foster.availability}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

