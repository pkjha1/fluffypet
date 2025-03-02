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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Home, Calendar, CheckCircle, AlertTriangle, Send } from "lucide-react"
import { matchFosterHome, notifyFosterParent } from "@/app/actions"

interface FosterApplication {
  id: string
  fosterId: string
  fosterName: string
  petId: string
  petName: string
  petType: string
  startDate: Date
  endDate?: Date
  status: "pending" | "approved" | "active" | "completed"
  requirements: string[]
  homeCheck?: {
    scheduled: boolean
    date?: Date
    status?: "pending" | "passed" | "failed"
    notes?: string
  }
}

interface FosterHome {
  id: string
  name: string
  address: string
  experience: string[]
  preferences: {
    petTypes: string[]
    duration: "short" | "long" | "permanent"
    maxPets: number
  }
  currentPets: number
  verificationStatus: "verified" | "pending" | "rejected"
  rating?: number
}

const applications: FosterApplication[] = [
  // Sample application data
  {
    id: "1",
    fosterId: "f1",
    fosterName: "John Doe",
    petId: "p1",
    petName: "Buddy",
    petType: "Dog",
    startDate: new Date(),
    status: "pending",
    requirements: ["Vaccination", "Spaying/Neutering"],
  },
  // Add more sample applications as needed
]

const fosterHomes: FosterHome[] = [
  // Sample foster home data
  {
    id: "h1",
    name: "Happy Homes",
    address: "123 Main St",
    experience: ["Dogs", "Cats"],
    preferences: {
      petTypes: ["Dog", "Cat"],
      duration: "long",
      maxPets: 2,
    },
    currentPets: 1,
    verificationStatus: "verified",
  },
  // Add more sample foster homes as needed
]

export function FosterProgram() {
  const [selectedHome, setSelectedHome] = useState<FosterHome | null>(null)
  const [isMatching, setIsMatching] = useState(false)

  async function handleFosterMatch(application: FosterApplication, home: FosterHome) {
    try {
      setIsMatching(true)

      // Match foster home with pet
      await matchFosterHome({
        applicationId: application.id,
        homeId: home.id,
      })

      // Notify foster parent
      await notifyFosterParent({
        fosterId: home.id,
        petId: application.petId,
        startDate: application.startDate,
      })

      // Show success message
    } catch (error) {
      // Show error message
    } finally {
      setIsMatching(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Foster Program</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="applications">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="homes">Foster Homes</TabsTrigger>
          </TabsList>

          <TabsContent value="applications" className="space-y-4">
            {applications.map((application) => (
              <div key={application.id} className="flex flex-col gap-4 rounded-lg border p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{application.petName}</h3>
                      <Badge variant="outline">{application.petType}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Foster Parent: {application.fosterName}</p>
                  </div>
                  <Badge
                    variant={
                      application.status === "approved"
                        ? "default"
                        : application.status === "pending"
                          ? "warning"
                          : application.status === "active"
                            ? "success"
                            : "secondary"
                    }
                  >
                    {application.status}
                  </Badge>
                </div>

                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {application.startDate.toLocaleDateString()} -{" "}
                      {application.endDate ? application.endDate.toLocaleDateString() : "Ongoing"}
                    </span>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium">Requirements</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {application.requirements.map((req) => (
                      <Badge key={req} variant="secondary">
                        {req}
                      </Badge>
                    ))}
                  </div>
                </div>

                {application.homeCheck && (
                  <div className="rounded-lg bg-muted p-3">
                    <div className="flex items-start gap-2">
                      <Home className="h-4 w-4 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Home Check</p>
                        {application.homeCheck.scheduled ? (
                          <>
                            <p className="text-sm">Scheduled for: {application.homeCheck.date?.toLocaleDateString()}</p>
                            {application.homeCheck.status && (
                              <Badge
                                variant={
                                  application.homeCheck.status === "passed"
                                    ? "success"
                                    : application.homeCheck.status === "pending"
                                      ? "warning"
                                      : "destructive"
                                }
                              >
                                {application.homeCheck.status}
                              </Badge>
                            )}
                          </>
                        ) : (
                          <Button variant="outline" size="sm" className="mt-2">
                            Schedule Check
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="flex-1">Match Foster Home</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Match Foster Home</DialogTitle>
                        <DialogDescription>Find a suitable foster home for {application.petName}</DialogDescription>
                      </DialogHeader>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Search Foster Homes</Label>
                          <Input placeholder="Search by location, preferences..." />
                        </div>

                        <div className="space-y-2">
                          {fosterHomes.map((home) => (
                            <div key={home.id} className="flex items-start justify-between rounded-lg border p-4">
                              <div>
                                <div className="flex items-center gap-2">
                                  <h4 className="font-medium">{home.name}</h4>
                                  {home.verificationStatus === "verified" && (
                                    <Badge className="flex items-center gap-1">
                                      <CheckCircle className="h-3 w-3" />
                                      Verified
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-sm text-muted-foreground">{home.address}</p>
                                <div className="mt-2 flex flex-wrap gap-2">
                                  {home.preferences.petTypes.map((type) => (
                                    <Badge key={type} variant="secondary">
                                      {type}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              <Button variant="outline" onClick={() => setSelectedHome(home)}>
                                Select
                              </Button>
                            </div>
                          ))}
                        </div>

                        {selectedHome && (
                          <div className="rounded-lg border p-4">
                            <div className="flex items-start gap-3">
                              <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                              <div>
                                <p className="font-medium">Selected Home</p>
                                <p className="text-sm text-muted-foreground">
                                  {selectedHome.name} • {selectedHome.address}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}

                        <Button
                          className="w-full"
                          disabled={!selectedHome || isMatching}
                          onClick={() => selectedHome && handleFosterMatch(application, selectedHome)}
                        >
                          {isMatching ? "Matching..." : "Confirm Match"}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Button variant="outline" className="flex-1">
                    <Send className="mr-2 h-4 w-4" />
                    Contact
                  </Button>
                </div>

                {application.status === "pending" && (
                  <div className="rounded-lg border-l-4 border-warning bg-warning/10 p-4">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-warning mt-0.5" />
                      <div>
                        <p className="font-medium">Action Required</p>
                        <p className="text-sm">This application needs review and home check scheduling.</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </TabsContent>

          <TabsContent value="homes" className="space-y-4">
            {/* Foster homes management UI */}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

