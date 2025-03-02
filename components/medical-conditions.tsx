"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, X } from "lucide-react"
import { updateMedicalConditions } from "@/app/actions"

interface MedicalConditionsProps {
  petId: string
}

export function MedicalConditions({ petId }: MedicalConditionsProps) {
  const [conditions, setConditions] = useState<string[]>([])
  const [newCondition, setNewCondition] = useState("")

  async function handleAddCondition(e: React.FormEvent) {
    e.preventDefault()
    if (!newCondition.trim()) return

    try {
      const updatedConditions = [...conditions, newCondition.trim()]
      await updateMedicalConditions(petId, updatedConditions)
      setConditions(updatedConditions)
      setNewCondition("")
    } catch (error) {
      console.error("Error adding medical condition:", error)
    }
  }

  async function handleRemoveCondition(condition: string) {
    try {
      const updatedConditions = conditions.filter((c) => c !== condition)
      await updateMedicalConditions(petId, updatedConditions)
      setConditions(updatedConditions)
    } catch (error) {
      console.error("Error removing medical condition:", error)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Medical Conditions</CardTitle>
        <CardDescription>Record any medical conditions or allergies</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleAddCondition} className="flex gap-2 mb-4">
          <Input
            placeholder="Add a medical condition"
            value={newCondition}
            onChange={(e) => setNewCondition(e.target.value)}
          />
          <Button type="submit" size="icon">
            <Plus className="h-4 w-4" />
          </Button>
        </form>

        <div className="flex flex-wrap gap-2">
          {conditions.map((condition, index) => (
            <Badge key={index} variant="secondary">
              {condition}
              <button onClick={() => handleRemoveCondition(condition)} className="ml-2 hover:text-destructive">
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          {conditions.length === 0 && <p className="text-sm text-muted-foreground">No medical conditions recorded</p>}
        </div>
      </CardContent>
    </Card>
  )
}

