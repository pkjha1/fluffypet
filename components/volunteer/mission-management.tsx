"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Clock, AlertTriangle, CheckCircle, Users, Calendar, Shield } from "lucide-react"
import { acceptMission, updateMissionStatus } from "@/app/actions"

interface Mission {
  id: string
  type: "rescue" | "transport" | "foster" | "event"
  title: string
  description: string
  location: {
    address: string
    coordinates: {
      lat: number
      lng: number
    }
  }
  status: "available" | "accepted" | "in_progress" | "completed"
  urgency: "low" | "medium" | "high"
  requiredSkills: string[]
  startTime: Date
  duration: number
  team?: {
    id: string
    name: string
    role: string
  }[]
  progress?: number
}

interface MissionManagementProps {
  missions: Mission[]
  userSkills: string[]
}

export function MissionManagement({ missions, userSkills }: MissionManagementProps) {
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  async function handleAcceptMission(mission: Mission) {
    try {
      setIsProcessing(true)
      await acceptMission(mission.id)
      // Show success message
    } catch (error) {
      // Show error message
    } finally {
      setIsProcessing(false)
    }
  }

  async function handleStatusUpdate(missionId: string, status: Mission["status"]) {
    try {
      setIsProcessing(true)
      await updateMissionStatus(missionId, status)
      // Show success message
    } catch (error) {
      // Show error message
    } finally {
      setIsProcessing(false)
    }
  }

  const matchingSkills = (mission: Mission) => mission.requiredSkills.filter((skill) => userSkills.includes(skill))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Available Missions</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="available">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="available">Available</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value="available" className="space-y-4">
            {missions
              .filter((mission) => mission.status === "available")
              .map((mission) => (
                <div key={mission.id} className="flex flex-col gap-4 rounded-lg border p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{mission.title}</h3>
                        <Badge
                          variant={
                            mission.urgency === "high"
                              ? "destructive"
                              : mission.urgency === "medium"
                                ? "warning"
                                : "default"
                          }
                        >
                          {mission.urgency}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{mission.description}</p>
                    </div>
                    <Badge variant="outline">{mission.type}</Badge>
                  </div>

                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{mission.location.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {mission.startTime.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}{" "}
                        ({mission.duration} mins)
                      </span>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium">Required Skills</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {mission.requiredSkills.map((skill) => (
                        <Badge key={skill} variant={userSkills.includes(skill) ? "default" : "secondary"}>
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full" disabled={matchingSkills(mission).length === 0}>
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Mission Details</DialogTitle>
                        <DialogDescription>Review mission requirements and team</DialogDescription>
                      </DialogHeader>

                      <div className="space-y-4">
                        <div className="rounded-lg border p-4">
                          <div className="flex items-start gap-3">
                            <Shield className="h-5 w-5 text-primary mt-0.5" />
                            <div>
                              <p className="font-medium">Skill Match</p>
                              <p className="text-sm text-muted-foreground">
                                You have {matchingSkills(mission).length} of {mission.requiredSkills.length} required
                                skills
                              </p>
                            </div>
                          </div>
                        </div>

                        {mission.team && (
                          <div>
                            <h4 className="text-sm font-medium mb-2">Current Team</h4>
                            <div className="space-y-2">
                              {mission.team.map((member) => (
                                <div
                                  key={member.id}
                                  className="flex items-center justify-between rounded-lg border p-2"
                                >
                                  <span>{member.name}</span>
                                  <Badge variant="outline">{member.role}</Badge>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {mission.urgency === "high" && (
                          <div className="rounded-lg border-l-4 border-destructive bg-destructive/10 p-4">
                            <div className="flex items-start gap-3">
                              <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
                              <div>
                                <p className="font-medium text-destructive">Urgent Mission</p>
                                <p className="text-sm text-destructive">This mission requires immediate attention</p>
                              </div>
                            </div>
                          </div>
                        )}

                        <Button
                          className="w-full"
                          onClick={() => handleAcceptMission(mission)}
                          disabled={isProcessing || matchingSkills(mission).length === 0}
                        >
                          {isProcessing ? "Processing..." : "Accept Mission"}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              ))}
          </TabsContent>

          <TabsContent value="active" className="space-y-4">
            {missions
              .filter((mission) => mission.status === "accepted" || mission.status === "in_progress")
              .map((mission) => (
                <div key={mission.id} className="flex flex-col gap-4 rounded-lg border p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{mission.title}</h3>
                        <Badge variant="outline">{mission.type}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{mission.description}</p>
                    </div>
                    <Badge variant={mission.status === "in_progress" ? "default" : "secondary"}>{mission.status}</Badge>
                  </div>

                  {mission.progress !== undefined && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Progress</span>
                        <span>{mission.progress}%</span>
                      </div>
                      <Progress value={mission.progress} />
                    </div>
                  )}

                  <div className="flex items-center gap-4">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() =>
                        handleStatusUpdate(mission.id, mission.status === "accepted" ? "in_progress" : "completed")
                      }
                      disabled={isProcessing}
                    >
                      {mission.status === "accepted" ? (
                        <>
                          <Clock className="mr-2 h-4 w-4" />
                          Start Mission
                        </>
                      ) : (
                        <>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Complete Mission
                        </>
                      )}
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Users className="mr-2 h-4 w-4" />
                      Team Chat
                    </Button>
                  </div>
                </div>
              ))}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {missions
              .filter((mission) => mission.status === "completed")
              .map((mission) => (
                <div key={mission.id} className="flex flex-col gap-4 rounded-lg border p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{mission.title}</h3>
                        <Badge variant="outline">{mission.type}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{mission.description}</p>
                    </div>
                    <Badge variant="secondary">Completed</Badge>
                  </div>

                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{mission.startTime.toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{mission.location.address}</span>
                    </div>
                  </div>

                  <Button variant="outline">View Details</Button>
                </div>
              ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

