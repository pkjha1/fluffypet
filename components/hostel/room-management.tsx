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
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Square, Upload, PawPrint, Thermometer, Camera } from "lucide-react"
import { updateRoom } from "@/app/actions"

const formSchema = z.object({
  name: z.string().min(1, "Room name is required"),
  type: z.enum(["standard", "deluxe", "suite"]),
  capacity: z.number().min(1, "Capacity is required"),
  size: z.number().min(1, "Size is required"),
  price: z.number().min(0, "Price is required"),
  description: z.string().min(1, "Description is required"),
  features: z.array(z.string()),
  petTypes: z.array(z.string()),
  monitoring: z.object({
    camera: z.boolean(),
    temperature: z.boolean(),
    activity: z.boolean(),
  }),
  isAvailable: z.boolean(),
})

interface RoomManagementProps {
  room?: z.infer<typeof formSchema>
}

export function RoomManagement({ room }: RoomManagementProps) {
  const [images, setImages] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: room || {
      name: "",
      type: "standard",
      capacity: 1,
      size: 0,
      price: 0,
      description: "",
      features: [],
      petTypes: [],
      monitoring: {
        camera: true,
        temperature: true,
        activity: true,
      },
      isAvailable: true,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true)
      await updateRoom({
        ...values,
        images,
      })
      // Show success message
    } catch (error) {
      // Show error message
    } finally {
      setIsSubmitting(false)
    }
  }

  const features = [
    "Window View",
    "Private Garden",
    "Climate Control",
    "Soundproof",
    "Play Area",
    "Feeding Station",
    "Grooming Station",
    "Webcam Access",
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Room Configuration</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Room Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter room name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Room Type</FormLabel>
                    <FormControl>
                      <select className="w-full p-2 border rounded-md" {...field}>
                        <option value="standard">Standard Room</option>
                        <option value="deluxe">Deluxe Room</option>
                        <option value="suite">Luxury Suite</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <FormField
                control={form.control}
                name="size"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Size (sq ft)</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Square className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="number"
                          min={0}
                          className="pl-8"
                          {...field}
                          onChange={(e) => field.onChange(Number.parseInt(e.target.value, 10))}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="capacity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Capacity</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <PawPrint className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="number"
                          min={1}
                          className="pl-8"
                          {...field}
                          onChange={(e) => field.onChange(Number.parseInt(e.target.value, 10))}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price per Night</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={0}
                        step={0.01}
                        placeholder="0.00"
                        {...field}
                        onChange={(e) => field.onChange(Number.parseFloat(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe the room..." className="resize-none" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <FormField
                control={form.control}
                name="features"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Room Features</FormLabel>
                    <div className="flex flex-wrap gap-2">
                      {features.map((feature) => (
                        <Badge
                          key={feature}
                          variant={field.value.includes(feature) ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => {
                            const newValue = field.value.includes(feature)
                              ? field.value.filter((f) => f !== feature)
                              : [...field.value, feature]
                            field.onChange(newValue)
                          }}
                        >
                          {feature}
                        </Badge>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-4 md:grid-cols-3">
                <FormField
                  control={form.control}
                  name="monitoring.camera"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <Camera className="h-4 w-4" />
                          <FormLabel>Camera Monitoring</FormLabel>
                        </div>
                        <FormDescription>24/7 video surveillance</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="monitoring.temperature"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <Thermometer className="h-4 w-4" />
                          <FormLabel>Temperature Control</FormLabel>
                        </div>
                        <FormDescription>Climate monitoring</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Room Photos</label>
              <div className="mt-2 grid gap-4 md:grid-cols-3">
                {images.map((image, index) => (
                  <div key={index} className="relative aspect-square rounded-lg overflow-hidden border">
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`Room photo ${index + 1}`}
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
                  <Button variant="outline" onClick={() => document.getElementById("room-photos")?.click()}>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Photos
                  </Button>
                  <input
                    id="room-photos"
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

            <FormField
              control={form.control}
              name="isAvailable"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel>Room Availability</FormLabel>
                    <FormDescription>Make this room available for booking</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-4">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save Room"}
              </Button>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

