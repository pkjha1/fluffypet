import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Shield, Stethoscope, Dna, Activity, Clock } from "lucide-react"

export function Features() {
  return (
    <section className="container space-y-8 py-12 lg:py-20" id="features">
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <h2 className="text-3xl font-bold leading-[1.1] sm:text-4xl md:text-5xl">Cutting-Edge Pet Care Technology</h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          Experience the perfect blend of AI, blockchain, and IoT technology to provide the best care for your pets.
        </p>
      </div>
      <div className="mx-auto grid gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
        {features.map((feature) => (
          <Card key={feature.title} className="relative overflow-hidden">
            <CardHeader>
              <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>{feature.title}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
            <CardContent>{feature.content}</CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

const features = [
  {
    icon: Brain,
    title: "AI-Powered Diagnostics",
    description: "Early detection and prevention of health issues",
    content:
      "Our AI system processes real-time biometrics from wearables to forecast potential health issues before they become serious.",
  },
  {
    icon: Shield,
    title: "Blockchain Verification",
    description: "Secure and immutable pet records",
    content:
      "Every health record, vaccination, and treatment is securely stored on the blockchain, ensuring data integrity and easy access.",
  },
  {
    icon: Stethoscope,
    title: "24/7 Virtual Vet",
    description: "Immediate medical assistance",
    content: "Get instant answers to your pet health questions and receive emergency triage support anytime, anywhere.",
  },
  {
    icon: Dna,
    title: "Genetic Tracking",
    description: "Comprehensive breed information",
    content:
      "Track your pet's genetic history and receive personalized care recommendations based on breed-specific health risks.",
  },
  {
    icon: Activity,
    title: "Real-time Monitoring",
    description: "Track vital signs and activity",
    content:
      "Monitor your pet's heart rate, temperature, and activity levels in real-time through our smart collar integration.",
  },
  {
    icon: Clock,
    title: "Preventive Care",
    description: "Stay ahead of health issues",
    content: "Receive timely reminders for vaccinations, medications, and check-ups to ensure your pet stays healthy.",
  },
]

