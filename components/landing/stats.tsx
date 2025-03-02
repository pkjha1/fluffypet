import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Building2, Activity, Award } from "lucide-react"

export function Stats() {
  return (
    <section className="container py-12 lg:py-20">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

const stats = [
  {
    icon: Users,
    title: "Active Users",
    value: "10,000+",
    description: "Pet owners trust FluffyPet",
  },
  {
    icon: Building2,
    title: "Vet Clinics",
    value: "500+",
    description: "Connected healthcare providers",
  },
  {
    icon: Activity,
    title: "Daily Diagnostics",
    value: "25,000+",
    description: "AI-powered health checks",
  },
  {
    icon: Award,
    title: "Success Rate",
    value: "99.9%",
    description: "In early disease detection",
  },
]

