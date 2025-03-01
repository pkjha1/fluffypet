"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/ui/header"
import { ServiceProviderCard } from "@/components/service-provider-card"
import { ServiceFilters } from "@/components/service-filters"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin } from "lucide-react"
import { searchServiceProviders } from "@/app/actions"

export default function ServicesPage() {
  const searchParams = useSearchParams()
  const [location, setLocation] = useState("")
  const [serviceType, setServiceType] = useState("all")
  const [providers, setProviders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation(`${position.coords.latitude},${position.coords.longitude}`)
        },
        (error) => {
          console.error("Error getting location:", error)
        },
      )
    }
  }, [])

  useEffect(() => {
    async function loadProviders() {
      try {
        setLoading(true)
        const results = await searchServiceProviders({
          location,
          type: serviceType,
          query: searchParams.get("q") || "",
        })
        setProviders(results)
      } catch (error) {
        console.error("Error loading service providers:", error)
      } finally {
        setLoading(false)
      }
    }

    if (location) {
      loadProviders()
    }
  }, [location, serviceType, searchParams])

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container py-6">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <h1 className="text-3xl font-bold">Find Services</h1>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Showing results near you</span>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-[240px_1fr]">
            <ServiceFilters />

            <div className="space-y-6">
              <div className="flex gap-4">
                <Input placeholder="Search services..." className="max-w-sm" />
                <Select value={serviceType} onValueChange={setServiceType}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Service type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Services</SelectItem>
                    <SelectItem value="vet">Veterinarians</SelectItem>
                    <SelectItem value="groomer">Groomers</SelectItem>
                    <SelectItem value="trainer">Trainers</SelectItem>
                    <SelectItem value="hostel">Pet Hostels</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {providers.map((provider) => (
                  <ServiceProviderCard key={provider.id} provider={provider} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

