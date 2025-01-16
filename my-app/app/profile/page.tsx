import { auth } from '@clerk/nextjs/server';
import { currentUser } from '@clerk/nextjs';
import { PrismaClient } from '@prisma/client'
import PetProfile from '@/components/PetProfile'
import { Button } from '@/components/ui/button'

const prisma = new PrismaClient()

export default async function ProfilePage() {
  const { userId } = auth()
  const user = await currentUser()

  if (!userId || !user) {
    return <div>Please sign in to view your profile.</div>
  }

  const pets = await prisma.pet.findMany({ where: { ownerId: userId } })
  const bookings = await prisma.appointment.findMany({ where: { userId } })

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Your Profile</h1>
      
      <section>
        <h2 className="text-2xl font-semibold mb-4">Personal Information</h2>
        <p>Name: {user.firstName} {user.lastName}</p>
        <p>Email: {user.emailAddresses[0].emailAddress}</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Your Pets</h2>
        {pets.map((pet) => (
          <PetProfile key={pet.id} pet={pet} />
        ))}
        <Button>Add New Pet</Button>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Booking History</h2>
        {bookings.map((booking) => (
          <div key={booking.id} className="border p-4 rounded mb-4">
            <p>Service: {booking.serviceType}</p>
            <p>Date: {booking.date.toLocaleDateString()}</p>
            <p>Status: {booking.status}</p>
          </div>
        ))}
      </section>
    </div>
  )
}

