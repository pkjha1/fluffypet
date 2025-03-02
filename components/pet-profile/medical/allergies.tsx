"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle } from "lucide-react"

export function Allergies() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          Allergies
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="rounded-lg border p-4">
            <h4 className="font-medium">Food Allergies</h4>
            <ul className="mt-2 space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-red-500" />
                Chicken
              </li>
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-amber-500" />
                Dairy
              </li>
            </ul>
          </div>
          <div className="rounded-lg border p-4">
            <h4 className="font-medium">Environmental Allergies</h4>
            <ul className="mt-2 space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-red-500" />
                Pollen
              </li>
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-amber-500" />
                Dust
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

