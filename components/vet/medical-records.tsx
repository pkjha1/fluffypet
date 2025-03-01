"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { FileText, Plus, Upload, Shield, Calendar, Syringe, Stethoscope, PillIcon as Pills } from "lucide-react"
import { updateMedicalRecord, verifyBlockchainRecord } from "@/app/actions"

interface MedicalRecordsProps {
  petId: string
  records: any[]
}

export function MedicalRecords({ petId, records }: MedicalRecordsProps) {
  const [isUpdating, setIsUpdating] = useState(false)

  async function handleRecordUpdate(data: any) {
    try {
      setIsUpdating(true)
      await updateMedicalRecord(petId, data)
      // Show success message
    } catch (error) {
      // Show error message
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Medical Records</CardTitle>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Record
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Medical Record</DialogTitle>
              <DialogDescription>Create a new medical record entry</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Record Type</label>
                <select className="w-full">
                  <option value="examination">Examination</option>
                  <option value="vaccination">Vaccination</option>
                  <option value="prescription">Prescription</option>
                  <option value="surgery">Surgery</option>
                  <option value="test_results">Test Results</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea placeholder="Enter record details..." />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Attachments</label>
                <div className="flex items-center gap-2">
                  <Input type="file" multiple />
                  <Button variant="outline" size="icon">
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Button className="w-full" onClick={() => handleRecordUpdate({})} disabled={isUpdating}>
                {isUpdating ? "Saving..." : "Save Record"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {records.map((record) => (
            <div key={record.id} className="flex flex-col gap-4 rounded-lg border p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  {getRecordIcon(record.type)}
                  <div>
                    <p className="font-medium">{record.title}</p>
                    <p className="text-sm text-muted-foreground">{record.description}</p>
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className="flex items-center gap-1"
                  onClick={() => verifyBlockchainRecord(record.blockchainId)}
                >
                  <Shield className="h-3 w-3" />
                  Verify
                </Badge>
              </div>

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(record.date).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-1">
                  <FileText className="h-4 w-4" />
                  {record.attachments?.length || 0} attachments
                </div>
              </div>

              {record.attachments?.length > 0 && (
                <div className="flex gap-2">
                  {record.attachments.map((attachment: any) => (
                    <Button key={attachment.id} variant="outline" size="sm" className="text-xs">
                      View {attachment.type}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function getRecordIcon(type: string) {
  switch (type) {
    case "vaccination":
      return <Syringe className="h-5 w-5 text-primary" />
    case "examination":
      return <Stethoscope className="h-5 w-5 text-primary" />
    case "prescription":
      return <Pills className="h-5 w-5 text-primary" />
    default:
      return <FileText className="h-5 w-5 text-primary" />
  }
}

