import { fetchBreederDashboardData } from "@/app/actions"
import { Header } from "@/components/header"
import { BreederStats } from "@/components/breeder/dashboard/stats"
import { ActiveListings } from "@/components/breeder/dashboard/active-listings"
import { AdoptionRequests } from "@/components/breeder/dashboard/adoption-requests"
import { CertificationStatus } from "@/components/breeder/dashboard/certification-status"
import { ComplianceReports } from "@/components/breeder/dashboard/compliance-reports"

export default async function BreederDashboard() {
  const dashboardData = await fetchBreederDashboardData()

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container py-6">
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-bold">Breeder Dashboard</h1>
            <p className="text-muted-foreground">Manage pet listings, adoptions, and certifications</p>
          </div>

          <BreederStats stats={dashboardData.stats} />

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              <ActiveListings listings={dashboardData.activeListings} />
              <AdoptionRequests requests={dashboardData.adoptionRequests} />
            </div>
            <div className="space-y-6">
              <CertificationStatus status={dashboardData.certificationStatus} />
              <ComplianceReports reports={dashboardData.complianceReports} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

