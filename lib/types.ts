export interface Pet {
  id: string
  name: string
  species: string
  breed?: string
  age?: number
  createdAt: Date
  updatedAt: Date
}

export interface GalleryImage {
  id: string
  url: string
  petName: string
  timestamp: Date
}

