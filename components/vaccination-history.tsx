"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus } from "lucide-react"
import { addVaccination } from "../app/actions"

interface VaccinationHistoryProps {
  petId: string
}

export function VaccinationHistory({ petId }: VaccinationHistoryProps) {
  const [vaccinations, setVaccinations] = useState([])
  const [isAddingVaccination, setIsAddingVaccination] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [vaccineName, setVaccineName] = useState("")

  async function handleAddVaccination() {
    if (!selectedDate || !vaccineName) return

    try {
      const newVaccination = await addVaccination(petId, {
        name: vaccineName,
        date: selectedDate,
      })

      setVaccinations([...vaccinations, newVaccination])
      setIsAddingVaccination(false)
      setSelectedDate(undefined)
      setVaccineName("")
    } catch (error) {
      console.error("Error adding vaccination:", error)
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle>Vaccination History</CardTitle>
          <CardDescription>Keep track of your pet's vaccinations</CardDescription>
        </div>
        <Dialog open={isAddingVaccination} onOpenChange={setIsAddingVaccination}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Vaccination
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Vaccination</DialogTitle>
              <DialogDescription>Record a new vaccination for your pet</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Vaccine Name</label>
                <Input
                  placeholder="Enter vaccine name"
                  value={vaccineName}
                  onChange={(e) => setVaccineName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Date</label>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                  initialFocus
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button onClick={handleAddVaccination}>Add Vaccination</Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {vaccinations.length > 0 ? (
          <div className="space-y-4">
            {vaccinations.map((vaccination, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b last:border-0">
                <div>
                  <p className="font-medium">{vaccination.name}</p>
                  <p className="text-sm text-muted-foreground">{format(new Date(vaccination.date), "PPP")}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground py-4 text-center">No vaccinations recorded yet</p>
        )}
      </CardContent>
    </Card>
  )
}

