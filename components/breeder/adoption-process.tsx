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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, Clock, FileText, Send, User } from "lucide-react"
import { transferPetProfile, notifyStakeholders } from "@/app/actions"

interface AdoptionRequest {
  id: string
  petId: string
  petName: string
  applicant: {
    name: string
    email: string
    phone: string
  }
  status: "pending" | "approved" | "rejected"
  submittedAt: Date
  documents: {
    name: string
    status: "verified" | "pending" | "rejected"
  }[]
}

export function AdoptionProcess({ request }: { request: AdoptionRequest }) {
  const [isProcessing, setIsProcessing] = useState(false)

  async function handleApproval() {
    try {
      setIsProcessing(true)

      // Transfer pet profile to new owner
      await transferPetProfile({
        petId: request.petId,
        fromId: "current-breeder-id",
        toId: request.applicant.id,
      })

      // Notify stakeholders
      await notifyStakeholders({
        type: "adoption_approved",
        petId: request.petId,
        adopterId: request.applicant.id,
      })

      // Show success message
    } catch (error) {
      // Show error message
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Review Application</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Adoption Application</DialogTitle>
          <DialogDescription>Review adoption application for {request.petName}</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="applicant">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="applicant">Applicant</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="transfer">Transfer</TabsTrigger>
          </TabsList>

          <TabsContent value="applicant" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Applicant Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-4">
                  <User className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium">{request.applicant.name}</p>
                    <p className="text-sm text-muted-foreground">{request.applicant.email}</p>
                    <p className="text-sm text-muted-foreground">{request.applicant.phone}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>Submitted {request.submittedAt.toLocaleDateString()}</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Required Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {request.documents.map((doc) => (
                    <div key={doc.name} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-primary" />
                        <span>{doc.name}</span>
                      </div>
                      <Badge
                        variant={
                          doc.status === "verified" ? "default" : doc.status === "pending" ? "warning" : "destructive"
                        }
                      >
                        {doc.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transfer" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Profile Transfer</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-lg border p-4">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Transfer Details</p>
                        <p className="text-sm text-muted-foreground">
                          Upon approval, the pet's profile and NFT will be transferred to the new owner.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1" onClick={handleApproval} disabled={isProcessing}>
                      {isProcessing ? "Processing..." : "Approve & Transfer"}
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Send className="mr-2 h-4 w-4" />
                      Request More Info
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

