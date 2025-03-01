"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { ImageIcon } from "lucide-react"
import type { GalleryImage } from "@/lib/types"

interface PetGalleryProps {
  initialImages: GalleryImage[]
}

export function PetGallery({ initialImages }: PetGalleryProps) {
  const [images, setImages] = useState<GalleryImage[]>(initialImages)
  const [loading, setLoading] = useState(false)

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <div className="aspect-square relative bg-muted">
              <Skeleton className="h-full w-full" />
            </div>
          </Card>
        ))}
      </div>
    )
  }

  if (images.length === 0) {
    return (
      <div className="text-center py-8">
        <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground" />
        <p className="mt-2 text-muted-foreground">No images found</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {images.map((image) => (
        <Card key={image.id} className="overflow-hidden">
          <div className="aspect-square relative bg-muted">
            <Image
              src={image.url || "/placeholder.svg"}
              alt={`Photo of ${image.petName}`}
              fill
              className="object-cover"
            />
          </div>
          <CardContent className="p-2">
            <p className="text-xs text-muted-foreground truncate">{image.petName}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

