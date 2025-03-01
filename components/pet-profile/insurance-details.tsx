"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, AlertCircle } from "lucide-react"

export function InsuranceDetails() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Insurance Details
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <h4 className="font-medium">Current Plan</h4>
              <p className="text-sm text-muted-foreground">Premium Coverage</p>
            </div>
            <div className="text-right">
              <p className="font-medium">$45/month</p>
              <p className="text-sm text-muted-foreground">Next payment: July 1</p>
            </div>
          </div>
          <div className="rounded-lg border p-4">
            <div className="flex items-center gap-2 text-amber-600">
              <AlertCircle className="h-4 w-4" />
              <p className="text-sm font-medium">Renewal coming up in 30 days</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

