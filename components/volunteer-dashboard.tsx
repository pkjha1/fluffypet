"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { updateVolunteerAvailability } from "@/app/actions"
import { Clock, MapPin, Award, CalendarIcon } from "lucide-react"

export function VolunteerDashboard({ profile }) {
  const [availability, setAvailability] = useState(profile.availability)
  const [isUpdating, setIsUpdating] = useState(false)

  async function handleAvailabilityUpdate(dates) {
    try {
      setIsUpdating(true)
      await updateVolunteerAvailability(dates)
      setAvailability(dates)
    } catch (error) {
      console.error("Error updating availability:", error)
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Active Missions</CardTitle>
            <CardDescription>Your current rescue and foster assignments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {profile.active_missions.map((mission) => (
                <div key={mission.id} className="flex items-start justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{mission.title}</span>
                      <Badge variant={mission.type === "rescue" ? "destructive" : "default"}>{mission.type}</Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{mission.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{new Date(mission.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              ))}
              {profile.active_missions.length === 0 && (
                <div className="text-center py-6">
                  <p className="text-muted-foreground">No active missions</p>
                  <Button variant="outline" className="mt-4">
                    Find Missions
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Achievements</CardTitle>
            <CardDescription>Your volunteer milestones and badges</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {profile.achievements.map((achievement) => (
                <div key={achievement.id} className="flex items-start gap-3 p-3 border rounded-lg">
                  <Award className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">{achievement.title}</p>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Availability</CardTitle>
            <CardDescription>Set your availability for rescue missions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="emergency">Emergency Response</Label>
                <Switch
                  id="emergency"
                  checked={profile.emergency_available}
                  onCheckedChange={(checked) => {
                    // Update emergency availability
                  }}
                />
              </div>
              <Calendar
                mode="multiple"
                selected={availability}
                onSelect={handleAvailabilityUpdate}
                className="rounded-md border"
              />
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CalendarIcon className="h-4 w-4" />
                <span>Click dates to mark your availability</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Manage your alert preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  id: "emergency",
                  label: "Emergency Alerts",
                  description: "Urgent rescue missions in your area",
                },
                {
                  id: "foster",
                  label: "Foster Requests",
                  description: "Requests for temporary foster homes",
                },
                {
                  id: "transport",
                  label: "Transport Needs",
                  description: "Animal transport coordination",
                },
              ].map((pref) => (
                <div key={pref.id} className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor={pref.id}>{pref.label}</Label>
                    <p className="text-sm text-muted-foreground">{pref.description}</p>
                  </div>
                  <Switch
                    id={pref.id}
                    checked={profile.notification_preferences[pref.id]}
                    onCheckedChange={(checked) => {
                      // Update notification preferences
                    }}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

