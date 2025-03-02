import { notFound } from "next/navigation"
import { fetchProviderById } from "@/app/actions"
import { ServiceProviderProfile } from "@/components/service-provider-profile"
import { AvailabilityCalendar } from "@/components/availability-calendar"
import { ServicePricing } from "@/components/service-pricing"
import { ProviderReviews } from "@/components/provider-reviews"
import Header from "@/components/Header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default async function ProviderPage({ params }: { params: { id: string } }) {
  const provider = await fetchProviderById(params.id)

  if (!provider) {
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
              <TabsTrigger value="services">Services</TabsTrigger>
              <TabsTrigger value="availability">Availability</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="profile">
              <ServiceProviderProfile provider={provider} />
            </TabsContent>
            <TabsContent value="services">
              <ServicePricing provider={provider} />
            </TabsContent>
            <TabsContent value="availability">
              <AvailabilityCalendar provider={provider} />
            </TabsContent>
            <TabsContent value="reviews">
              <ProviderReviews provider={provider} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

