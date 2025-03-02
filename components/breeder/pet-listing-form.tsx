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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, Dna } from "lucide-react"
import { createPetListing, mintPetNFT } from "@/app/actions"

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  breed: z.string().min(1, "Breed is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  gender: z.enum(["male", "female"]),
  color: z.string().min(1, "Color is required"),
  description: z.string().min(1, "Description is required"),
  price: z.string().min(1, "Price is required"),
  parentInfo: z.object({
    sire: z.string().optional(),
    dam: z.string().optional(),
  }),
  healthInfo: z.object({
    vaccinations: z.array(z.string()),
    medicalConditions: z.array(z.string()),
    geneticTests: z.array(z.string()),
  }),
})

export function PetListingForm() {
  const [images, setImages] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      parentInfo: {},
      healthInfo: {
        vaccinations: [],
        medicalConditions: [],
        geneticTests: [],
      },
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true)

      // Create NFT for the pet
      const nft = await mintPetNFT({
        metadata: {
          name: values.name,
          description: values.description,
          image: images[0],
          attributes: {
            breed: values.breed,
            dateOfBirth: values.dateOfBirth,
            gender: values.gender,
            color: values.color,
            parentInfo: values.parentInfo,
            healthInfo: values.healthInfo,
          },
        },
      })

      // Create pet listing
      await createPetListing({
        ...values,
        images,
        nftId: nft.id,
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
        <CardTitle>Create Pet Listing</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="basic">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="health">Health Info</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
          </TabsList>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <TabsContent value="basic" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Pet name" {...field} />
                        </FormControl>
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
                          <Input placeholder="Breed" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="dateOfBirth"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date of Birth</FormLabel>
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
                        <FormControl>
                          <select className="w-full p-2 border rounded-md" {...field}>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                          </select>
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
                        <Textarea placeholder="Describe the pet..." className="resize-none" {...field} />
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
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Enter price" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>

              <TabsContent value="health" className="space-y-4">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Vaccinations</label>
                    <div className="flex flex-wrap gap-2">
                      {form.watch("healthInfo.vaccinations").map((vac, index) => (
                        <Badge key={index} variant="secondary">
                          {vac}
                        </Badge>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          // Add vaccination
                        }}
                      >
                        Add
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Genetic Tests</label>
                    <div className="flex items-center gap-2">
                      <Input placeholder="Test name" />
                      <Button type="button" size="sm">
                        <Dna className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {form.watch("healthInfo.geneticTests").map((test, index) => (
                        <Badge key={index} variant="secondary">
                          {test}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="media" className="space-y-4">
                <div className="grid gap-4">
                  <div className="flex items-center justify-center border-2 border-dashed rounded-lg p-6">
                    <div className="text-center">
                      <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                      <p className="mt-2 text-sm text-muted-foreground">Drag and drop images or click to upload</p>
                      <Button
                        type="button"
                        variant="outline"
                        className="mt-4"
                        onClick={() => document.getElementById("image-upload")?.click()}
                      >
                        Choose Files
                      </Button>
                      <input
                        id="image-upload"
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

                  <div className="grid gap-4 md:grid-cols-3">
                    {images.map((image, index) => (
                      <div key={index} className="relative aspect-square rounded-lg overflow-hidden border">
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`Pet image ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2"
                          onClick={() => {
                            // Remove image
                          }}
                        >
                          ×
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <div className="flex items-center gap-4">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Creating..." : "Create Listing"}
                </Button>
                <Button type="button" variant="outline">
                  Save as Draft
                </Button>
              </div>
            </form>
          </Form>
        </Tabs>
      </CardContent>
    </Card>
  )
}

