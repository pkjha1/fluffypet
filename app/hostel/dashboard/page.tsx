import { fetchHostelDashboardData } from "@/app/actions"
import { HostelStats } from "@/components/hostel/dashboard/stats"
import { RoomOverview } from "@/components/hostel/dashboard/room-overview"
import { CurrentGuests } from "@/components/hostel/dashboard/current-guests"
import { UpcomingBookings } from "@/components/hostel/dashboard/upcoming-bookings"
import { MonitoringSystem } from "@/components/hostel/dashboard/monitoring-system"

export default async function HostelDashboard() {
  const dashboardData = await fetchHostelDashboardData()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your pet hostel operations</p>
      </div>

      <HostelStats stats={dashboardData.stats} />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <RoomOverview rooms={dashboardData.rooms} />
          <CurrentGuests guests={dashboardData.currentGuests} />
        </div>
        <div className="space-y-6">
          <UpcomingBookings bookings={dashboardData.upcomingBookings} />
          <MonitoringSystem pets={dashboardData.currentGuests} />
        </div>
      </div>
    </div>
  )
}

