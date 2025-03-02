import { notFound } from "next/navigation"
import { fetchHostelById } from "@/app/actions"
import { HostelProfile } from "@/components/hostel-profile"
import { RoomList } from "@/components/room-list"
import { BookingCalendar } from "@/components/booking-calendar"
import { HostelReviews } from "@/components/hostel-reviews"
import  Header  from "@/components/Header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default async function HostelPage({ params }: { params: { id: string } }) {
  const hostel = await fetchHostelById(params.id)

  if (!hostel) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container py-6">
        <div className="max-w-7xl mx-auto">
          <Tabs defaultValue="overview">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="rooms">Rooms</TabsTrigger>
              <TabsTrigger value="booking">Book Now</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <HostelProfile hostel={hostel} />
            </TabsContent>
            <TabsContent value="rooms">
              <RoomList hostel={hostel} />
            </TabsContent>
            <TabsContent value="booking">
              <BookingCalendar hostel={hostel} />
            </TabsContent>
            <TabsContent value="reviews">
              <HostelReviews hostel={hostel} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

