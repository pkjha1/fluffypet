import { notFound } from "next/navigation"
import Image from "next/image"
import { fetchPetById, fetchPetImages } from "@/app/actions"
import { formatDate } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Header from "@/components/Header"
import { PawPrint, Calendar, Tag, ImageIcon } from "lucide-react"

export default async function PetDetailPage({ params }: { params: { id: string } }) {
  const pet = await fetchPetById(params.id)

  if (!pet) {
    notFound()
  }

  const images = await fetchPetImages(pet.id)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container py-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <div className="aspect-square relative bg-muted rounded-lg overflow-hidden">
                {pet.imageUrl ? (
                  <Image src={pet.imageUrl || "/placeholder.svg"} alt={pet.name} fill className="object-cover" />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <PawPrint className="h-16 w-16 text-muted-foreground" />
                  </div>
                )}
              </div>

              <div className="mt-4 space-y-4">
                <div className="flex items-center gap-2">
                  <Tag className="h-5 w-5 text-muted-foreground" />
                  <span>
                    {pet.species} {pet.breed ? `• ${pet.breed}` : ""}
                  </span>
                </div>

                {pet.age && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <span>{pet.age} years old</span>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <ImageIcon className="h-5 w-5 text-muted-foreground" />
                  <span>{images.length} photos</span>
                </div>

                <div className="pt-2">
                  <Button className="w-full">Upload New Photo</Button>
                </div>
              </div>
            </div>

            <div className="md:w-2/3">
              <h1 className="text-3xl font-bold mb-2">{pet.name}</h1>
              <p className="text-muted-foreground mb-6">Added on {formatDate(pet.createdAt)}</p>

              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-4">Photos</h2>
                  {images.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {images.map((image) => (
                        <Card key={image.pathname} className="overflow-hidden">
                          <div className="aspect-square relative bg-muted">
                            <Image
                              src={image.url || "/placeholder.svg"}
                              alt={`Photo of ${pet.name}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <CardContent className="p-2">
                            <p className="text-xs text-muted-foreground">
                              {new Date(image.uploadedAt).toLocaleDateString()}
                            </p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 bg-muted/50 rounded-lg">
                      <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground" />
                      <p className="mt-2 text-muted-foreground">No photos yet</p>
                      <Button className="mt-4">Upload First Photo</Button>
                    </div>
                  )}
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-4">Notes</h2>
                  <Card>
                    <CardContent className="p-4">
                      <p className="text-muted-foreground">No notes yet. Add some information about {pet.name}.</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

