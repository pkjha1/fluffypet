import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users } from "lucide-react"

export default function EventsPage() {
  const events = [
    {
      id: 1,
      title: "Pet Adoption Fair",
      date: "2024-03-15",
      time: "10:00 AM - 4:00 PM",
      location: "Central Park",
      address: "123 Park Avenue",
      description:
        "Find your perfect companion at our monthly adoption fair featuring local shelters and rescue organizations.",
      attendees: 156,
      type: "Adoption",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: 2,
      title: "Dog Training Workshop",
      date: "2024-03-20",
      time: "2:00 PM - 4:00 PM",
      location: "PetSmart Training Center",
      address: "456 Main Street",
      description: "Learn essential training techniques from professional dog trainers.",
      attendees: 45,
      type: "Training",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: 3,
      title: "Pet Health Seminar",
      date: "2024-03-25",
      time: "6:00 PM - 8:00 PM",
      location: "Community Center",
      address: "789 Oak Road",
      description: "Expert veterinarians discuss common pet health issues and preventive care.",
      attendees: 89,
      type: "Education",
      image: "/placeholder.svg?height=400&width=600",
    },
  ]

  return (
    <div className="flex-1 container py-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Upcoming Events</h1>
          <p className="text-muted-foreground mt-2">Join our pet-friendly events and connect with other pet lovers</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <Card key={event.id} className="overflow-hidden">
              <img
                src={event.image || "/placeholder.svg"}
                alt={event.title}
                className="w-full aspect-video object-cover"
              />
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{event.title}</CardTitle>
                    <div className="flex items-center gap-2 mt-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {new Date(event.date).toLocaleDateString()} • {event.time}
                      </span>
                    </div>
                  </div>
                  <Badge>{event.type}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{event.location}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">{event.address}</div>
                </div>
                <p className="text-sm">{event.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{event.attendees} attending</span>
                  </div>
                  <Button>Register</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

