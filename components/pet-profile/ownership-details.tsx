"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Shield, UserPlus, History } from "lucide-react"

interface OwnershipDetailsProps {
  petId: string
}

export function OwnershipDetails({ petId }: OwnershipDetailsProps) {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Current Owner</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-semibold">John Doe</h3>
              <p className="text-sm text-muted-foreground">Primary Owner since Jan 2024</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="secondary">
                  <Shield className="h-3 w-3 mr-1" />
                  Verified
                </Badge>
                <Badge variant="outline">Premium Member</Badge>
              </div>
            </div>
            <Button variant="outline">Contact</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Co-Owners & Caretakers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>JS</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h4 className="font-medium">Jane Smith</h4>
                <p className="text-sm text-muted-foreground">Co-Owner</p>
              </div>
              <Button variant="ghost" size="sm">
                Remove
              </Button>
            </div>
            <Button variant="outline" className="w-full">
              <UserPlus className="h-4 w-4 mr-2" />
              Add Co-Owner or Caretaker
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Ownership History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <History className="h-5 w-5 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm">Adopted from Happy Paws Shelter</p>
                <p className="text-xs text-muted-foreground">January 15, 2024</p>
              </div>
              <Button variant="ghost" size="sm">
                View Details
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

