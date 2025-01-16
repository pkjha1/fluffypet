'use client'

import { useLoadScript, GoogleMap, Marker } from '@react-google-maps/api'
import { useMemo } from 'react'

const mapContainerStyle = {
  width: '100%',
  height: '400px',
}

const center = {
  lat: 0, // Default to center of the world
  lng: 0,
}

export default function Map({ places }: { places: Array<{ lat: number; lng: number; name: string }> }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
  })

  const markers = useMemo(() => places.map((place) => (
    <Marker key={place.name} position={{ lat: place.lat, lng: place.lng }} title={place.name} />
  )), [places])

  if (!isLoaded) return <div>Loading maps...</div>

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={10}
      center={center}
    >
      {markers}
    </GoogleMap>
  )
}

