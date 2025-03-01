"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

export function RescueCases() {
  const cases = [
    {
      id: 1,
      type: "Dog",
      location: "Downtown Seattle",
      status: "Critical",
      date: "2024-03-01",
      description: "Injured stray found near Pike Place Market",
    },
    {
      id: 2,
      type: "Cat",
      location: "Ballard",
      status: "Stable",
      date: "2024-03-01",
      description: "Abandoned kittens, mother cat present",
    },
    // Add more cases as needed
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Active Rescue Cases</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px]">
          <div className="space-y-4">
            {cases.map((case_) => (
              <div key={case_.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-medium">{case_.type}</h3>
                  <p className="text-sm text-muted-foreground">{case_.location}</p>
                  <p className="text-sm">{case_.description}</p>
                </div>
                <div className="text-right">
                  <Badge variant={case_.status === "Critical" ? "destructive" : "secondary"}>{case_.status}</Badge>
                  <p className="text-sm text-muted-foreground mt-1">{case_.date}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

