import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface VolunteerProfile {
  name: string
  email: string
  totalHours: number
  missionsCompleted: number
  skillsCertified: string[]
  impactMetrics: {
    animalsCared: number
    sheltersHelped: number
    eventsCovered: number
  }
}

interface VolunteerDashboardProps {
  profile: VolunteerProfile
}

export function VolunteerDashboard({ profile }: VolunteerDashboardProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Profile Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">{profile.name}</h3>
              <p className="text-sm text-muted-foreground">{profile.email}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {profile.skillsCertified.map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Volunteer Stats</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="text-2xl font-bold">{profile.totalHours}</p>
              <p className="text-sm text-muted-foreground">Total Hours</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{profile.missionsCompleted}</p>
              <p className="text-sm text-muted-foreground">Missions Completed</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Impact Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="text-2xl font-bold">{profile.impactMetrics.animalsCared}</p>
              <p className="text-sm text-muted-foreground">Animals Cared For</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{profile.impactMetrics.sheltersHelped}</p>
              <p className="text-sm text-muted-foreground">Shelters Helped</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{profile.impactMetrics.eventsCovered}</p>
              <p className="text-sm text-muted-foreground">Events Covered</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

