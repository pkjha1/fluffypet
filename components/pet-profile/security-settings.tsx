"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Lock } from "lucide-react"

export function SecuritySettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lock className="h-5 w-5" />
          Security Settings
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Profile Privacy</h4>
              <p className="text-sm text-muted-foreground">Control who can see your pet's profile</p>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Location Sharing</h4>
              <p className="text-sm text-muted-foreground">Share location with trusted contacts</p>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Medical Data Access</h4>
              <p className="text-sm text-muted-foreground">Allow vets to access medical history</p>
            </div>
            <Switch />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

