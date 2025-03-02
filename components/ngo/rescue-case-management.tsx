"use client"

import { useState } from "react"
import Image from "next/image"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, AlertTriangle, Upload, Phone, Users } from "lucide-react"
import { createRescueCase, notifyVolunteers } from "@/app/actions"

const formSchema = z.object({
  caseType: z.enum(["emergency", "routine", "investigation"]),
  location: z.object({
    address: z.string().min(1, "Address is required"),
    coordinates: z.object({
      lat: z.number(),
      lng: z.number(),
    }),
  }),
  description: z.string().min(1, "Description is required"),
  severity: z.enum(["critical", "moderate", "low"]),
  requiredResources: z.array(z.string()),
  contactInfo: z.object({
    name: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().email().optional(),
  }),
  medicalNeeds: z.boolean(),
  transportNeeded: z.boolean(),
})

export function RescueCaseManagement() {
  const [images, setImages] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      caseType: "routine",
      location: {
        address: "",
        coordinates: { lat: 0, lng: 0 },
      },
      description: "",
      severity: "moderate",
      requiredResources: [],
      contactInfo: {},
      medicalNeeds: false,
      transportNeeded: false,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true)

      // Create rescue case
      const rescueCase = await createRescueCase({
        ...values,
        images,
      })

      // Notify nearby volunteers
      await notifyVolunteers({
        caseId: rescueCase.id,
        severity: values.severity,
        location: values.location,
      })

      // Show success message
    } catch (error) {
      // Show error message
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>New Rescue Case</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="caseType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Case Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select case type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="emergency">Emergency</SelectItem>
                        <SelectItem value="routine">Routine</SelectItem>
                        <SelectItem value="investigation">Investigation</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="severity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Severity Level</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select severity" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="critical">Critical</SelectItem>
                        <SelectItem value="moderate">Moderate</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="location.address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <MapPin className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input className="pl-8" placeholder="Enter address" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe the situation..." className="resize-none" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="contactInfo.name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reporter Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Name of reporter" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="contactInfo.phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Number</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Phone className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input className="pl-8" placeholder="Phone number" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <FormField
                  control={form.control}
                  name="requiredResources"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Required Resources</FormLabel>
                      <div className="flex flex-wrap gap-2">
                        {["Medical Team", "Transport", "Temporary Shelter", "Food/Water", "Equipment"].map(
                          (resource) => (
                            <Badge
                              key={resource}
                              variant={field.value.includes(resource) ? "default" : "outline"}
                              className="cursor-pointer"
                              onClick={() => {
                                const newValue = field.value.includes(resource)
                                  ? field.value.filter((r) => r !== resource)
                                  : [...field.value, resource]
                                field.onChange(newValue)
                              }}
                            >
                              {resource}
                            </Badge>
                          ),
                        )}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Photos/Evidence</label>
              <div className="mt-2 grid gap-4 md:grid-cols-3">
                {images.map((image, index) => (
                  <div key={index} className="relative aspect-square rounded-lg overflow-hidden border">
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`Case photo ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={() => {
                        setImages(images.filter((_, i) => i !== index))
                      }}
                    >
                      ×
                    </Button>
                  </div>
                ))}
                <div className="flex items-center justify-center border-2 border-dashed rounded-lg p-4">
                  <Button variant="outline" onClick={() => document.getElementById("case-photos")?.click()}>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Photos
                  </Button>
                  <input
                    id="case-photos"
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      // Handle image upload
                    }}
                  />
                </div>
              </div>
            </div>

            {form.watch("severity") === "critical" && (
              <div className="rounded-lg border-l-4 border-destructive bg-destructive/10 p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="mt-1 h-5 w-5 text-destructive" />
                  <div>
                    <p className="font-medium text-destructive">Critical Case Alert</p>
                    <p className="text-sm text-destructive">
                      This will trigger immediate notifications to nearby emergency response teams and veterinarians.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-end gap-4">
              <Button type="submit" disabled={isSubmitting} className="gap-2">
                {isSubmitting ? (
                  "Creating..."
                ) : (
                  <>
                    <Users className="h-4 w-4" />
                    Dispatch Team
                  </>
                )}
              </Button>
              <Button type="button" variant="outline">
                Save as Draft
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

