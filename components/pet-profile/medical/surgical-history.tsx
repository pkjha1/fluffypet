"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Scissors } from "lucide-react"

export function SurgicalHistory() {
  const surgeries = [
    {
      id: 1,
      procedure: "Spay Surgery",
      date: "2023-06-15",
      surgeon: "Dr. Smith",
      facility: "Animal Hospital",
      outcome: "Successful",
      notes: "Routine procedure, no complications",
    },
    {
      id: 2,
      procedure: "Dental Extraction",
      date: "2023-09-20",
      surgeon: "Dr. Johnson",
      facility: "Pet Dental Clinic",
      outcome: "Successful",
      notes: "Removed two infected teeth",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Scissors className="h-5 w-5" />
          Surgical History
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {surgeries.map((surgery) => (
            <div key={surgery.id} className="rounded-lg border p-4 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">{surgery.procedure}</h4>
                <Badge>{surgery.outcome}</Badge>
              </div>
              <div className="grid gap-1 text-sm">
                <div className="text-muted-foreground">Date: {new Date(surgery.date).toLocaleDateString()}</div>
                <div className="text-muted-foreground">Surgeon: {surgery.surgeon}</div>
                <div className="text-muted-foreground">Facility: {surgery.facility}</div>
                <div className="text-muted-foreground">{surgery.notes}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

