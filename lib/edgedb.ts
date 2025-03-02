import { createClient } from "edgedb"

// Pet type definition
export type Pet = {
  id: string
  name: string
  species: string
  breed?: string
  age?: number
  imageUrl?: string
  createdAt: Date
}

// Create a singleton instance of the EdgeDB client
let client: ReturnType<typeof createClient>

// Initialize the client with proper error handling
function initClient() {
  if (!client) {
    try {
      client = createClient({
        // You can specify additional configuration options here if needed
        tlsSecurity: "insecure", // Only for development
      })
    } catch (error) {
      console.error("Failed to initialize EdgeDB client:", error)
      throw new Error("Database connection failed")
    }
  }
  return client
}

// Get the EdgeDB client (server-side only)
export function getClient() {
  if (typeof window !== "undefined") {
    throw new Error("EdgeDB client cannot be used in browser")
  }
  return initClient()
}

// Function to get all pets - server-side only
export async function getAllPets(): Promise<Pet[]> {
  try {
    const db = getClient()

    const query = `
      SELECT Pet {
        id,
        name,
        species,
        breed,
        age,
        image_url,
        created_at
      }
      ORDER BY .created_at DESC;
    `

    const result = await db.query(query)
    return result.map((pet) => ({
      id: pet.id,
      name: pet.name,
      species: pet.species,
      breed: pet.breed,
      age: pet.age,
      imageUrl: pet.image_url,
      createdAt: pet.created_at,
    }))
  } catch (error) {
    console.error("Error fetching pets:", error)
    return []
  }
}

// Function to get a pet by ID - server-side only
export async function getPetById(id: string): Promise<Pet | null> {
  try {
    const db = getClient()

    const query = `
      SELECT Pet {
        id,
        name,
        species,
        breed,
        age,
        image_url,
        created_at
      }
      FILTER .id = <uuid>$id;
    `

    const result = await db.querySingle(query, { id })
    if (!result) return null

    return {
      id: result.id,
      name: result.name,
      species: result.species,
      breed: result.breed,
      age: result.age,
      imageUrl: result.image_url,
      createdAt: result.created_at,
    }
  } catch (error) {
    console.error(`Error fetching pet with ID ${id}:`, error)
    return null
  }
}

// Function to create a new pet - server-side only
export async function createPet(pet: Omit<Pet, "id" | "createdAt">): Promise<Pet | null> {
  try {
    const db = getClient()

    const query = `
      INSERT Pet {
        name := <str>$name,
        species := <str>$species,
        breed := <optional str>$breed,
        age := <optional int32>$age,
        image_url := <optional str>$imageUrl
      }
    `

    const result = await db.querySingle(query, pet)
    if (!result) return null

    return {
      id: result.id,
      name: result.name,
      species: result.species,
      breed: result.breed,
      age: result.age,
      imageUrl: result.image_url,
      createdAt: result.created_at,
    }
  } catch (error) {
    console.error("Error creating pet:", error)
    return null
  }
}

