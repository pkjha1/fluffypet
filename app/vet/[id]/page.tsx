import { notFound } from "next/navigation"
import { fetchVetProfile } from "@/app/actions"
import { VetProfileView } from "@/components/vet/profile-view"
import { AppointmentScheduler } from "@/components/vet/appointment-scheduler"
import { PatientList } from "@/components/vet/patient-list"
import { Header } from "@/components/header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default async function VetProfilePage({ params }: { params: { id: string } }) {
  const profile = await fetchVetProfile(params.id)

  if (!profile) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container py-6">
        <div className="max-w-7xl mx-auto">
          <Tabs defaultValue="profile">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
              <TabsTrigger value="patients">Patients</TabsTrigger>
            </TabsList>
            <TabsContent value="profile">
              <VetProfileView profile={profile} />
            </TabsContent>
            <TabsContent value="schedule">
              <AppointmentScheduler vet={profile} />
            </TabsContent>
            <TabsContent value="patients">
              <PatientList vetId={profile.id} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

