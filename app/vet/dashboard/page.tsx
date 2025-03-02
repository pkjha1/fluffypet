"use client"

import { fetchVetDashboardData } from "@/app/actions"
import { Header } from "@/components/ui/header"
import { VetStats } from "@/components/vet/dashboard/stats"
import { PatientOverview } from "@/components/vet/dashboard/patient-overview"
import { AIInsights } from "@/components/vet/dashboard/ai-insights"
import { AppointmentCalendar } from "@/components/vet/dashboard/appointment-calendar"
import { RecentRecords } from "@/components/vet/dashboard/recent-records"
import { ComplianceStatus } from "@/components/vet/dashboard/compliance-status"


export default async function VetDashboard() {
  const dashboardData = await fetchVetDashboardData()

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container py-6">
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-bold">Veterinarian Dashboard</h1>
            <p className="text-muted-foreground">Manage patients, appointments, and access medical tools</p>
          </div>

          <VetStats stats={dashboardData.stats} />

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              <PatientOverview patients={dashboardData.recentPatients} />
              <RecentRecords records={dashboardData.recentRecords} />
            </div>
            <div className="space-y-6">
              <AIInsights insights={dashboardData.aiInsights} />
              <ComplianceStatus status={dashboardData.complianceStatus} />
            </div>
          </div>

          <AppointmentCalendar appointments={dashboardData.appointments} />
        </div>
      </main>
    </div>
  )
}

