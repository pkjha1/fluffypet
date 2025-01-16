import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const { date, status, userId, petId, serviceProviderId, veterinarianId } = await req.json()

    const appointment = await prisma.appointment.create({
      data: {
        date,
        status,
        userId,
        petId,
        serviceProviderId,
        veterinarianId,
      },
    })

    return NextResponse.json(appointment, { status: 201 })
  } catch (error) {
    console.error('Error creating appointment:', error)
    return NextResponse.json({ error: 'Failed to create appointment' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const appointments = await prisma.appointment.findMany()
    return NextResponse.json(appointments)
  } catch (error) {
    console.error('Error fetching appointments:', error)
    return NextResponse.json({ error: 'Failed to fetch appointments' }, { status: 500 })
  }
}

