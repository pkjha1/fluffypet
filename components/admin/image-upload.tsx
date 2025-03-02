"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ImageIcon, X } from "lucide-react"

interface ImageUploadProps {
  value: string
  onChange: (value: string) => void
}

export function ImageUpload({ value, onChange }: ImageUploadProps) {
  const [preview, setPreview] = useState(value)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      // Create a FormData object
      const formData = new FormData()
      formData.append("file", file)

      // TODO: Implement file upload
      const imageUrl = "/placeholder.svg"

      setPreview(imageUrl)
      onChange(imageUrl)
    } catch (error) {
      console.error("Error uploading image:", error)
    }
  }

  const handleRemove = () => {
    setPreview("")
    onChange("")
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Button type="button" variant="outline" onClick={() => document.getElementById("image-upload")?.click()}>
          <ImageIcon className="mr-2 h-4 w-4" />
          Upload Image
        </Button>
        <input id="image-upload" type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
        {preview && (
          <Button type="button" variant="outline" size="icon" onClick={handleRemove}>
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      {preview && (
        <div className="relative aspect-video w-full max-w-xl overflow-hidden rounded-lg border">
          <Image src={preview || "/placeholder.svg"} alt="Preview" fill className="object-cover" />
        </div>
      )}
    </div>
  )
}

