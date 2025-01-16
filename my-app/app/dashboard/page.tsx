import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import PetList from '@/components/PetList'
import AddPetForm from '@/components/AddPetForm'
import AppointmentList from '@/components/AppointmentList'
import BookAppointmentForm from '@/components/BookAppointmentForm'

export default function DashboardPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Customer Dashboard</h1>
      <Tabs defaultValue="pets">
        <TabsList>
          <TabsTrigger value="pets">Pets</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
        </TabsList>
        <TabsContent value="pets">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">Your Pets</h2>
              <PetList />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">Add a New Pet</h2>
              <AddPetForm />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="appointments">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">Your Appointments</h2>
              <AppointmentList />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">Book an Appointment</h2>
              <BookAppointmentForm />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

