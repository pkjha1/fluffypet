"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
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
import { MapPin, Clock, Users, AlertTriangle } from "lucide-react"
import { volunteerForMission } from "@/app/actions"

export function MissionList({ missions }) {
  const [selectedMission, setSelectedMission] = useState(null)
  const [isVolunteering, setIsVolunteering] = useState(false)

  async function handleVolunteer(missionId, data) {
    try {
      setIsVolunteering(true)
      await volunteerForMission(missionId, data)
      // Show success message
    } catch (error) {
      // Show error message
    } finally {
      setIsVolunteering(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Available Missions</h2>
          <p className="text-muted-foreground">Find rescue missions that need your help</p>
        </div>
        <div className="flex items-center gap-4">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="rescue">Rescue</SelectItem>
              <SelectItem value="foster">Foster</SelectItem>
              <SelectItem value="transport">Transport</SelectItem>
            </SelectContent>
          </Select>
          <Input placeholder="Search by location" className="w-[200px]" />
        </div>
      </div>

      <div className="grid gap-6">
        {missions.map((mission) => (
          <Card key={mission.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold">{mission.title}</h3>
                      <Badge variant={mission.urgency === "high" ? "destructive" : "default"}>
                        {mission.urgency === "high" && <AlertTriangle className="mr-1 h-3 w-3" />}
                        {mission.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{mission.description}</p>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{mission.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{new Date(mission.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{mission.volunteers_needed} volunteers needed</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {mission.required_skills.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button onClick={() => setSelectedMission(mission)} disabled={mission.volunteers_needed === 0}>
                      Volunteer
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Volunteer for Mission</DialogTitle>
                      <DialogDescription>
                        Provide additional information to volunteer for this mission
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label>Your Skills</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select relevant skills" />
                          </SelectTrigger>
                          <SelectContent>
                            {mission.required_skills.map((skill) => (
                              <SelectItem key={skill} value={skill}>
                                {skill}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Availability</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your availability" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="full">Full Time</SelectItem>
                            <SelectItem value="morning">Morning</SelectItem>
                            <SelectItem value="afternoon">Afternoon</SelectItem>
                            <SelectItem value="evening">Evening</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Additional Notes</Label>
                        <Textarea placeholder="Any additional information you'd like to share" />
                      </div>
                      <Button
                        className="w-full"
                        onClick={() => handleVolunteer(mission.id, {})}
                        disabled={isVolunteering}
                      >
                        {isVolunteering ? "Submitting..." : "Submit Application"}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

