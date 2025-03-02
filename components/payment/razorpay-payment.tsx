"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

declare global {
  interface Window {
    Razorpay: any
  }
}

interface RazorpayPaymentProps {
  orderData: {
    razorpayOrderId: string
    amount: number
    currency: string
    key: string
    bookingId: string
    booking: {
      date: string
      time: string
      notes?: string
      provider: {
        name: string
        email: string
      }
    }
  }
  onSuccess?: () => void
  onError?: (error: any) => void
}

export function RazorpayPayment({ orderData, onSuccess, onError }: RazorpayPaymentProps) {
  const router = useRouter()

  const handlePayment = () => {
    const options = {
      key: orderData.key,
      amount: orderData.amount * 100, // Amount in paise
      currency: orderData.currency,
      name: "FluffyPet",
      description: `Booking for ${orderData.booking.date} at ${orderData.booking.time}`,
      order_id: orderData.razorpayOrderId,
      handler: (response: any) => {
        // Handle successful payment
        console.log("Payment successful:", response)
        onSuccess?.()
        router.push("/bookings/success")
      },
      prefill: {
        name: orderData.booking.provider.name,
        email: orderData.booking.provider.email,
      },
      notes: {
        booking_id: orderData.bookingId,
        date: orderData.booking.date,
        time: orderData.booking.time,
      },
      theme: {
        color: "#6366f1",
      },
      modal: {
        ondismiss: () => {
          console.log("Payment modal closed")
        },
      },
    }

    try {
      const razorpay = new window.Razorpay(options)
      razorpay.open()
    } catch (error) {
      console.error("Error initializing Razorpay:", error)
      onError?.(error)
    }
  }

  useEffect(() => {
    // Load Razorpay script
    const script = document.createElement("script")
    script.src = "https://checkout.razorpay.com/v1/checkout.js"
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <Button onClick={handlePayment} className="w-full">
      Pay ₹{orderData.amount}
    </Button>
  )
}

