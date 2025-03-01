"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function PatientOverview() {
  const patients = [
    {
      id: 1,
      petName: "Max",
      petType: "Dog",
      breed: "Golden Retriever",
      owner: "John Doe",
      status: "Healthy",
      lastVisit: "2024-02-28",
    },
    {
      id: 2,
      petName: "Luna",
      petType: "Cat",
      breed: "Persian",
      owner: "Jane Smith",
      status: "Under Treatment",
      lastVisit: "2024-03-01",
    },
    {
      id: 3,
      petName: "Rocky",
      petType: "Dog",
      breed: "German Shepherd",
      owner: "Mike Johnson",
      status: "Critical",
      lastVisit: "2024-03-01",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Patients</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {patients.map((patient) => (
            <div key={patient.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src={`/placeholder.svg?${patient.id}`} />
                  <AvatarFallback>{patient.petName[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium">{patient.petName}</h4>
                  <p className="text-sm text-muted-foreground">
                    {patient.breed} • {patient.owner}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Badge
                  variant={
                    patient.status === "Healthy"
                      ? "default"
                      : patient.status === "Under Treatment"
                        ? "secondary"
                        : "destructive"
                  }
                >
                  {patient.status}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  Last visit: {new Date(patient.lastVisit).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

