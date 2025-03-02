import { Features } from "@/components/landing/features"
import { Hero } from "@/components/landing/hero"
import { Stats } from "@/components/landing/stats"
import { Testimonials } from "@/components/landing/testimonials"
import { HowItWorks } from "@/components/landing/how-it-works"
import { FAQ } from "@/components/landing/faq"
import { Footer } from "@/components/landing/footer"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <Hero />
        <Stats />
        <Features />
        <HowItWorks />
        <Testimonials />
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}

