"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

export function AdoptionStatus() {
  const adoptions = [
    {
      id: 1,
      petName: "Max",
      type: "Dog",
      stage: "Home Visit",
      applicant: "John Doe",
      date: "2024-03-05",
    },
    {
      id: 2,
      petName: "Luna",
      type: "Cat",
      stage: "Application Review",
      applicant: "Jane Smith",
      date: "2024-03-04",
    },
    // Add more adoptions as needed
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Adoption Status</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px]">
          <div className="space-y-4">
            {adoptions.map((adoption) => (
              <div key={adoption.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-medium">{adoption.petName}</h3>
                  <p className="text-sm text-muted-foreground">{adoption.type}</p>
                  <p className="text-sm">Applicant: {adoption.applicant}</p>
                </div>
                <div className="text-right">
                  <Badge>{adoption.stage}</Badge>
                  <p className="text-sm text-muted-foreground mt-1">{adoption.date}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

