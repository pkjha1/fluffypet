"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { updatePetBasicInfo } from "@/app/actions"
import type { Pet } from "@/lib/types"
import { Upload, Camera } from "lucide-react"

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  species: z.string().min(1, "Species is required"),
  breed: z.string().optional(),
  birthDate: z.string().optional(),
  gender: z.enum(["male", "female"]),
  neutered: z.boolean(),
  weight: z.string().optional(),
  color: z.string().optional(),
  description: z.string().optional(),
})

interface BasicInfoProps {
  pet: Pet
}

export function BasicInfo({ pet }: BasicInfoProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: pet.name,
      species: pet.species,
      breed: pet.breed || "",
      birthDate: pet.birthDate?.split("T")[0] || "",
      gender: pet.gender || "male",
      neutered: pet.neutered || false,
      weight: pet.weight?.toString() || "",
      color: pet.color || "",
      description: pet.description || "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true)
      await updatePetBasicInfo(pet.id, values)
      toast({
        title: "Profile updated",
        description: "Your pet's basic information has been updated successfully.",
      })
    } catch (error) {
      console.error("Error updating profile:", error)
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedImage(file)
      // Handle image upload logic here
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
      <Card>
        <CardHeader>
          <CardTitle>Profile Photo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="aspect-square relative bg-muted rounded-lg overflow-hidden">
            {pet.imageUrl ? (
              <Image src={pet.imageUrl || "/placeholder.svg"} alt={pet.name} fill className="object-cover" />
            ) : (
              <div className="flex items-center justify-center h-full">
                <Camera className="h-12 w-12 text-muted-foreground" />
              </div>
            )}
          </div>
          <div className="flex justify-center">
            <Button variant="outline" onClick={() => document.getElementById("photo-upload")?.click()}>
              <Upload className="h-4 w-4 mr-2" />
              Upload Photo
            </Button>
            <input id="photo-upload" type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
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
                  name="species"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Species</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select species" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="dog">Dog</SelectItem>
                          <SelectItem value="cat">Cat</SelectItem>
                          <SelectItem value="bird">Bird</SelectItem>
                          <SelectItem value="exotic">Exotic</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="breed"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Breed</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="birthDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Birth Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="weight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Weight (kg)</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.1" {...field} />
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
                      <Textarea {...field} placeholder="Add any distinguishing features or additional details" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save Changes"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

