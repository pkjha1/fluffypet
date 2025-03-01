import { notFound } from "next/navigation"
import { fetchRescueById } from "@/app/actions"
import { RescueProfile } from "@/components/rescue-profile"
import { MedicalTimeline } from "@/components/medical-timeline"
import { BehavioralReport } from "@/components/behavioral-report"
import { AdoptionRequirements } from "@/components/adoption-requirements"
import { Header } from "@/components/header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default async function RescuePage({ params }: { params: { id: string } }) {
  const rescue = await fetchRescueById(params.id)

  if (!rescue) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container py-6">
        <div className="max-w-7xl mx-auto">
          <Tabs defaultValue="profile">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="medical">Medical History</TabsTrigger>
              <TabsTrigger value="behavioral">Behavioral Assessment</TabsTrigger>
              <TabsTrigger value="adoption">Adoption Info</TabsTrigger>
            </TabsList>
            <TabsContent value="profile">
              <RescueProfile rescue={rescue} />
            </TabsContent>
            <TabsContent value="medical">
              <MedicalTimeline rescue={rescue} />
            </TabsContent>
            <TabsContent value="behavioral">
              <BehavioralReport rescue={rescue} />
            </TabsContent>
            <TabsContent value="adoption">
              <AdoptionRequirements rescue={rescue} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

