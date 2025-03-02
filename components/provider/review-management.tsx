import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Star, MessageCircle, ThumbsUp } from "lucide-react"

interface Review {
  id: string
  petId: string
  petName: string
  ownerId: string
  ownerName: string
  rating: number
  comment: string
  date: Date
  serviceType: string
  response?: string
}

interface ReviewStats {
  averageRating: number
  totalReviews: number
  ratingDistribution: {
    rating: number
    count: number
    percentage: number
  }[]
}

export function ReviewManagement({
  reviews,
  stats,
}: {
  reviews: Review[]
  stats: ReviewStats
}) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Review Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2 text-center">
              <div className="text-4xl font-bold">{stats.averageRating}</div>
              <div className="flex justify-center">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <Star
                    key={rating}
                    className={`h-5 w-5 ${rating <= stats.averageRating ? "fill-primary text-primary" : "text-muted"}`}
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">{stats.totalReviews} reviews</p>
            </div>

            <div className="space-y-2">
              {stats.ratingDistribution
                .sort((a, b) => b.rating - a.rating)
                .map((dist) => (
                  <div key={dist.rating} className="flex items-center gap-2">
                    <span className="text-sm">{dist.rating}</span>
                    <Progress value={dist.percentage} className="flex-1" />
                    <span className="text-sm text-muted-foreground">{dist.count}</span>
                  </div>
                ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="flex flex-col gap-4 rounded-lg border p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{review.ownerName}</span>
                      <Badge variant="outline">{review.serviceType}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Pet: {review.petName}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-primary text-primary" aria-hidden="true" />
                    <span className="font-medium">{review.rating}</span>
                  </div>
                </div>

                <p className="text-sm">{review.comment}</p>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{review.date.toLocaleDateString()}</span>
                  <div className="flex gap-2">
                    {review.response ? (
                      <Button variant="outline" size="sm" className="text-xs">
                        <MessageCircle className="mr-1 h-3 w-3" />
                        Edit Response
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm" className="text-xs">
                        <MessageCircle className="mr-1 h-3 w-3" />
                        Respond
                      </Button>
                    )}
                    <Button variant="ghost" size="sm" className="text-xs">
                      <ThumbsUp className="mr-1 h-3 w-3" />
                      Thank
                    </Button>
                  </div>
                </div>

                {review.response && (
                  <div className="rounded-lg bg-muted p-3">
                    <p className="text-sm font-medium">Your Response</p>
                    <p className="mt-1 text-sm">{review.response}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

