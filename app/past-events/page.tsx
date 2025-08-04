import { Suspense } from "react"
import { TopBar } from "@/components/sections/top-bar"
import { Header } from "@/components/sections/header"
import { PastEventsHero } from "@/components/sections/past-events-hero"
import { PastEventsSection } from "@/components/sections/past-events-section"
import { Footer } from "@/components/sections/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Past Events | ECI 25th Convention",
  description: "Explore memorable moments from previous Eko Club International conventions and events.",
}

export default function PastEventsPage() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Header />
      <PastEventsHero />
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
        <PastEventsSection />
      </Suspense>
      <Footer />
    </div>
  )
}
