"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { VaccinationHistory } from "./medical/vaccination-history"
import { Allergies } from "./medical/allergies"
import { ChronicConditions } from "./medical/chronic-conditions"
import { SurgicalHistory } from "./medical/surgical-history"
import { Medications } from "./medical/medications"
import { TestResults } from "./medical/test-results"
import { MicrochipDetails } from "./medical/microchip-details"
import { VeterinaryContacts } from "./medical/veterinary-contacts"

interface MedicalRecordsProps {
  petId: string
}

export function MedicalRecords({ petId }: MedicalRecordsProps) {
  return (
    <Tabs defaultValue="vaccinations" className="w-full">
      <TabsList className="grid grid-cols-2 lg:grid-cols-4 w-full">
        <TabsTrigger value="vaccinations">Vaccinations</TabsTrigger>
        <TabsTrigger value="allergies">Allergies</TabsTrigger>
        <TabsTrigger value="conditions">Conditions</TabsTrigger>
        <TabsTrigger value="surgeries">Surgeries</TabsTrigger>
        <TabsTrigger value="medications">Medications</TabsTrigger>
        <TabsTrigger value="tests">Test Results</TabsTrigger>
        <TabsTrigger value="microchip">Microchip</TabsTrigger>
        <TabsTrigger value="vets">Veterinarians</TabsTrigger>
      </TabsList>

      <TabsContent value="vaccinations">
        <VaccinationHistory petId={petId} />
      </TabsContent>
      <TabsContent value="allergies">
        <Allergies petId={petId} />
      </TabsContent>
      <TabsContent value="conditions">
        <ChronicConditions petId={petId} />
      </TabsContent>
      <TabsContent value="surgeries">
        <SurgicalHistory petId={petId} />
      </TabsContent>
      <TabsContent value="medications">
        <Medications petId={petId} />
      </TabsContent>
      <TabsContent value="tests">
        <TestResults petId={petId} />
      </TabsContent>
      <TabsContent value="microchip">
        <MicrochipDetails petId={petId} />
      </TabsContent>
      <TabsContent value="vets">
        <VeterinaryContacts petId={petId} />
      </TabsContent>
    </Tabs>
  )
}

