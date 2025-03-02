"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { fetchPetHealthRecords } from "@/app/actions"
import { MedicationSchedule } from "@/components/medication-schedule"

export function BookingCalendar({ hostel }) {
  const [selectedPet, setSelectedPet] = useState("")
  const [selectedRoom, setSelectedRoom] = useState("")
  const [dates, setDates] = useState({
    from: null,
    to: null,
  })
  const [healthRecords, setHealthRecords] = useState(null)

  async function handlePetSelect(petId: string) {
    setSelectedPet(petId)
    const records = await fetchPetHealthRecords(petId)
    setHealthRecords(records)
  }

  return (
    <div className="grid gap-6 md:grid-cols-[1fr_300px]">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Booking Details</CardTitle>
            <CardDescription>Select your pet, room, and dates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Select Pet</Label>
              <Select value={selectedPet} onValueChange={handlePetSelect}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a pet" />
                </SelectTrigger>
                <SelectContent>{/* Add your pets list here */}</SelectContent>
              </Select>
            </div>

            <div>
              <Label>Select Room Type</Label>
              <Select value={selectedRoom} onValueChange={setSelectedRoom}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a room" />
                </SelectTrigger>
                <SelectContent>
                  {hostel.rooms.map((room) => (
                    <SelectItem key={room.id} value={room.id}>
                      {room.name} - ₹{room.price_per_night}/night
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Select Dates</Label>
              <Calendar
                mode="range"
                selected={dates}
                onSelect={setDates}
                numberOfMonths={2}
                disabled={(date) => date < new Date()}
                className="rounded-md border"
              />
            </div>
          </CardContent>
        </Card>

        {healthRecords && (
          <Card>
            <CardHeader>
              <CardTitle>Health Information</CardTitle>
              <CardDescription>Important health details for your pet's stay</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {healthRecords.medications.length > 0 && (
                <div>
                  <Label>Medication Schedule</Label>
                  <MedicationSchedule medications={healthRecords.medications} />
                </div>
              )}

              {healthRecords.conditions.length > 0 && (
                <div>
                  <Label>Medical Conditions</Label>
                  <div className="space-y-2">
                    {healthRecords.conditions.map((condition) => (
                      <div key={condition.name} className="p-3 border rounded-lg">
                        <p className="font-medium">{condition.name}</p>
                        <p className="text-sm text-muted-foreground">{condition.notes}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <Label>Special Care Instructions</Label>
                <Textarea placeholder="Add any special care instructions for your pet" />
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Booking Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedRoom && dates.from && dates.to && (
              <>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Room Rate</span>
                    <span>₹{hostel.rooms.find((r) => r.id === selectedRoom)?.price_per_night}/night</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Number of Nights</span>
                    <span>{Math.ceil((dates.to - dates.from) / (1000 * 60 * 60 * 24))}</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>Total Amount</span>
                    <span>
                      ₹
                      {hostel.rooms.find((r) => r.id === selectedRoom)?.price_per_night *
                        Math.ceil((dates.to - dates.from) / (1000 * 60 * 60 * 24))}
                    </span>
                  </div>
                </div>
                <Button className="w-full">Proceed to Payment</Button>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cancellation Policy</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{hostel.hostel_details.cancellation_policy}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

