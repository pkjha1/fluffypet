"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { MapPin, Award, Clock, Shield } from "lucide-react"
import { updateVolunteerProfile } from "@/app/actions"

const volunteerProfileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  bio: z.string().max(500, "Bio must not exceed 500 characters"),
  skills: z.array(z.string()),
  preferences: z.object({
    petTypes: z.array(z.string()),
    availability: z.array(z.string()),
    maxDistance: z.number().min(1).max(100),
    emergencyAvailable: z.boolean(),
  }),
  location: z.object({
    address: z.string(),
    coordinates: z.object({
      lat: z.number(),
      lng: z.number(),
    }),
  }),
})

interface VolunteerProfileProps {
  initialData: z.infer<typeof volunteerProfileSchema>
  certifications: Array<{
    id: string
    name: string
    issueDate: string
    expiryDate: string
    status: "active" | "expired" | "pending"
  }>
  stats: {
    hoursLogged: number
    tasksCompleted: number
    petsHelped: number
    skillLevel: "Beginner" | "Intermediate" | "Advanced" | "Expert"
  }
}

export function VolunteerProfile({ initialData, certifications, stats }: VolunteerProfileProps) {
  const [isUpdating, setIsUpdating] = useState(false)

  const form = useForm<z.infer<typeof volunteerProfileSchema>>({
    resolver: zodResolver(volunteerProfileSchema),
    defaultValues: initialData,
  })

  async function onSubmit(values: z.infer<typeof volunteerProfileSchema>) {
    try {
      setIsUpdating(true)
      await updateVolunteerProfile(values)
      // Show success message
    } catch (error) {
      // Show error message
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Manage your volunteer profile and preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormDescription>Tell us about your experience with animals</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="preferences.maxDistance"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Maximum Travel Distance (miles)</FormLabel>
                      <FormControl>
                        <Slider
                          min={1}
                          max={100}
                          step={1}
                          value={[field.value]}
                          onValueChange={(value) => field.onChange(value[0])}
                        />
                      </FormControl>
                      <FormDescription>How far are you willing to travel for volunteer work?</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="preferences.emergencyAvailable"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between rounded-lg border p-3">
                      <div className="space-y-0.5">
                        <FormLabel>Emergency Availability</FormLabel>
                        <FormDescription>Receive alerts for urgent rescue missions</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <Button type="submit" disabled={isUpdating}>
                  {isUpdating ? "Updating..." : "Update Profile"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Skills & Certifications</CardTitle>
              <CardDescription>Your verified qualifications and experience</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium mb-2">Current Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {initialData.skills.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Certifications</h4>
                  {certifications.map((cert) => (
                    <div key={cert.id} className="flex items-center justify-between rounded-lg border p-3">
                      <div className="flex items-center gap-2">
                        <Award className="h-4 w-4 text-primary" />
                        <div>
                          <p className="font-medium">{cert.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Expires: {new Date(cert.expiryDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant={
                          cert.status === "active" ? "default" : cert.status === "expired" ? "destructive" : "secondary"
                        }
                      >
                        {cert.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Impact Stats</CardTitle>
              <CardDescription>Your contribution to the community</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex items-center gap-2 rounded-lg border p-3">
                  <Clock className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Hours Logged</p>
                    <p className="text-2xl font-bold">{stats.hoursLogged}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-lg border p-3">
                  <Shield className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Tasks Completed</p>
                    <p className="text-2xl font-bold">{stats.tasksCompleted}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-lg border p-3">
                  <Award className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Skill Level</p>
                    <p className="text-2xl font-bold">{stats.skillLevel}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-lg border p-3">
                  <MapPin className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Pets Helped</p>
                    <p className="text-2xl font-bold">{stats.petsHelped}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

