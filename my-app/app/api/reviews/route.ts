import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { auth } from '@clerk/nextjs'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  const { userId } = auth()
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { serviceProviderId, veterinarianId, rating, comment } = await req.json()
    const review = await prisma.review.create({
      data: {
        userId,
        serviceProviderId,
        veterinarianId,
        rating,
        comment,
      },
    })
    return NextResponse.json(review, { status: 201 })
  } catch (error) {
    console.error('Error creating review:', error)
    return NextResponse.json({ error: 'Failed to create review' }, { status: 500 })
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const serviceProviderId = searchParams.get('serviceProviderId')
  const veterinarianId = searchParams.get('veterinarianId')

  try {
    const reviews = await prisma.review.findMany({
      where: {
        serviceProviderId: serviceProviderId ? parseInt(serviceProviderId) : undefined,
        veterinarianId: veterinarianId ? parseInt(veterinarianId) : undefined,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })
    return NextResponse.json(reviews)
  } catch (error) {
    console.error('Error fetching reviews:', error)
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 })
  }
}

