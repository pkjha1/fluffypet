"use client"

import type React from "react"

import { useState } from "react"
import { format } from "date-fns"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Upload, PlusCircle } from "lucide-react"
import { uploadMedicalRecord } from "@/app/actions"

interface MedicalRecordsProps {
  petId: string
}

export function MedicalRecords({ petId }: MedicalRecordsProps) {
  const [records, setRecords] = useState([])
  const [isUploading, setIsUploading] = useState(false)

  async function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      setIsUploading(true)
      const formData = new FormData()
      formData.append("file", file)
      formData.append("petId", petId)

      const record = await uploadMedicalRecord(formData)
      setRecords([...records, record])
    } catch (error) {
      console.error("Error uploading medical record:", error)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Medical Records</CardTitle>
            <CardDescription>View and manage medical records</CardDescription>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Record
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Medical Record</DialogTitle>
                <DialogDescription>Upload medical records or create a new entry</DialogDescription>
              </DialogHeader>
              <Tabs defaultValue="upload">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="upload">Upload File</TabsTrigger>
                  <TabsTrigger value="create">Create Entry</TabsTrigger>
                </TabsList>
                <TabsContent value="upload" className="space-y-4">
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <label htmlFor="record-upload" className="text-sm font-medium">
                      Upload Document
                    </label>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        className="w-full"
                        disabled={isUploading}
                        onClick={() => document.getElementById("record-upload")?.click()}
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        {isUploading ? "Uploading..." : "Choose File"}
                      </Button>
                      <input
                        id="record-upload"
                        type="file"
                        className="hidden"
                        accept=".pdf,.jpg,.png"
                        onChange={handleFileUpload}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">Supported formats: PDF, JPG, PNG</p>
                  </div>
                </TabsContent>
                <TabsContent value="create">{/* Add form for manual record creation */}</TabsContent>
              </Tabs>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {records.length > 0 ? (
          <div className="space-y-4">
            {records.map((record) => (
              <div key={record.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <FileText className="h-8 w-8 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{record.filename}</p>
                    <p className="text-sm text-muted-foreground">{format(new Date(record.created_at), "PPP")}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  View
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
            <p className="mt-2 text-sm text-muted-foreground">No medical records yet</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

