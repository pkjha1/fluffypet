import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ImpactStatsProps {
  profile: {
    totalHours: number
    missionsCompleted: number
    impactMetrics: {
      animalsCared: number
      sheltersHelped: number
      eventsCovered: number
    }
  }
}

export function ImpactStats({ profile }: ImpactStatsProps) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold">Your Impact</h2>
        <p className="text-muted-foreground mt-2">See how you've made a difference</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Hours</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{profile.totalHours}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Missions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{profile.missionsCompleted}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Animals Helped</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{profile.impactMetrics.animalsCared}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Shelters Supported</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{profile.impactMetrics.sheltersHelped}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Monthly Impact Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Animals Cared For</span>
              <span className="font-bold">{profile.impactMetrics.animalsCared}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Shelters Helped</span>
              <span className="font-bold">{profile.impactMetrics.sheltersHelped}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Events Covered</span>
              <span className="font-bold">{profile.impactMetrics.eventsCovered}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

