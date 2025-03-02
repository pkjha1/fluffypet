"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import Header from "@/components/Header"
import { addNewPet, uploadImage } from "../../actions"

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  species: z.string().min(1, "Species is required"),
  breed: z.string().optional(),
  age: z.coerce.number().int().positive().optional(),
  notes: z.string().optional(),
  image: z.instanceof(FileList).optional(),
})

export default function AddPetPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      species: "",
      breed: "",
      notes: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true)

      // Create FormData for the pet details
      const petFormData = new FormData()
      petFormData.append("name", values.name)
      petFormData.append("type", values.species)
      if (values.breed) petFormData.append("breed", values.breed)
      if (values.age) petFormData.append("age", values.age.toString())
      if (values.notes) petFormData.append("notes", values.notes)

      // Create the pet in the database
      const pet = await addNewPet(petFormData)

      if (!pet) {
        throw new Error("Failed to create pet")
      }

      // If an image was uploaded, process it
      if (values.image && values.image.length > 0) {
        const imageFormData = new FormData()
        imageFormData.append("file", values.image[0])
        imageFormData.append("petId", pet.id)

        const { success, imageUrl, error } = await uploadImage(imageFormData)

        if (!success) {
          console.error("Image upload failed:", error)
          toast({
            title: "Warning",
            description: "Pet was created but image upload failed. You can try uploading the image later.",
            variant: "warning",
          })
        }
      }

      toast({
        title: "Success",
        description: `${values.name} has been added to your pets.`,
      })

      // Redirect to the pet's page
      router.push(`/pets/${pet.id}`)
    } catch (error) {
      console.error("Error adding pet:", error)
      toast({
        title: "Error",
        description: "There was a problem adding your pet. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container py-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Add New Pet</h1>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your pet's name" {...field} />
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
                          <SelectValue placeholder="Select a species" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="dog">Dog</SelectItem>
                        <SelectItem value="cat">Cat</SelectItem>
                        <SelectItem value="bird">Bird</SelectItem>
                        <SelectItem value="rabbit">Rabbit</SelectItem>
                        <SelectItem value="hamster">Hamster</SelectItem>
                        <SelectItem value="fish">Fish</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
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
                    <FormLabel>Breed (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your pet's breed" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age (Optional)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Enter your pet's age" {...field} min="0" max="100" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="image"
                render={({ field: { value, onChange, ...fieldProps } }) => (
                  <FormItem>
                    <FormLabel>Photo (Optional)</FormLabel>
                    <FormControl>
                      <Input type="file" accept="image/*" onChange={(e) => onChange(e.target.files)} {...fieldProps} />
                    </FormControl>
                    <FormDescription>Upload a photo of your pet (max 5MB)</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes (Optional)</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter any additional information about your pet" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-4">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Adding..." : "Add Pet"}
                </Button>
                <Button type="button" variant="outline" onClick={() => router.back()}>
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </main>
    </div>
  )
}

