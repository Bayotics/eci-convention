"use client"
import { TopBar } from "@/components/sections/top-bar"
import { Header } from "@/components/sections/header"
import { HeroSection } from "@/components/sections/hero-section"
import { KeyHighlightsGrid } from "@/components/sections/key-highlights-grid"
import { AboutSection } from "@/components/sections/about-section"
import { KeyHighlightsSection } from "@/components/sections/key-highlights-section"
import { FeaturedSpeakers } from "@/components/sections/featured-speakers"
import { SponsorsSection } from "@/components/sections/sponsors-section"
import { ConventionExperienceCards } from "@/components/sections/convention-experience-cards"
import { SocialMediaCTA } from "@/components/sections/social-media-cta"
import { Footer } from "@/components/sections/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Header />
      {/* Add padding-top to account for fixed header */}
      <div className="pt-[140px] sm:pt-[140px] md:pt-[150px] app-main-container">
        <HeroSection />
        <KeyHighlightsGrid />
        <AboutSection />
        <KeyHighlightsSection />
        <FeaturedSpeakers />
        <SponsorsSection />
        <ConventionExperienceCards />
        <SocialMediaCTA />
        <Footer />
      </div>
    </div>
  )
}
