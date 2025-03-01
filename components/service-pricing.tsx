"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Clock, DollarSign } from "lucide-react"
import { createBooking } from "@/app/actions"

export function ServicePricing({ provider }) {
  const [selectedService, setSelectedService] = useState(null)

  async function handleBooking(service) {
    try {
      // Create a booking
      const booking = await createBooking({
        providerId: provider.id,
        serviceId: service.id,
        // Add other booking details
      })

      // Initialize Razorpay payment
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
        amount: service.amount * 100, // Amount in smallest currency unit
        currency: "INR",
        name: "FluffyPet",
        description: `Booking for ${service.service}`,
        order_id: booking.razorpay_order_id,
        handler: (response) => {
          // Handle successful payment
          console.log(response)
        },
        prefill: {
          name: "Pet Owner Name",
          email: "owner@example.com",
        },
      }

      const paymentObject = new (window as any).Razorpay(options)
      paymentObject.open()
    } catch (error) {
      console.error("Error creating booking:", error)
    }
  }

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {provider.pricing.map((service) => (
        <Card key={service.id}>
          <CardHeader>
            <CardTitle>{service.service}</CardTitle>
            <CardDescription>{service.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span className="text-2xl font-bold">₹{service.amount}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{service.duration} mins</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Available for</Label>
                <div className="flex flex-wrap gap-2">
                  {service.pet_types.map((type) => (
                    <span key={type} className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium">
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full" onClick={() => setSelectedService(service)}>
                  Book Now
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Book {service.service}</DialogTitle>
                  <DialogDescription>Choose a date and time for your booking</DialogDescription>
                </DialogHeader>
                {/* Add booking form */}
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

