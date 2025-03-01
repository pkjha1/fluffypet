"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageCircle, Share2, Users } from "lucide-react"

interface SocialFeaturesProps {
  petId: string
}

export function SocialFeatures({ petId }: SocialFeaturesProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Pet Community</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Users className="h-8 w-8 text-primary" />
              <div className="flex-1">
                <h3 className="font-semibold">Pet Playgroup</h3>
                <p className="text-sm text-muted-foreground">Join local pet meetups and activities</p>
              </div>
              <Button>Join Group</Button>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-6">
              <Button variant="outline" className="h-auto flex-col items-center justify-center p-6 space-y-2">
                <span className="text-2xl font-bold">24</span>
                <span className="text-sm text-muted-foreground">Friends</span>
              </Button>
              <Button variant="outline" className="h-auto flex-col items-center justify-center p-6 space-y-2">
                <span className="text-2xl font-bold">12</span>
                <span className="text-sm text-muted-foreground">Events</span>
              </Button>
              <Button variant="outline" className="h-auto flex-col items-center justify-center p-6 space-y-2">
                <span className="text-2xl font-bold">156</span>
                <span className="text-sm text-muted-foreground">Photos</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-4 pb-4 border-b last:border-0 last:pb-0">
                <Avatar>
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>P{i}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-medium">Max</span> made new friends at the park
                  </p>
                  <div className="flex items-center gap-4 mt-2">
                    <button className="text-sm text-muted-foreground flex items-center gap-1">
                      <Heart className="h-4 w-4" /> 24
                    </button>
                    <button className="text-sm text-muted-foreground flex items-center gap-1">
                      <MessageCircle className="h-4 w-4" /> 8
                    </button>
                    <button className="text-sm text-muted-foreground flex items-center gap-1">
                      <Share2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Achievements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Badge className="h-12 w-12 rounded-full flex items-center justify-center" variant="secondary">
                🎓
              </Badge>
              <div className="flex-1">
                <h4 className="font-medium">Training Graduate</h4>
                <p className="text-sm text-muted-foreground">Completed basic obedience training</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge className="h-12 w-12 rounded-full flex items-center justify-center" variant="secondary">
                🏃
              </Badge>
              <div className="flex-1">
                <h4 className="font-medium">Active Explorer</h4>
                <p className="text-sm text-muted-foreground">Visited 10 different parks</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge className="h-12 w-12 rounded-full flex items-center justify-center" variant="secondary">
                ❤️
              </Badge>
              <div className="flex-1">
                <h4 className="font-medium">Social Butterfly</h4>
                <p className="text-sm text-muted-foreground">Made 20 new friends</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

