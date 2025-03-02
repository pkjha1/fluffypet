import { CheckCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function BookingSuccessPage() {
  return (
    <div className="container max-w-md py-8">
      <Card>
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="w-12 h-12 text-green-500" />
          </div>
          <CardTitle>Booking Confirmed!</CardTitle>
          <CardDescription>Your payment has been processed successfully</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-muted-foreground">
            You will receive a confirmation email with your booking details shortly.
          </p>
          <div className="flex flex-col gap-2">
            <Button asChild>
              <Link href="/bookings">View My Bookings</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/">Return to Home</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

