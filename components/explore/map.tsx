"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { useLoadScript, GoogleMap, Marker, InfoWindow } from "@react-google-maps/api"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Navigation } from "lucide-react"
import { toast } from "sonner"

const mapContainerStyle = {
  width: "100%",
  height: "calc(100vh - 4rem)",
}

const defaultCenter = {
  lat: 40.7128,
  lng: -74.006,
}

const libraries: ["places"] = ["places"]

interface Service {
  id: number
  type: string
  name: string
  image: string
  rating: number
  reviews: number
  distance: string
  address: string
  services: string[]
  lat: number
  lng: number
}

interface MapProps {
  services: Service[]
  center: { lat: number; lng: number }
}

export default function Map({ services, center }: MapProps) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "",
    libraries,
  })

  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [isLocating, setIsLocating] = useState(false)
  const mapRef = useRef<google.maps.Map | null>(null)

  const onMapLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map
  }, [])

  const handleLocationError = (error: GeolocationPositionError) => {
    let message = "Unable to get your location. "
    switch (error.code) {
      case error.PERMISSION_DENIED:
        message += "Please enable location access in your browser settings."
        break
      case error.POSITION_UNAVAILABLE:
        message += "Location information is unavailable."
        break
      case error.TIMEOUT:
        message += "Location request timed out."
        break
      default:
        message += "An unknown error occurred."
    }
    toast.error(message)
    setIsLocating(false)
  }

  const getCurrentLocation = useCallback(() => {
    setIsLocating(true)
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser")
      setIsLocating(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }
        setUserLocation(location)
        if (mapRef.current) {
          mapRef.current.panTo(location)
          mapRef.current.setZoom(13)
        }
        setIsLocating(false)
      },
      handleLocationError,
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      },
    )
  }, []) // Removed handleLocationError from dependencies

  useEffect(() => {
    // Try to get location on mount
    getCurrentLocation()
  }, [getCurrentLocation])

  if (loadError) {
    return (
      <div className="w-full h-[calc(100vh-4rem)] flex items-center justify-center">
        <p>Error loading maps</p>
      </div>
    )
  }

  if (!isLoaded) {
    return <div className="w-full h-[calc(100vh-4rem)] bg-muted animate-pulse" />
  }

  const getMarkerIcon = (type: string) => {
    const colors: { [key: string]: string } = {
      vet: "FF0000", // Red
      groomer: "00FF00", // Green
      trainer: "0000FF", // Blue
      hostel: "FFA500", // Orange
      shelter: "800080", // Purple
    }

    return {
      path: google.maps.SymbolPath.CIRCLE,
      fillColor: `#${colors[type] || "000000"}`,
      fillOpacity: 1,
      strokeWeight: 1,
      strokeColor: "#FFFFFF",
      scale: 8,
    }
  }

  return (
    <div className="relative w-full h-[calc(100vh-4rem)]">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={13}
        center={center}
        onLoad={onMapLoad}
        options={{
          styles: [
            {
              featureType: "poi",
              elementType: "labels",
              stylers: [{ visibility: "off" }],
            },
          ],
          disableDefaultUI: true,
          zoomControl: true,
        }}
      >
        {userLocation && (
          <Marker
            position={userLocation}
            icon={{
              path: google.maps.SymbolPath.CIRCLE,
              scale: 7,
              fillColor: "#4F46E5",
              fillOpacity: 1,
              strokeWeight: 2,
              strokeColor: "#FFFFFF",
            }}
          />
        )}

        {services.map((service) => (
          <Marker
            key={service.id}
            position={{ lat: service.lat, lng: service.lng }}
            onClick={() => setSelectedService(service)}
            icon={getMarkerIcon(service.type)}
          />
        ))}

        {selectedService && (
          <InfoWindow
            position={{ lat: selectedService.lat, lng: selectedService.lng }}
            onCloseClick={() => setSelectedService(null)}
          >
            <div className="max-w-xs">
              <img
                src={selectedService.image || "/placeholder.svg"}
                alt={selectedService.name}
                className="w-full h-32 object-cover rounded-md"
              />
              <div className="mt-2">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="capitalize">
                    {selectedService.type}
                  </Badge>
                  <div className="text-sm text-muted-foreground">{selectedService.distance}</div>
                </div>
                <h3 className="font-semibold mt-2">{selectedService.name}</h3>
                <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {selectedService.address}
                </div>
                <div className="mt-2">
                  <div className="text-sm">
                    ⭐️ {selectedService.rating} ({selectedService.reviews} reviews)
                  </div>
                </div>
                <Button size="sm" className="w-full mt-2">
                  View Details
                </Button>
              </div>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>

      {/* Location Button */}
      <Button
        variant="secondary"
        size="icon"
        className="absolute bottom-4 right-4 z-10"
        onClick={getCurrentLocation}
        disabled={isLocating}
      >
        <Navigation className={`h-4 w-4 ${isLocating ? "animate-spin" : ""}`} />
      </Button>
    </div>
  )
}

