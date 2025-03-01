"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Wallet, ArrowRight } from "lucide-react"
import { initiateAdoption, createEscrowContract } from "@/app/actions"
import { Check, FileCheck, Shield } from "lucide-react"

export function AdoptionProcess({ listing }) {
  const [isProcessing, setIsProcessing] = useState(false)

  async function handleAdoptionRequest(formData) {
    try {
      setIsProcessing(true)

      // Create smart contract for escrow
      const escrowContract = await createEscrowContract({
        listingId: listing.id,
        amount: listing.price,
        buyerId: "current-user-id",
        sellerId: listing.breeder.id,
      })

      // Initiate adoption process
      const adoption = await initiateAdoption({
        listingId: listing.id,
        escrowContractId: escrowContract.id,
        formData,
      })

      // Handle success
    } catch (error) {
      // Handle error
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Adoption Process</CardTitle>
          <CardDescription>Learn about the adoption process and next steps</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
              {[
                {
                  title: "Application",
                  description: "Submit your adoption application and required documents",
                  icon: FileCheck,
                },
                {
                  title: "Verification",
                  description: "We'll verify your information and schedule a meeting",
                  icon: Shield,
                },
                {
                  title: "Finalization",
                  description: "Complete the adoption process with secure payment",
                  icon: Check,
                },
              ].map((step, index) => (
                <div key={step.title} className="relative flex flex-col items-center text-center p-4">
                  {index !== 2 && (
                    <ArrowRight className="absolute right-0 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground hidden md:block" />
                  )}
                  <div className="rounded-full bg-primary/10 p-3 mb-3">
                    <step.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-medium">{step.title}</h4>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-1">
                <p className="font-medium">Secure Escrow Payment</p>
                <p className="text-sm text-muted-foreground">Payment is held in escrow until adoption is complete</p>
              </div>
              <div className="flex items-center gap-2">
                <Wallet className="h-4 w-4 text-primary" />
                <span className="font-medium">${listing.price}</span>
              </div>
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full">Start Adoption Process</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Adoption Application</DialogTitle>
                  <DialogDescription>
                    Please provide the required information to begin the adoption process
                  </DialogDescription>
                </DialogHeader>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label>Your Experience</Label>
                    <Textarea placeholder="Tell us about your experience with pets..." />
                  </div>
                  <div className="space-y-2">
                    <Label>Living Situation</Label>
                    <Textarea placeholder="Describe your home environment..." />
                  </div>
                  <div className="space-y-2">
                    <Label>References</Label>
                    <Input placeholder="Veterinarian reference" />
                  </div>
                  <div className="space-y-2">
                    <Label>Additional Notes</Label>
                    <Textarea placeholder="Any additional information..." />
                  </div>
                  <Button className="w-full" onClick={handleAdoptionRequest} disabled={isProcessing}>
                    {isProcessing ? "Processing..." : "Submit Application"}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

