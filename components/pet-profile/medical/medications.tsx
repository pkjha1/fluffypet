"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Pill } from "lucide-react"

export function Medications() {
  const medications = [
    {
      id: 1,
      name: "Insulin",
      dosage: "10 units",
      frequency: "Twice daily",
      startDate: "2023-05-15",
      endDate: null,
      status: "Active",
      prescribedBy: "Dr. Smith",
    },
    {
      id: 2,
      name: "Pain Medication",
      dosage: "1 tablet",
      frequency: "As needed",
      startDate: "2023-09-01",
      endDate: "2023-09-14",
      status: "Completed",
      prescribedBy: "Dr. Johnson",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Pill className="h-5 w-5" />
          Medications
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {medications.map((medication) => (
            <div key={medication.id} className="rounded-lg border p-4 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">{medication.name}</h4>
                <Badge variant={medication.status === "Active" ? "default" : "secondary"}>{medication.status}</Badge>
              </div>
              <div className="grid gap-1 text-sm">
                <div className="text-muted-foreground">Dosage: {medication.dosage}</div>
                <div className="text-muted-foreground">Frequency: {medication.frequency}</div>
                <div className="text-muted-foreground">
                  Start Date: {new Date(medication.startDate).toLocaleDateString()}
                </div>
                {medication.endDate && (
                  <div className="text-muted-foreground">
                    End Date: {new Date(medication.endDate).toLocaleDateString()}
                  </div>
                )}
                <div className="text-muted-foreground">Prescribed by: {medication.prescribedBy}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

