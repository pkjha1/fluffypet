"use client"

import { useEffect, useRef, useState } from "react"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useLoadScript } from "@react-google-maps/api"

const libraries: ["places"] = ["places"]

interface LocationSearchProps {
  onLocationSelect: (location: { lat: number; lng: number; address: string }) => void
}

export function LocationSearch({ onLocationSelect }: LocationSearchProps) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "",
    libraries,
  })

  const [searchValue, setSearchValue] = useState("")
  const autoCompleteRef = useRef<google.maps.places.Autocomplete | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!isLoaded || !inputRef.current) return

    autoCompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, {
      fields: ["geometry", "formatted_address"],
    })

    autoCompleteRef.current.addListener("place_changed", () => {
      const place = autoCompleteRef.current?.getPlace()
      if (place?.geometry?.location && place.formatted_address) {
        onLocationSelect({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
          address: place.formatted_address,
        })
        setSearchValue(place.formatted_address)
      }
    })
  }, [isLoaded, onLocationSelect])

  if (!isLoaded) {
    return (
      <div className="relative flex-1 max-w-sm animate-pulse">
        <div className="h-10 bg-muted rounded-md" />
      </div>
    )
  }

  return (
    <div className="relative flex-1 max-w-sm">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        ref={inputRef}
        type="text"
        placeholder="Search location..."
        className="pl-8"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </div>
  )
}

