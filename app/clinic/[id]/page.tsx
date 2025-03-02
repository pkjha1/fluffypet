import { notFound } from "next/navigation"
import { fetchClinicProfile } from "@/app/actions"
import { ClinicProfileView } from "@/components/clinic/profile-view"
import { VetList } from "@/components/clinic/vet-list"
import { ServicesList } from "@/components/clinic/services-list"
import  Header  from "@/components/Header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default async function ClinicProfilePage({ params }: { params: { id: string } }) {
  const clinic = await fetchClinicProfile(params.id)

  if (!clinic) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container py-6">
        <div className="max-w-7xl mx-auto">
          <Tabs defaultValue="about">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="veterinarians">Veterinarians</TabsTrigger>
              <TabsTrigger value="services">Services</TabsTrigger>
            </TabsList>
            <TabsContent value="about">
              <ClinicProfileView clinic={clinic} />
            </TabsContent>
            <TabsContent value="veterinarians">
              <VetList clinic={clinic} />
            </TabsContent>
            <TabsContent value="services">
              <ServicesList clinic={clinic} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

