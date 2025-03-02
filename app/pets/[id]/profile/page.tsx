import { notFound } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { fetchPetById } from "@/app/actions"
import { BasicInfo } from "@/components/pet-profile/basic-info"
import { MedicalRecords } from "@/components/pet-profile/medical-records"
import { OwnershipDetails } from "@/components/pet-profile/ownership-details"
import { ServiceHistory } from "@/components/pet-profile/service-history"
import { SocialFeatures } from "@/components/pet-profile/social-features"
import { InsuranceDetails } from "@/components/pet-profile/insurance-details"
import { SecuritySettings } from "@/components/pet-profile/security-settings"
import { Header } from "@/components/ui/header"

export default async function PetProfilePage({ params }: { params: { id: string } }) {
  const pet = await fetchPetById(params.id)

  if (!pet) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container py-6">
        <div className="max-w-6xl mx-auto space-y-8">
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid grid-cols-2 lg:grid-cols-4 w-full">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="medical">Medical Records</TabsTrigger>
              <TabsTrigger value="ownership">Ownership</TabsTrigger>
              <TabsTrigger value="services">Services</TabsTrigger>
              <TabsTrigger value="social">Social</TabsTrigger>
              <TabsTrigger value="insurance">Insurance</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>
            <TabsContent value="basic">
              <BasicInfo pet={pet} />
            </TabsContent>
            <TabsContent value="medical">
              <MedicalRecords petId={pet.id} />
            </TabsContent>
            <TabsContent value="ownership">
              <OwnershipDetails petId={pet.id} />
            </TabsContent>
            <TabsContent value="services">
              <ServiceHistory petId={pet.id} />
            </TabsContent>
            <TabsContent value="social">
              <SocialFeatures petId={pet.id} />
            </TabsContent>
            <TabsContent value="insurance">
              <InsuranceDetails petId={pet.id} />
            </TabsContent>
            <TabsContent value="security">
              <SecuritySettings petId={pet.id} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

