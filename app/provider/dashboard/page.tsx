import { fetchProviderDashboardData } from "@/app/actions"
import  Header  from "@/components/Header"
import { ProviderStats } from "@/components/provider/dashboard/stats"
import { ServiceList } from "@/components/provider/dashboard/service-list"
import { BookingCalendar } from "@/components/provider/dashboard/booking-calendar"
import { ReviewsOverview } from "@/components/provider/dashboard/reviews-overview"
import { ServiceHistory } from "@/components/provider/dashboard/service-history"

export default async function ProviderDashboard() {
  const dashboardData = await fetchProviderDashboardData()

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container py-6">
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-bold">Service Provider Dashboard</h1>
            <p className="text-muted-foreground">Manage your services, bookings, and client reviews</p>
          </div>

          <ProviderStats stats={dashboardData.stats} />

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              <ServiceList services={dashboardData.services} />
              <ServiceHistory history={dashboardData.serviceHistory} />
            </div>
            <div className="space-y-6">
              <BookingCalendar bookings={dashboardData.bookings} />
              <ReviewsOverview reviews={dashboardData.reviews} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

