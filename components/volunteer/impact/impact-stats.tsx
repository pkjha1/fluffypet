"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Clock, Award, Heart, TrendingUp } from "lucide-react"
import { verifyVolunteerHours } from "@/app/actions"

export function ImpactStats({ profile }) {
  const [verifiedHours, setVerifiedHours] = useState(null)

  useEffect(() => {
    async function loadVerifiedHours() {
      const hours = await verifyVolunteerHours(profile.id)
      setVerifiedHours(hours)
    }

    loadVerifiedHours()
  }, [profile.id])

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Hours</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{verifiedHours?.total || "Loading..."}</div>
            <p className="text-xs text-muted-foreground">Verified on blockchain</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Missions Completed</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{profile.completed_missions}</div>
            <p className="text-xs text-muted-foreground">+{profile.recent_missions} this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Animals Helped</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{profile.animals_helped}</div>
            <p className="text-xs text-muted-foreground">Through various missions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Impact Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{profile.impact_score}</div>
            <p className="text-xs text-muted-foreground">Based on community feedback</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Monthly Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px]">{/* Add a chart showing monthly volunteer hours */}</div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Impact</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {profile.recent_impact.map((impact) => (
                <div key={impact.id} className="flex items-start gap-4 border-b pb-4 last:border-0">
                  <div className="rounded-full p-2 bg-primary/10">
                    <Heart className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{impact.description}</p>
                    <p className="text-sm text-muted-foreground">{new Date(impact.date).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Verified Contributions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {verifiedHours?.contributions.map((contribution) => (
                <div key={contribution.id} className="flex items-start gap-4 border-b pb-4 last:border-0">
                  <div className="rounded-full p-2 bg-primary/10">
                    <Clock className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{contribution.mission}</p>
                    <p className="text-sm text-muted-foreground">
                      {contribution.hours} hours • {new Date(contribution.date).toLocaleDateString()}
                    </p>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="link" className="p-0 h-auto text-sm">
                          View Verification
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Blockchain Verification</DialogTitle>
                          <DialogDescription>These hours are permanently recorded on the blockchain</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="rounded-lg bg-muted p-4">
                            <p className="font-mono text-xs break-all">
                              Transaction Hash: {contribution.transaction_hash}
                            </p>
                          </div>
                          <div className="space-y-2">
                            <p className="text-sm font-medium">Details</p>
                            <ul className="text-sm space-y-1">
                              <li>Hours: {contribution.hours}</li>
                              <li>Date: {new Date(contribution.date).toLocaleString()}</li>
                              <li>Verified by: {contribution.verified_by}</li>
                            </ul>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

