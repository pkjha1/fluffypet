"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Clock, Phone } from "lucide-react"
import { findNearbyVolunteers, notifyVolunteers } from "@/app/actions"

export function VolunteerCoordination({ rescue }) {
  const [nearbyVolunteers, setNearbyVolunteers] = useState([])
  const [selectedVolunteers, setSelectedVolunteers] = useState([])
  const [isNotifying, setIsNotifying] = useState(false)

  useEffect(() => {
    async function loadVolunteers() {
      const volunteers = await findNearbyVolunteers({
        location: rescue.location,
        radius: 10, // km
        requiredSkills: rescue.required_skills,
      })
      setNearbyVolunteers(volunteers)
    }

    loadVolunteers()
  }, [rescue])

  async function handleNotifyVolunteers() {
    try {
      setIsNotifying(true)
      await notifyVolunteers({
        volunteers: selectedVolunteers,
        rescue: rescue,
      })
      // Show success message
    } catch (error) {
      // Show error message
    } finally {
      setIsNotifying(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Emergency Response Team</CardTitle>
          <CardDescription>Coordinate volunteers for rescue operation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium mb-2">Rescue Location</h3>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{rescue.location.address}</span>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Required Skills</h3>
              <div className="flex flex-wrap gap-2">
                {rescue.required_skills.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Available Volunteers</h3>
              <div className="space-y-2">
                {nearbyVolunteers.map((volunteer) => (
                  <Card key={volunteer.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{volunteer.user.name}</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            <span>{volunteer.distance}km away</span>
                            <Clock className="h-3 w-3 ml-2" />
                            <span>Available {volunteer.availability}</span>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedVolunteers((prev) =>
                              prev.includes(volunteer.id)
                                ? prev.filter((id) => id !== volunteer.id)
                                : [...prev, volunteer.id],
                            )
                          }}
                        >
                          {selectedVolunteers.includes(volunteer.id) ? "Selected" : "Select"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full" disabled={selectedVolunteers.length === 0 || isNotifying}>
                  {isNotifying ? "Notifying..." : "Notify Selected Volunteers"}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Send Emergency Alert</DialogTitle>
                  <DialogDescription>Notify selected volunteers about this rescue operation</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Priority Level</Label>
                    <Select defaultValue="high">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">High Priority</SelectItem>
                        <SelectItem value="medium">Medium Priority</SelectItem>
                        <SelectItem value="low">Low Priority</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Additional Notes</Label>
                    <Textarea placeholder="Add any specific instructions or requirements" />
                  </div>
                  <div>
                    <Label>Emergency Contact</Label>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <Input type="tel" placeholder="Emergency contact number" />
                    </div>
                  </div>
                  <Button className="w-full" onClick={handleNotifyVolunteers} disabled={isNotifying}>
                    {isNotifying ? "Sending Notifications..." : "Send Alert"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

