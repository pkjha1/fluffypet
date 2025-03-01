"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { MapPin, Clock, AlertTriangle, Calendar, Heart } from "lucide-react"
import { acceptTask } from "@/app/actions"

interface Task {
  id: string
  title: string
  description: string
  type: "rescue" | "foster" | "transport" | "event" | "admin"
  urgency: "low" | "medium" | "high"
  location: {
    address: string
    distance: number
  }
  requiredSkills: string[]
  dateTime: string
  duration: number
  status: "available" | "assigned" | "completed"
  matchScore: number
  petDetails?: {
    name: string
    type: string
    age: string
    specialNeeds?: string[]
  }
}

interface TaskDiscoveryProps {
  tasks: Task[]
  userSkills: string[]
  userLocation: {
    address: string
    coordinates: {
      lat: number
      lng: number
    }
  }
}

export function TaskDiscovery({ tasks, userSkills, userLocation }: TaskDiscoveryProps) {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [isAccepting, setIsAccepting] = useState(false)
  const [filters, setFilters] = useState({
    type: "all",
    urgency: "all",
    distance: "all",
  })

  async function handleAcceptTask(taskId: string) {
    try {
      setIsAccepting(true)
      await acceptTask(taskId)
      // Show success message
    } catch (error) {
      // Show error message
    } finally {
      setIsAccepting(false)
    }
  }

  const filteredTasks = tasks.filter((task) => {
    if (filters.type !== "all" && task.type !== filters.type) return false
    if (filters.urgency !== "all" && task.urgency !== filters.urgency) return false
    if (filters.distance === "nearby" && task.location.distance > 10) return false
    return true
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Available Tasks</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-wrap gap-4">
          <Select value={filters.type} onValueChange={(value) => setFilters((prev) => ({ ...prev, type: value }))}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="rescue">Rescue</SelectItem>
              <SelectItem value="foster">Foster</SelectItem>
              <SelectItem value="transport">Transport</SelectItem>
              <SelectItem value="event">Event</SelectItem>
              <SelectItem value="admin">Administrative</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filters.urgency}
            onValueChange={(value) => setFilters((prev) => ({ ...prev, urgency: value }))}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by urgency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Urgency</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filters.distance}
            onValueChange={(value) => setFilters((prev) => ({ ...prev, distance: value }))}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by distance" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Distances</SelectItem>
              <SelectItem value="nearby">Within 10 miles</SelectItem>
            </SelectContent>
          </Select>

          <Input placeholder="Search tasks..." className="w-full md:w-auto" />
        </div>

        <div className="space-y-4">
          {filteredTasks.map((task) => (
            <div key={task.id} className="rounded-lg border p-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{task.title}</h3>
                    <Badge
                      variant={
                        task.urgency === "high" ? "destructive" : task.urgency === "medium" ? "default" : "secondary"
                      }
                    >
                      {task.urgency === "high" && <AlertTriangle className="mr-1 h-3 w-3" />}
                      {task.type}
                    </Badge>
                    {task.matchScore > 80 && (
                      <Badge variant="outline" className="ml-2">
                        {task.matchScore}% Match
                      </Badge>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{task.description}</p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>
                    {task.location.address} ({task.location.distance} miles)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{new Date(task.dateTime).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{task.duration} hours</span>
                </div>
              </div>

              {task.petDetails && (
                <div className="mt-4 rounded-lg bg-muted p-3">
                  <div className="flex items-center gap-2">
                    <Heart className="h-4 w-4 text-primary" />
                    <span className="font-medium">{task.petDetails.name}</span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {task.petDetails.type} • {task.petDetails.age}
                    {task.petDetails.specialNeeds && task.petDetails.specialNeeds.length > 0 && (
                      <> • Needs: {task.petDetails.specialNeeds.join(", ")}</>
                    )}
                  </p>
                </div>
              )}

              <div className="mt-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      className="w-full sm:w-auto"
                      variant={task.matchScore > 80 ? "default" : "secondary"}
                      onClick={() => setSelectedTask(task)}
                    >
                      View Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Task Details</DialogTitle>
                      <DialogDescription>Review the requirements and accept the task</DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <h4 className="font-medium">Required Skills</h4>
                        <div className="flex flex-wrap gap-2">
                          {task.requiredSkills.map((skill) => (
                            <Badge key={skill} variant={userSkills.includes(skill) ? "default" : "secondary"}>
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {task.urgency === "high" && (
                        <div className="rounded-lg border-l-4 border-destructive bg-destructive/10 p-4">
                          <div className="flex items-start gap-3">
                            <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
                            <div>
                              <p className="font-medium text-destructive">Urgent Task</p>
                              <p className="text-sm text-destructive">This task requires immediate attention</p>
                            </div>
                          </div>
                        </div>
                      )}

                      <Button className="w-full" onClick={() => handleAcceptTask(task.id)} disabled={isAccepting}>
                        {isAccepting ? "Accepting..." : "Accept Task"}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

