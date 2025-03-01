"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Star } from "lucide-react"

export function ProviderReviews() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Provider Reviews</CardTitle>
        <CardDescription>All reviews and ratings</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {[1, 2, 3, 4].map((_, i) => (
            <div key={i} className="border-b pb-4 last:border-0">
              <div className="flex items-start gap-4">
                <Avatar>
                  <AvatarImage src={`/placeholder.svg?${i}`} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold">Client Name</h4>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">Excellent service! Very professional and caring.</p>
                  <div className="mt-2 text-xs text-muted-foreground">Posted on March 1, 2024</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

