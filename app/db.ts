import { createClient } from "edgedb"

// Initialize EdgeDB client with environment variables
export const db = createClient({
  // EdgeDB instance and secret key are automatically picked up
  // from EDGEDB_INSTANCE and EDGEDB_SECRET_KEY environment variables
  tlsSecurity: "insecure", // Only for development
})

// Verify connection
db.ensureConnected()
  .then(() => {
    console.log("Successfully connected to EdgeDB")
  })
  .catch((err) => {
    console.error("Failed to connect to EdgeDB:", err)
  })

