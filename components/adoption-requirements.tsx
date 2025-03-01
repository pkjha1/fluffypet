"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, XCircle } from "lucide-react"

export function AdoptionRequirements() {
  const requirements = [
    {
      id: 1,
      requirement: "Age requirement (18+ years)",
      met: true,
    },
    {
      id: 2,
      requirement: "Housing verification",
      met: true,
    },
    {
      id: 3,
      requirement: "Veterinary reference",
      met: false,
    },
    {
      id: 4,
      requirement: "Home visit completed",
      met: false,
    },
    {
      id: 5,
      requirement: "Adoption fee paid",
      met: false,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Adoption Requirements</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {requirements.map((item) => (
            <div key={item.id} className="flex items-center justify-between rounded-lg border p-4">
              <span className="flex items-center gap-2">
                {item.met ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500" />
                )}
                {item.requirement}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

