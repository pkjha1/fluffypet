import { fetchVolunteerProfile, fetchAvailableMissions } from "@/app/actions"
import { VolunteerDashboard } from "@/components/volunteer-dashboard"
import { ImpactStats } from "@/components/impact-stats"
import { Header } from "@/components/header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, MapPin, Users } from "lucide-react"

export default async function VolunteerPage() {
  const profile = await fetchVolunteerProfile()
  const missions = await fetchAvailableMissions()
  const opportunities = [
    {
      id: 1,
      title: "Dog Walker",
      organization: "Happy Paws Shelter",
      location: "Downtown",
      schedule: "Flexible",
      commitment: "2-4 hours/week",
      requirements: ["18+ years old", "Background check", "Orientation required"],
      description: "Help our shelter dogs get their daily exercise and socialization.",
      spots: 5,
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: 2,
      title: "Cat Socializer",
      organization: "Whiskers Haven",
      location: "East Side",
      schedule: "Weekends",
      commitment: "2-3 hours/week",
      requirements: ["16+ years old", "Cat handling experience", "Orientation required"],
      description: "Spend time with our cats to help them become more adoptable.",
      spots: 3,
      image: "/placeholder.svg?height=400&width=600",
    },
    // Add more opportunities as needed
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container py-6">
        <div className="max-w-7xl mx-auto">
          <Tabs defaultValue="dashboard">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="missions">Available Missions</TabsTrigger>
              <TabsTrigger value="impact">My Impact</TabsTrigger>
            </TabsList>
            <TabsContent value="dashboard">
              <VolunteerDashboard profile={profile} />
            </TabsContent>
            <TabsContent value="missions">
              <div className="flex-1 container py-6">
                <div className="max-w-6xl mx-auto space-y-8">
                  <div>
                    <h1 className="text-3xl font-bold">Volunteer Opportunities</h1>
                    <p className="text-muted-foreground mt-2">Make a difference in the lives of animals in need</p>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {opportunities.map((opportunity) => (
                      <Card key={opportunity.id} className="overflow-hidden">
                        <img
                          src={opportunity.image || "/placeholder.svg"}
                          alt={opportunity.title}
                          className="w-full aspect-video object-cover"
                        />
                        <CardHeader>
                          <div className="space-y-2">
                            <CardTitle>{opportunity.title}</CardTitle>
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary">{opportunity.organization}</Badge>
                              <Badge variant="outline">{opportunity.schedule}</Badge>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <MapPin className="h-4 w-4" />
                              <span>{opportunity.location}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Clock className="h-4 w-4" />
                              <span>{opportunity.commitment}</span>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <p className="text-sm">{opportunity.description}</p>
                            <div className="flex flex-wrap gap-2">
                              {opportunity.requirements.map((req) => (
                                <Badge key={req} variant="outline">
                                  {req}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Users className="h-4 w-4" />
                              <span>{opportunity.spots} spots available</span>
                            </div>
                            <Button>Apply Now</Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="impact">
              <ImpactStats profile={profile} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

