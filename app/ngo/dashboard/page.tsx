import { fetchNGODashboardData } from "@/app/actions"
import Header from "@/components/Header"
import { NGOStats } from "@/components/ngo/dashboard/stats"
import { RescueCases } from "@/components/ngo/dashboard/rescue-cases"
import { AdoptionStatus } from "@/components/ngo/dashboard/adoption-status"
import { FosterProgram } from "@/components/ngo/dashboard/foster-program"
import { VolunteerSchedule } from "@/components/ngo/dashboard/volunteer-schedule"
import { EmergencyAlerts } from "@/components/ngo/dashboard/emergency-alerts"

export default async function NGODashboard() {
  const dashboardData = await fetchNGODashboardData()

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container py-6">
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-bold">NGO/Shelter Dashboard</h1>
            <p className="text-muted-foreground">Manage rescues, adoptions, and foster programs</p>
          </div>

          <NGOStats stats={dashboardData.stats} />

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              <RescueCases cases={dashboardData.rescueCases} />
              <AdoptionStatus adoptions={dashboardData.adoptions} />
            </div>
            <div className="space-y-6">
              <EmergencyAlerts alerts={dashboardData.emergencyAlerts} />
              <FosterProgram fosters={dashboardData.fosterProgram} />
              <VolunteerSchedule schedule={dashboardData.volunteerSchedule} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

