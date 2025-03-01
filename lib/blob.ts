import { put, list, del } from "@vercel/blob"

// Function to upload an image to Vercel Blob
export async function uploadPetImage(file: File, petId: string): Promise<string | null> {
  try {
    // Generate a unique filename using the pet ID
    const filename = `pets/${petId}/${Date.now()}-${file.name}`

    // Upload the file to Vercel Blob
    const blob = await put(filename, file, { access: "public" })

    // Return the URL of the uploaded file
    return blob.url
  } catch (error) {
    console.error("Error uploading image to Vercel Blob:", error)
    return null
  }
}

// Function to list all images for a pet
export async function listPetImages(petId: string) {
  try {
    // List all files in the pet's directory
    const { blobs } = await list({ prefix: `pets/${petId}/` })
    return blobs
  } catch (error) {
    console.error(`Error listing images for pet ${petId}:`, error)
    return []
  }
}

// Function to delete an image
export async function deletePetImage(url: string) {
  try {
    await del(url)
    return true
  } catch (error) {
    console.error(`Error deleting image at ${url}:`, error)
    return false
  }
}

