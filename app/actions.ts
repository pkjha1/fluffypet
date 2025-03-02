"use server"

import { currentUser } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"
import { getClient } from "@/lib/edgedb"
import { put } from "@vercel/blob"
import Razorpay from "razorpay"

// Ensure required environment variables are present
if (!process.env.WEBHOOK_SECRET) {
  throw new Error("WEBHOOK_SECRET environment variable is required")
}

// Type definitions for better type safety
interface Pet {
  id: string
  name: string
  species: string
  breed?: string
  age: number
  owner_id: string
}

interface Appointment {
  id: string
  date: Date
  pet: Pet
  owner: {
    id: string
    name: string
  }
}

interface VaccinationData {
  name: string
  date: Date
  nextDueDate?: Date
}

interface BookingData {
  providerId: string
  serviceId: string
  petId: string
  date: string
  time: string
  notes?: string
}

// Add interface for Clinic type
interface Clinic {
  id: string
  name: string
  address: string
  phone: string
  email: string
  description?: string
  services?: {
    id: string
    name: string
    price: number
    duration: string
  }[]
  veterinarians?: {
    id: string
    name: string
    specialization: string
    availability: string[]
  }[]
}

// Add interfaces for hostel dashboard data
interface HostelStats {
  totalPets: number
  occupancyRate: number
  upcomingBookings: number
  revenue: number
}

interface Room {
  id: string
  number: string
  type: string
  status: "available" | "occupied" | "maintenance"
  currentGuest?: {
    id: string
    name: string
    checkIn: string
    checkOut: string
  }
}

interface Guest {
  id: string
  petName: string
  ownerName: string
  roomNumber: string
  checkIn: string
  checkOut: string
  specialNeeds?: string
}

interface HostelBooking {
  id: string
  petName: string
  ownerName: string
  roomType: string
  checkIn: string
  checkOut: string
  status: "confirmed" | "pending" | "cancelled"
}

interface HostelDashboardData {
  stats: HostelStats
  rooms: Room[]
  currentGuests: Guest[]
  upcomingBookings: HostelBooking[]
}

// Add interfaces for NGO dashboard data
interface NGOStats {
  totalRescues: number
  activeAdoptions: number
  fosterHomes: number
  volunteers: number
}

interface RescueCase {
  id: string
  animalType: string
  location: string
  status: "pending" | "active" | "resolved"
  reportedAt: string
  severity: "low" | "medium" | "high" | "critical"
  description: string
}

interface AdoptionCase {
  id: string
  petName: string
  petType: string
  applicantName: string
  status: "pending" | "approved" | "rejected" | "completed"
  applicationDate: string
  homeCheckDate?: string
}

interface FosterProgram {
  id: string
  fosterParentName: string
  petName: string
  startDate: string
  endDate?: string
  status: "active" | "completed" | "terminated"
}

interface EmergencyAlert {
  id: string
  title: string
  description: string
  location: string
  severity: "high" | "urgent"
  createdAt: string
}

interface VolunteerShift {
  id: string
  volunteerName: string
  task: string
  date: string
  startTime: string
  endTime: string
}

interface NGODashboardData {
  stats: NGOStats
  rescueCases: RescueCase[]
  adoptions: AdoptionCase[]
  fosterProgram: FosterProgram[]
  emergencyAlerts: EmergencyAlert[]
  volunteerSchedule: VolunteerShift[]
}

// Add interface for detailed pet data
interface PetImage {
  pathname: string
  url: string
  uploadedAt: string
}

interface DetailedPet {
  id: string
  name: string
  species: string
  breed?: string
  age: number
  imageUrl?: string
  createdAt: string
  owner: {
    id: string
    name: string
  }
}

export async function fetchVetDashboardData() {
  try {
    const user = await currentUser()
    if (!user) {
      throw new Error("Unauthorized")
    }

    const client = getClient()

    // Fetch recent appointments using EdgeDB
    const query = `
      WITH
        recent_appointments := (
          SELECT Appointment {
            id,
            date,
            pet: {
              id,
              name,
              species,
              breed
            },
            owner: {
              id,
              name
            }
          }
          ORDER BY .date DESC
          LIMIT 10
        )
      SELECT {
        recentAppointments := recent_appointments,
        statistics := {
          totalPets := count(Pet),
          totalAppointments := count(Appointment),
          upcomingAppointments := count(
            Appointment FILTER .date >= datetime_current()
          )
        }
      };
    `

    const result = await client.query(query)
    return result[0]
  } catch (error) {
    console.error("Error fetching dashboard data:", error)
    throw new Error("Failed to fetch dashboard data")
  }
}

export async function addNewPet(formData: FormData) {
  try {
    const user = await currentUser()
    if (!user) {
      throw new Error("Unauthorized")
    }

    const name = formData.get("name")?.toString()
    const type = formData.get("type")?.toString()
    const breed = formData.get("breed")?.toString()
    const age = Number.parseInt(formData.get("age")?.toString() || "0")

    if (!name || !type) {
      throw new Error("Name and type are required")
    }

    const client = getClient()

    // Insert new pet using EdgeDB
    const query = `
      INSERT Pet {
        name := <str>$name,
        species := <str>$type,
        breed := <optional str>$breed,
        age := <int32>$age,
        owner_id := <str>$userId
      }
    `

    const pet = await client.querySingle(query, {
      name,
      type,
      breed: breed || null,
      age,
      userId: user.id,
    })

    return pet
  } catch (error) {
    console.error("Error adding pet:", error)
    throw new Error("Failed to add pet")
  }
}

export async function uploadImage(formData: FormData) {
  try {
    const user = await currentUser()
    if (!user) {
      throw new Error("Unauthorized")
    }

    const file = formData.get("file") as File
    if (!file) {
      throw new Error("No file provided")
    }

    // Verify file type
    if (!file.type.startsWith("image/")) {
      throw new Error("File must be an image")
    }

    // Limit file size (e.g., 5MB)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      throw new Error("File size too large (max 5MB)")
    }

    // Upload to Vercel Blob
    const blob = await put(`pets/${user.id}/${file.name}`, file, {
      access: "public",
      addRandomSuffix: true,
    })

    return {
      success: true,
      imageUrl: blob.url,
    }
  } catch (error) {
    console.error("Error uploading image:", error)
    return {
      success: false,
      error: "Failed to upload image",
    }
  }
}

export async function updateUserRole(userId: string, role: string) {
  const user = await currentUser()
  if (!user?.publicMetadata?.role || user.publicMetadata.role !== "admin") {
    throw new Error("Unauthorized")
  }

  const client = getClient()

  // Update user role using EdgeDB
  const query = `
    UPDATE User 
    FILTER .id = <str>$userId
    SET {
      role := <str>$role
    }
  `

  await client.query(query, { userId, role })
  revalidatePath("/admin/users")
}

export async function fetchUsers() {
  const user = await currentUser()
  if (!user?.publicMetadata?.role || user.publicMetadata.role !== "admin") {
    throw new Error("Unauthorized")
  }

  const client = getClient()

  // Fetch users using EdgeDB
  const query = `
    SELECT User {
      id,
      name,
      email,
      role,
      status,
      created_at
    }
    ORDER BY .created_at DESC;
  `

  const users = await client.query(query)
  return users
}

export async function fetchVolunteerProfile() {
  try {
    const user = await currentUser()
    if (!user) {
      throw new Error("Unauthorized")
    }

    const client = getClient()

    // Fetch volunteer profile using EdgeDB
    const query = `
      SELECT Volunteer {
        name,
        email,
        total_hours,
        missions_completed,
        skills_certified,
        impact_metrics: {
          animals_cared,
          shelters_helped,
          events_covered
        }
      }
      FILTER .id = <str>$userId;
    `

    const profile = await client.querySingle(query, { userId: user.id })

    if (!profile) {
      // Return placeholder data if no profile exists
      return {
        name: user.firstName || "John Doe",
        email: user.emailAddresses[0]?.emailAddress || "john@example.com",
        totalHours: 120,
        missionsCompleted: 15,
        skillsCertified: ["Dog Handling", "Cat Care", "First Aid"],
        impactMetrics: {
          animalsCared: 45,
          sheltersHelped: 3,
          eventsCovered: 8,
        },
      }
    }

    return profile
  } catch (error) {
    console.error("Error fetching volunteer profile:", error)
    throw new Error("Failed to fetch volunteer profile")
  }
}

export async function fetchAvailableMissions() {
  try {
    const user = await currentUser()
    if (!user) {
      throw new Error("Unauthorized")
    }

    const client = getClient()

    // Fetch available missions using EdgeDB
    const query = `
      SELECT Mission {
        id,
        title,
        location,
        date,
        duration,
        requirements
      }
      FILTER .date >= datetime_current()
      ORDER BY .date ASC;
    `

    const missions = await client.query(query)

    if (!missions.length) {
      // Return placeholder data if no missions exist
      return [
        {
          id: 1,
          title: "Weekend Dog Walking",
          location: "Central Park Shelter",
          date: "2024-03-10",
          duration: "2 hours",
          requirements: ["Dog handling certification"],
        },
        {
          id: 2,
          title: "Cat Socialization",
          location: "Happy Paws Shelter",
          date: "2024-03-15",
          duration: "3 hours",
          requirements: ["Cat care certification"],
        },
      ]
    }

    return missions
  } catch (error) {
    console.error("Error fetching available missions:", error)
    throw new Error("Failed to fetch available missions")
  }
}

export async function fetchPetHealthRecords(petId: string) {
  try {
    const user = await currentUser()
    if (!user) {
      throw new Error("Unauthorized")
    }

    const client = getClient()

    // Fetch pet health records using EdgeDB
    const query = `
      SELECT Pet {
        id,
        name,
        medications: {
          name,
          dosage,
          frequency,
          start_date,
          end_date
        },
        conditions: {
          name,
          diagnosed_date,
          notes,
          severity
        }
      }
      FILTER .id = <str>$petId AND .owner_id = <str>$userId;
    `

    const records = await client.querySingle(query, { petId, userId: user.id })

    if (!records) {
      throw new Error("Pet not found or unauthorized")
    }

    return records
  } catch (error) {
    console.error("Error fetching pet health records:", error)
    throw new Error("Failed to fetch pet health records")
  }
}

export async function sendUpdateToOwner(params: {
  petId: string
  ownerId: string
  type: "routine" | "alert"
  message: string
}) {
  try {
    const user = await currentUser()
    if (!user) {
      throw new Error("Unauthorized")
    }

    const client = getClient()

    // Insert update notification using EdgeDB
    const query = `
      INSERT PetUpdate {
        pet_id := <str>$petId,
        owner_id := <str>$ownerId,
        sender_id := <str>$userId,
        type := <str>$type,
        message := <str>$message,
        created_at := datetime_current()
      }
    `

    await client.query(query, {
      petId: params.petId,
      ownerId: params.ownerId,
      userId: user.id,
      type: params.type,
      message: params.message,
    })

    // You might want to send an email or push notification here
    // using your notification service

    return { success: true }
  } catch (error) {
    console.error("Error sending update:", error)
    return { success: false, error: "Failed to send update" }
  }
}

export async function updatePetBasicInfo(
  petId: string,
  data: {
    name: string
    species: string
    breed?: string
    birthDate?: string
    gender: "male" | "female"
    neutered: boolean
    weight?: string
    color?: string
    description?: string
  },
) {
  try {
    const user = await currentUser()
    if (!user) {
      throw new Error("Unauthorized")
    }

    const client = getClient()

    // Update pet information using EdgeDB
    const query = `
      UPDATE Pet
      FILTER .id = <str>$petId AND .owner_id = <str>$userId
      SET {
        name := <str>$name,
        species := <str>$species,
        breed := <optional str>$breed,
        birth_date := <optional datetime>$birthDate,
        gender := <str>$gender,
        neutered := <bool>$neutered,
        weight := <optional float64>$weight,
        color := <optional str>$color,
        description := <optional str>$description
      }
    `

    const pet = await client.querySingle(query, {
      petId,
      userId: user.id,
      name: data.name,
      species: data.species,
      breed: data.breed || null,
      birthDate: data.birthDate ? new Date(data.birthDate) : null,
      gender: data.gender,
      neutered: data.neutered,
      weight: data.weight ? Number.parseFloat(data.weight) : null,
      color: data.color || null,
      description: data.description || null,
    })

    if (!pet) {
      throw new Error("Pet not found or unauthorized")
    }

    revalidatePath(`/pets/${petId}`)
    return { success: true }
  } catch (error) {
    console.error("Error updating pet:", error)
    throw new Error("Failed to update pet")
  }
}

export async function fetchVolunteerDashboardData() {
  try {
    const user = await currentUser()
    if (!user) {
      throw new Error("Unauthorized")
    }

    const client = getClient()

    // Fetch volunteer dashboard data using EdgeDB
    const query = `
      WITH
        volunteer := (
          SELECT Volunteer {
            id,
            name,
            email,
            total_hours,
            missions_completed,
            skills_certified
          }
          FILTER .id = <str>$userId
        ),
        active_missions := (
          SELECT Mission {
            id,
            title,
            location,
            date,
            duration,
            status,
            requirements
          }
          FILTER 
            .volunteer.id = <str>$userId
            AND .status = 'active'
          ORDER BY .date ASC
        ),
        impact_metrics := (
          SELECT VolunteerMetrics {
            animals_cared,
            shelters_helped,
            events_covered,
            total_impact_hours
          }
          FILTER .volunteer.id = <str>$userId
        )
      SELECT {
        stats := {
          totalHours := volunteer.total_hours,
          missionsCompleted := volunteer.missions_completed,
          skillsCertified := volunteer.skills_certified
        },
        activeMissions := active_missions,
        impactMetrics := impact_metrics,
        schedule := (
          SELECT Schedule {
            date,
            shift_start,
            shift_end,
            mission: {
              title,
              location
            }
          }
          FILTER 
            .volunteer.id = <str>$userId
            AND .date >= datetime_current()
          ORDER BY .date ASC
        ),
        emergencyAlerts := (
          SELECT Alert {
            id,
            title,
            description,
            severity,
            location,
            created_at
          }
          FILTER 
            .status = 'active'
            AND .severity IN {'high', 'urgent'}
          ORDER BY .created_at DESC
          LIMIT 5
        ),
        skills := volunteer.skills_certified,
        certifications := (
          SELECT Certification {
            name,
            issued_date,
            expiry_date,
            status
          }
          FILTER .volunteer.id = <str>$userId
        )
      };
    `

    const dashboardData = await client.querySingle(query, { userId: user.id })

    if (!dashboardData) {
      // Return placeholder data if no dashboard data exists
      return {
        stats: {
          totalHours: 0,
          missionsCompleted: 0,
          skillsCertified: [],
        },
        activeMissions: [],
        impactMetrics: {
          animalsCared: 0,
          sheltersHelped: 0,
          eventsCovered: 0,
          totalImpactHours: 0,
        },
        schedule: [],
        emergencyAlerts: [],
        skills: [],
        certifications: [],
      }
    }

    return dashboardData
  } catch (error) {
    console.error("Error fetching volunteer dashboard data:", error)
    throw new Error("Failed to fetch volunteer dashboard data")
  }
}

export async function addVaccination(petId: string, data: VaccinationData) {
  try {
    const user = await currentUser()
    if (!user) {
      throw new Error("Unauthorized")
    }

    const client = getClient()

    // First verify pet ownership
    const verifyQuery = `
      SELECT Pet {
        id
      }
      FILTER 
        .id = <str>$petId 
        AND .owner_id = <str>$userId;
    `

    const pet = await client.querySingle(verifyQuery, { petId, userId: user.id })
    if (!pet) {
      throw new Error("Pet not found or unauthorized")
    }

    // Insert vaccination record using EdgeDB
    const query = `
      INSERT Vaccination {
        pet_id := <str>$petId,
        name := <str>$name,
        date := <datetime>$date,
        next_due_date := <optional datetime>$nextDueDate,
        recorded_by := <str>$userId
      }
    `

    const vaccination = await client.querySingle(query, {
      petId,
      name: data.name,
      date: data.date,
      nextDueDate: data.nextDueDate || null,
      userId: user.id,
    })

    revalidatePath(`/pets/${petId}/medical`)
    return vaccination
  } catch (error) {
    console.error("Error adding vaccination:", error)
    throw new Error("Failed to add vaccination")
  }
}

export async function createBooking(data: BookingData) {
  try {
    const user = await currentUser()
    if (!user) {
      throw new Error("Unauthorized")
    }

    const client = getClient()

    // Create the booking using EdgeDB
    const query = `
      WITH
        new_booking := (
          INSERT Booking {
            provider_id := <str>$providerId,
            service_id := <str>$serviceId,
            pet_id := <str>$petId,
            owner_id := <str>$userId,
            date := <datetime>$date,
            time := <str>$time,
            notes := <optional str>$notes,
            status := 'pending'
          }
        )
      SELECT {
        id := new_booking.id,
        amount := (
          SELECT Service.amount 
          FILTER .id = <str>$serviceId
        ),
        provider := (
          SELECT Provider {
            name,
            email
          }
          FILTER .id = <str>$providerId
        )
      }
    `

    const bookingResult = await client.querySingle(query, {
      providerId: data.providerId,
      serviceId: data.serviceId,
      petId: data.petId,
      userId: user.id,
      date: new Date(data.date),
      time: data.time,
      notes: data.notes || null,
    })

    if (!bookingResult) {
      throw new Error("Failed to create booking")
    }

    // Initialize Razorpay with the provided credentials
    const razorpay = new Razorpay({
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY!,
      key_secret: process.env.RAZORPAY_SECRET!,
    })

    // Convert amount to paise (smallest currency unit)
    const amountInPaise = Math.round(bookingResult.amount * 100)

    // Create Razorpay order with proper options
    const orderOptions = {
      amount: amountInPaise,
      currency: "INR",
      receipt: bookingResult.id,
      payment_capture: 1, // Auto capture payment
      notes: {
        bookingId: bookingResult.id,
        petId: data.petId,
        serviceId: data.serviceId,
        providerId: data.providerId,
      },
    }

    // Create the order
    const order = await razorpay.orders.create(orderOptions)

    // Update booking with Razorpay order ID
    const updateQuery = `
      UPDATE Booking
      FILTER .id = <str>$bookingId
      SET {
        razorpay_order_id := <str>$orderId,
        amount := <float64>$amount,
        currency := 'INR'
      }
    `

    await client.query(updateQuery, {
      bookingId: bookingResult.id,
      orderId: order.id,
      amount: bookingResult.amount,
    })

    // Return the necessary data for the frontend
    return {
      success: true,
      bookingId: bookingResult.id,
      razorpayOrderId: order.id,
      amount: bookingResult.amount,
      currency: "INR",
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
      // Include additional booking details that might be needed
      booking: {
        date: data.date,
        time: data.time,
        notes: data.notes,
        provider: bookingResult.provider,
      },
    }
  } catch (error) {
    console.error("Error creating booking:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create booking",
    }
  }
}

// Add the fetchClinicProfile function
export async function fetchClinicProfile(clinicId: string): Promise<Clinic | null> {
  try {
    const user = await currentUser()
    if (!user) {
      throw new Error("Unauthorized")
    }

    const client = getClient()

    const query = `
      SELECT Clinic {
        id,
        name,
        address,
        phone,
        email,
        description,
        services: {
          id,
          name,
          price,
          duration
        } ORDER BY .name ASC,
        veterinarians: {
          id,
          name,
          specialization,
          availability
        } ORDER BY .name ASC
      }
      FILTER .id = <str>$clinicId;
    `

    const clinic = await client.querySingle(query, { clinicId })

    if (!clinic) {
      return null
    }

    return clinic as Clinic
  } catch (error) {
    console.error("Error fetching clinic profile:", error)
    throw new Error("Failed to fetch clinic profile")
  }
}

// Add the fetchHostelDashboardData function
export async function fetchHostelDashboardData(): Promise<HostelDashboardData> {
  try {
    const user = await currentUser()
    if (!user) {
      throw new Error("Unauthorized")
    }

    const client = getClient()

    // Fetch hostel dashboard data using EdgeDB
    const query = `
      WITH
        hostel := (
          SELECT Hostel {
            id,
            name,
            rooms: {
              id,
              number,
              type,
              status,
              current_guest := (
                SELECT .bookings {
                  id,
                  pet: { name },
                  check_in,
                  check_out
                }
                FILTER 
                  .status = 'active'
                  AND .check_in <= datetime_current()
                  AND .check_out > datetime_current()
                LIMIT 1
              )
            },
            bookings: {
              id,
              pet: { name },
              owner: { name },
              room: { number, type },
              check_in,
              check_out,
              status
            } FILTER 
              .status = 'confirmed'
              AND .check_in > datetime_current()
              ORDER BY .check_in ASC
              LIMIT 5,
            current_guests := (
              SELECT .bookings {
                id,
                pet: { name },
                owner: { name },
                room: { number },
                check_in,
                check_out,
                special_needs
              }
              FILTER 
                .status = 'active'
                AND .check_in <= datetime_current()
                AND .check_out > datetime_current()
            ),
            stats := {
              total_pets := count(Pet),
              occupancy_rate := len(
                SELECT .rooms 
                FILTER .status = 'occupied'
              ) / len(.rooms) * 100,
              upcoming_bookings := len(
                SELECT .bookings 
                FILTER 
                  .status = 'confirmed'
                  AND .check_in > datetime_current()
              ),
              revenue := sum(
                SELECT .bookings.amount 
                FILTER 
                  .status = 'completed'
                  AND .check_out >= datetime_current() - duration('30 days')
              )
            }
          }
          FILTER .owner_id = <str>$userId
        )
      SELECT {
        stats := {
          totalPets := hostel.stats.total_pets,
          occupancyRate := hostel.stats.occupancy_rate,
          upcomingBookings := hostel.stats.upcoming_bookings,
          revenue := hostel.stats.revenue ?? 0
        },
        rooms := array_agg(
          hostel.rooms {
            id,
            number,
            type,
            status,
            currentGuest := .current_guest {
              id,
              name := .pet.name,
              checkIn := .check_in,
              checkOut := .check_out
            }
          }
        ),
        currentGuests := array_agg(
          hostel.current_guests {
            id,
            petName := .pet.name,
            ownerName := .owner.name,
            roomNumber := .room.number,
            checkIn := .check_in,
            checkOut := .check_out,
            specialNeeds := .special_needs
          }
        ),
        upcomingBookings := array_agg(
          hostel.bookings {
            id,
            petName := .pet.name,
            ownerName := .owner.name,
            roomType := .room.type,
            checkIn := .check_in,
            checkOut := .check_out,
            status
          }
        )
      };
    `

    const data = await client.querySingle(query, { userId: user.id })

    if (!data) {
      // Return placeholder data if no dashboard data exists
      return {
        stats: {
          totalPets: 0,
          occupancyRate: 0,
          upcomingBookings: 0,
          revenue: 0,
        },
        rooms: [],
        currentGuests: [],
        upcomingBookings: [],
      }
    }

    return data as HostelDashboardData
  } catch (error) {
    console.error("Error fetching hostel dashboard data:", error)
    throw new Error("Failed to fetch hostel dashboard data")
  }
}

// Add the fetchNGODashboardData function
export async function fetchNGODashboardData(): Promise<NGODashboardData> {
  try {
    const user = await currentUser()
    if (!user) {
      throw new Error("Unauthorized")
    }

    // Verify user is NGO admin
    if (!user.publicMetadata?.role || user.publicMetadata.role !== "ngo_admin") {
      throw new Error("Unauthorized: Requires NGO admin role")
    }

    const client = getClient()

    // Fetch NGO dashboard data using EdgeDB
    const query = `
      WITH
        ngo := (
          SELECT NGO {
            id,
            name,
            rescue_cases := (
              SELECT RescueCase {
                id,
                animal_type,
                location,
                status,
                reported_at,
                severity,
                description
              }
              FILTER .status != 'resolved'
              ORDER BY .reported_at DESC
              LIMIT 10
            ),
            adoptions := (
              SELECT Adoption {
                id,
                pet: {
                  name,
                  type
                },
                applicant: {
                  name
                },
                status,
                application_date,
                home_check_date
              }
              ORDER BY .application_date DESC
              LIMIT 5
            ),
            foster_program := (
              SELECT FosterCase {
                id,
                foster_parent: {
                  name
                },
                pet: {
                  name
                },
                start_date,
                end_date,
                status
              }
              FILTER .status = 'active'
              ORDER BY .start_date DESC
              LIMIT 5
            ),
            emergency_alerts := (
              SELECT Alert {
                id,
                title,
                description,
                location,
                severity,
                created_at
              }
              FILTER 
                .status = 'active'
                AND .severity IN {'high', 'urgent'}
              ORDER BY .created_at DESC
              LIMIT 5
            ),
            volunteer_schedule := (
              SELECT VolunteerShift {
                id,
                volunteer: {
                  name
                },
                task,
                date,
                start_time,
                end_time
              }
              FILTER .date >= datetime_current()
              ORDER BY .date ASC, .start_time ASC
              LIMIT 10
            ),
            stats := {
              total_rescues := count(RescueCase),
              active_adoptions := count(
                SELECT Adoption 
                FILTER .status IN {'pending', 'approved'}
              ),
              foster_homes := count(
                SELECT DISTINCT FosterCase.foster_parent
                FILTER .status = 'active'
              ),
              volunteers := count(Volunteer)
            }
          }
          FILTER .admin_id = <str>$userId
        )
      SELECT {
        stats := {
          totalRescues := ngo.stats.total_rescues,
          activeAdoptions := ngo.stats.active_adoptions,
          fosterHomes := ngo.stats.foster_homes,
          volunteers := ngo.stats.volunteers
        },
        rescueCases := array_agg(
          ngo.rescue_cases {
            id,
            animalType := .animal_type,
            location,
            status,
            reportedAt := .reported_at,
            severity,
            description
          }
        ),
        adoptions := array_agg(
          ngo.adoptions {
            id,
            petName := .pet.name,
            petType := .pet.type,
            applicantName := .applicant.name,
            status,
            applicationDate := .application_date,
            homeCheckDate := .home_check_date
          }
        ),
        fosterProgram := array_agg(
          ngo.foster_program {
            id,
            fosterParentName := .foster_parent.name,
            petName := .pet.name,
            startDate := .start_date,
            endDate := .end_date,
            status
          }
        ),
        emergencyAlerts := array_agg(
          ngo.emergency_alerts {
            id,
            title,
            description,
            location,
            severity,
            createdAt := .created_at
          }
        ),
        volunteerSchedule := array_agg(
          ngo.volunteer_schedule {
            id,
            volunteerName := .volunteer.name,
            task,
            date,
            startTime := .start_time,
            endTime := .end_time
          }
        )
      };
    `

    const data = await client.querySingle(query, { userId: user.id })

    if (!data) {
      // Return placeholder data if no dashboard data exists\
      return {    if (!data) {
      // Return placeholder data if no dashboard data exists
      return {
        stats: {
          totalRescues: 0,
          activeAdoptions: 0,
          fosterHomes: 0,
          volunteers: 0
        },
        rescueCases: [],
        adoptions: [],
        fosterProgram: [],
        emergencyAlerts: [],
        volunteerSchedule: []
      }
    }

    return data as NGODashboardData
  } catch (error) 
    console.error("Error fetching NGO dashboard data:", error)
    throw new Error("Failed to fetch NGO dashboard data")
}


// Add the fetchPetById function
export async function fetchPetById(petId: string): Promise<DetailedPet | null> {
  try {
    const user = await currentUser()
    if (!user) {
      throw new Error("Unauthorized")
    }

    const client = getClient()

    const query = `
      SELECT Pet {
        id,
        name,
        species,
        breed,
        age,
        image_url,
        created_at,
        owner: {
          id,
          name
        }
      }
      FILTER .id = <str>$petId;
    `

    const pet = await client.querySingle(query, { petId })

    if (!pet) {
      return null
    }

    return {
      id: pet.id,
      name: pet.name,
      species: pet.species,
      breed: pet.breed,
      age: pet.age,
      imageUrl: pet.image_url,
      createdAt: pet.created_at,
      owner: {
        id: pet.owner.id,
        name: pet.owner.name
      }
    }
  } catch (error) {
    console.error("Error fetching pet:", error)
    throw new Error("Failed to fetch pet")
  }
}

// Add the fetchPetImages function
export async function fetchPetImages(petId: string): Promise<PetImage[]> {
  try {
    const user = await currentUser()
    if (!user) {
      throw new Error("Unauthorized")
    }

    const client = getClient()

    const query = `
      SELECT PetImage {
        pathname,
        url,
        uploaded_at
      }
      FILTER .pet_id = <str>$petId
      ORDER BY .uploaded_at DESC;
    `

    const images = await client.query(query, { petId })

    return images.map(image => ({
      pathname: image.pathname,
      url: image.url,
      uploadedAt: image.uploaded_at
    }))
  } catch (error) {
    console.error("Error fetching pet images:", error)
    return []
  }
}

