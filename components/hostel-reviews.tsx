"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

export function HostelReviews() {
  const reviews = [
    {
      id: 1,
      author: "John D.",
      avatar: "/avatars/john.jpg",
      rating: 5,
      comment: "Excellent care for my dog! The staff was very attentive.",
      date: "2024-03-01",
    },
    {
      id: 2,
      author: "Sarah M.",
      avatar: "/avatars/sarah.jpg",
      rating: 4,
      comment: "Clean facilities and friendly staff. Will come back!",
      date: "2024-02-28",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Reviews</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="flex items-start space-x-4 border-b pb-4">
              <Avatar>
                <AvatarImage src={review.avatar} alt={review.author} />
                <AvatarFallback>{review.author[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h4 className="font-medium">{review.author}</h4>
                  <div className="flex">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{review.comment}</p>
                <p className="text-xs text-muted-foreground">{review.date}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

