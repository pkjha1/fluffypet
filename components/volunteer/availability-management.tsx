"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock, MapPin } from "lucide-react"
import { updateAvailability, updatePreferences } from "@/app/actions"

interface TimeSlot {
  day: string
  startTime: string
  endTime: string
}

interface Preferences {
  missionTypes: string[]
  maxDistance: number
  notifications: {
    email: boolean
    push: boolean
    emergency: boolean
  }
  notes: string
}

interface AvailabilityManagementProps {
  currentSchedule: TimeSlot[]
  preferences: Preferences
  location: {
    address: string
    coordinates: {
      lat: number
      lng: number
    }
  }
}

export function AvailabilityManagement({ currentSchedule, preferences, location }: AvailabilityManagementProps) {
  const [selectedDates, setSelectedDates] = useState<Date[]>([])
  const [isUpdating, setIsUpdating] = useState(false)

  async function handleAvailabilityUpdate(dates: Date[]) {
    try {
      setIsUpdating(true)
      await updateAvailability(dates)
      setSelectedDates(dates)
      // Show success message
    } catch (error) {
      // Show error message
    } finally {
      setIsUpdating(false)
    }
  }

  async function handlePreferencesUpdate(newPreferences: Partial<Preferences>) {
    try {
      setIsUpdating(true)
      await updatePreferences(newPreferences)
      // Show success message
    } catch (error) {
      // Show error message
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Availability Schedule</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Regular Schedule</Label>
              <Button variant="outline" size="sm">
                Edit Schedule
              </Button>
            </div>

            <div className="space-y-2">
              {currentSchedule.map((slot, index) => (
                <div key={index} className="flex items-center justify-between rounded-lg border p-3">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{slot.day}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {slot.startTime} - {slot.endTime}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <Label>Calendar View</Label>
            <Calendar
              mode="multiple"
              selected={selectedDates}
              onSelect={(dates) => handleAvailabilityUpdate(dates || [])}
              className="rounded-md border"
            />
            <p className="text-sm text-muted-foreground">Click dates to mark your availability</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <Label>Mission Types</Label>
            <div className="flex flex-wrap gap-2">
              {["Emergency Rescue", "Transport", "Foster Care", "Event Support", "Administrative"].map((type) => (
                <Badge
                  key={type}
                  variant={preferences.missionTypes.includes(type) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => {
                    const newTypes = preferences.missionTypes.includes(type)
                      ? preferences.missionTypes.filter((t) => t !== type)
                      : [...preferences.missionTypes, type]
                    handlePreferencesUpdate({ missionTypes: newTypes })
                  }}
                >
                  {type}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Location</Label>
            <div className="flex items-center gap-2 rounded-lg border p-3">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{location.address}</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Maximum Distance</Label>
            <Select
              value={preferences.maxDistance.toString()}
              onValueChange={(value) => handlePreferencesUpdate({ maxDistance: Number.parseInt(value, 10) })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select maximum distance" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5 miles</SelectItem>
                <SelectItem value="10">10 miles</SelectItem>
                <SelectItem value="25">25 miles</SelectItem>
                <SelectItem value="50">50 miles</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <Label>Notifications</Label>
            <div className="space-y-2">
              <div className="flex items-center justify-between rounded-lg border p-3">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive mission updates via email</p>
                </div>
                <Switch
                  checked={preferences.notifications.email}
                  onCheckedChange={(checked) =>
                    handlePreferencesUpdate({
                      notifications: { ...preferences.notifications, email: checked },
                    })
                  }
                />
              </div>

              <div className="flex items-center justify-between rounded-lg border p-3">
                <div className="space-y-0.5">
                  <Label>Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive push notifications on your device</p>
                </div>
                <Switch
                  checked={preferences.notifications.push}
                  onCheckedChange={(checked) =>
                    handlePreferencesUpdate({
                      notifications: { ...preferences.notifications, push: checked },
                    })
                  }
                />
              </div>

              <div className="flex items-center justify-between rounded-lg border p-3">
                <div className="space-y-0.5">
                  <Label>Emergency Alerts</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications for urgent cases</p>
                </div>
                <Switch
                  checked={preferences.notifications.emergency}
                  onCheckedChange={(checked) =>
                    handlePreferencesUpdate({
                      notifications: {
                        ...preferences.notifications,
                        emergency: checked,
                      },
                    })
                  }
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Additional Notes</Label>
            <Textarea
              placeholder="Any additional preferences or notes..."
              value={preferences.notes}
              onChange={(e) => handlePreferencesUpdate({ notes: e.target.value })}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

