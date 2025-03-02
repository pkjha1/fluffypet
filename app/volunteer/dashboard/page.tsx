import { fetchVolunteerDashboardData } from "@/app/actions"
import  Header  from "@/components/Header"
import { VolunteerStats } from "@/components/volunteer/dashboard/stats"
import { ActiveMissions } from "@/components/volunteer/dashboard/active-missions"
import { AvailabilityCalendar } from "@/components/volunteer/dashboard/availability-calendar"
import { ImpactMetrics } from "@/components/volunteer/dashboard/impact-metrics"
import { EmergencyAlerts } from "@/components/volunteer/dashboard/emergency-alerts"
import { SkillsCertification } from "@/components/volunteer/dashboard/skills-certification"
import { addNewPet } from '@/app/actions'

export default async function VolunteerDashboard() {
  const dashboardData = await fetchVolunteerDashboardData()

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container py-6">
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-bold">Volunteer Dashboard</h1>
            <p className="text-muted-foreground">Manage your missions, schedule, and impact</p>
          </div>

          <VolunteerStats stats={dashboardData.stats} />

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              <ActiveMissions missions={dashboardData.activeMissions} />
              <ImpactMetrics metrics={dashboardData.impactMetrics} />
            </div>
            <div className="space-y-6">
              <EmergencyAlerts alerts={dashboardData.emergencyAlerts} />
              <AvailabilityCalendar schedule={dashboardData.schedule} onUpdate={dashboardData.onScheduleUpdate} />
              <SkillsCertification skills={dashboardData.skills} certifications={dashboardData.certifications} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

