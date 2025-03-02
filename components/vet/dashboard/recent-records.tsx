"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function RecentRecords() {
  const records = [
    {
      id: 1,
      petName: "Max",
      type: "Vaccination",
      description: "Annual DHPP Booster",
      date: "2024-03-01",
      status: "completed",
    },
    {
      id: 2,
      petName: "Luna",
      type: "Surgery",
      description: "Dental Cleaning",
      date: "2024-02-28",
      status: "completed",
    },
    {
      id: 3,
      petName: "Rocky",
      type: "Check-up",
      description: "Post-surgery follow-up",
      date: "2024-02-27",
      status: "scheduled",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Medical Records</CardTitle>
        <CardDescription>Latest patient records and updates</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {records.map((record) => (
            <div key={record.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">{record.petName}</h4>
                  <Badge variant={record.status === "completed" ? "default" : "secondary"}>{record.status}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {record.type} - {record.description}
                </p>
                <p className="text-sm text-muted-foreground">{new Date(record.date).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

