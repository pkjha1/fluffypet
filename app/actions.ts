"use server"

import { auth } from "@clerk/nextjs"
import { revalidatePath } from "next/cache"
import { db } from "./db" // Import the db object
import { prisma } from '@/lib/prisma'

export async function fetchVetDashboardData() {
  try {
    // Fetch recent appointments
    const recentAppointments = await prisma.appointment.findMany({
      take: 10,
      orderBy: {
        date: 'desc'
      },
      include: {
        pet: true,
        owner: true
      }
    })

    // Fetch statistics
    const totalPets = await prisma.pet.count()
    const totalAppointments = await prisma.appointment.count()
    const upcomingAppointments = await prisma.appointment.count({
      where: {
        date: {
          gte: new Date()
        }
      }
    })

    return {
      recentAppointments,
      statistics: {
        totalPets,
        totalAppointments,
        upcomingAppointments
      }
    }
  } catch (error) {
    console.error('Error fetching dashboard data:', error)
    throw new Error('Failed to fetch dashboard data')
  }
}


export async function addNewPet(formData: FormData) {
  const name = formData.get('name')?.toString() || ''
  const type = formData.get('type')?.toString() || ''
  const breed = formData.get('breed')?.toString() || ''
  const age = parseInt(formData.get('age')?.toString() || '0')
  
  const pet = await prisma.pet.create({
    data: {
      name,
      type,
      breed,
      age
    }
  })

  return pet
}

export async function updateUserRole(userId: string, role: string) {
  const { sessionClaims } = auth()

  if (sessionClaims?.role !== "admin") {
    throw new Error("Unauthorized")
  }

  // Update user role in your database
  // This is a placeholder - implement your database logic here
  await db.user.update({
    where: { id: userId },
    data: { role },
  })

  revalidatePath("/admin/users")
}

export async function fetchUsers() {
  const { sessionClaims } = auth()

  if (sessionClaims?.role !== "admin") {
    throw new Error("Unauthorized")
  }

  // Fetch users from your database
  // This is a placeholder - implement your database logic here
  const users = await db.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,
    },
  })

  return users
}

