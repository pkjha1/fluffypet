import Header from "@/components/Header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, MapPin } from "lucide-react"

export default async function AdoptPage() {
  // const listings = await fetchAdoptableListings()
  const pets = [
    {
      id: 1,
      name: "Luna",
      type: "Dog",
      breed: "Golden Retriever",
      age: "2 years",
      gender: "Female",
      location: "Happy Paws Shelter",
      distance: "3.2 miles away",
      description: "Luna is a friendly and energetic Golden Retriever who loves to play fetch and go for long walks.",
      image: "/placeholder.svg?height=400&width=600",
      status: "Available",
    },
    {
      id: 2,
      name: "Oliver",
      type: "Cat",
      breed: "Domestic Shorthair",
      age: "1 year",
      gender: "Male",
      location: "Whiskers Haven",
      distance: "5.1 miles away",
      description: "Oliver is a playful and affectionate cat who gets along well with other pets and children.",
      image: "/placeholder.svg?height=400&width=600",
      status: "Available",
    },
    // Add more pets as needed
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container py-6">
        <div className="max-w-6xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold">Adopt a Pet</h1>
            <p className="text-muted-foreground mt-2">
              Find your perfect companion from our network of verified shelters
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {pets.map((pet) => (
              <Card key={pet.id} className="overflow-hidden">
                <img
                  src={pet.image || "/placeholder.svg"}
                  alt={pet.name}
                  className="w-full aspect-video object-cover"
                />
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{pet.name}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary">{pet.type}</Badge>
                        <Badge variant="outline">{pet.age}</Badge>
                        <Badge variant="outline">{pet.gender}</Badge>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Heart className="h-5 w-5" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{pet.location}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">{pet.distance}</div>
                  </div>
                  <p className="text-sm">{pet.description}</p>
                  <div className="flex gap-2">
                    <Button className="flex-1">Meet {pet.name}</Button>
                    <Button variant="outline">Learn More</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

