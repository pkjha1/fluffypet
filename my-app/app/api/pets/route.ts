import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const pets = await prisma.pet.findMany({
      include: { owner: true }
    })
    return NextResponse.json(pets)
  } catch (error) {
    console.error('Error fetching pets:', error)
    return NextResponse.json({ error: 'Failed to fetch pets' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const { name, type, breed, age, medicalInfo, ownerId } = await req.json()
    const pet = await prisma.pet.create({
      data: {
        name,
        type,
        breed,
        age,
        medicalInfo,
        ownerId,
      },
    })
    return NextResponse.json(pet, { status: 201 })
  } catch (error) {
    console.error('Error creating pet:', error)
    return NextResponse.json({ error: 'Failed to create pet' }, { status: 500 })
  }
}

