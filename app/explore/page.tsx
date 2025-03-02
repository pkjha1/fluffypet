"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MapPin, SlidersHorizontal, MapIcon, List } from "lucide-react"
import dynamic from "next/dynamic"
import MapLoading from "@/components/explore/map-loading"
import { LocationSearch } from "@/components/explore/location-search"

// Dynamically import the map component to prevent SSR issues
const Map = dynamic(() => import("@/components/explore/map"), {
  ssr: false,
  loading: () => <MapLoading />,
})

const defaultCenter = { lat: 40.7128, lng: -74.006 }

export default function ExplorePage() {
  const [view, setView] = useState<"list" | "map">("list")
  const [location, setLocation] = useState("")
  const [radius, setRadius] = useState([5]) // km
  const [filters, setFilters] = useState({
    vets: true,
    groomers: true,
    trainers: true,
    hostels: true,
    shelters: true,
  })
  const [mapCenter, setMapCenter] = useState(defaultCenter)

  // Mock data for services
  const services = [
    {
      id: 1,
      type: "vet",
      name: "Central Pet Clinic",
      image: "/placeholder.svg?height=200&width=400",
      rating: 4.8,
      reviews: 156,
      distance: "0.8 km",
      address: "123 Pet Street",
      services: ["General Practice", "Surgery", "Dental"],
      lat: 40.7128,
      lng: -74.006,
    },
    {
      id: 2,
      type: "groomer",
      name: "Pawfect Grooming",
      image: "/placeholder.svg?height=200&width=400",
      rating: 4.9,
      reviews: 98,
      distance: "1.2 km",
      address: "456 Groom Avenue",
      services: ["Full Grooming", "Bath & Brush", "Nail Trimming"],
      lat: 40.7138,
      lng: -74.007,
    },
    // Add more services...
  ]

  const handleLocationSelect = (location: { lat: number; lng: number; address: string }) => {
    setMapCenter({ lat: location.lat, lng: location.lng })
    // Here you would typically fetch services near this location
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 flex">
        <div className="w-full flex flex-col">
          {/* Search and Filters Bar */}
          <div className="border-b">
            <div className="container py-4 flex items-center gap-4">
              <LocationSearch onLocationSelect={handleLocationSelect} />

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
                    <SlidersHorizontal className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="py-6 space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">Service Types</h3>
                      <div className="space-y-4">
                        {Object.entries(filters).map(([key, value]) => (
                          <div key={key} className="flex items-center space-x-2">
                            <Switch
                              id={key}
                              checked={value}
                              onCheckedChange={(checked) => setFilters((prev) => ({ ...prev, [key]: checked }))}
                            />
                            <Label htmlFor={key} className="capitalize">
                              {key}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">Distance (km)</h3>
                      <Slider value={radius} onValueChange={setRadius} max={20} step={1} className="w-full" />
                      <div className="text-sm text-muted-foreground">Within {radius}km</div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>

              <Button variant="outline" size="icon" onClick={() => setView(view === "list" ? "map" : "list")}>
                {view === "list" ? <MapIcon className="h-4 w-4" /> : <List className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {view === "list" ? (
              <ScrollArea className="h-[calc(100vh-8rem)]">
                <div className="container py-6">
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {services.map((service) => (
                      <div
                        key={service.id}
                        className="group relative rounded-lg border p-4 hover:shadow-lg transition-shadow"
                      >
                        <div className="aspect-video overflow-hidden rounded-md">
                          <img
                            src={service.image || "/placeholder.svg"}
                            alt={service.name}
                            className="object-cover w-full h-full group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <div className="mt-4">
                          <div className="flex items-center justify-between">
                            <Badge variant="secondary" className="capitalize">
                              {service.type}
                            </Badge>
                            <div className="text-sm text-muted-foreground">{service.distance}</div>
                          </div>
                          <h3 className="font-semibold mt-2">{service.name}</h3>
                          <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            {service.address}
                          </div>
                          <div className="mt-2 flex flex-wrap gap-1">
                            {service.services.map((s) => (
                              <Badge key={s} variant="outline">
                                {s}
                              </Badge>
                            ))}
                          </div>
                          <div className="mt-4 flex items-center justify-between">
                            <div className="text-sm">
                              ⭐️ {service.rating} ({service.reviews} reviews)
                            </div>
                            <Button size="sm">View Details</Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollArea>
            ) : (
              <Map services={services} center={mapCenter} />
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

