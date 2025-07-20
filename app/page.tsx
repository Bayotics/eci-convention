"use client"

import { useState, useEffect } from "react"
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
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <TopBar isScrolled={isScrolled} />
      <Header isScrolled={isScrolled} />
      <HeroSection isScrolled={isScrolled} />
      <KeyHighlightsGrid />
      <AboutSection />
      <KeyHighlightsSection />
      <FeaturedSpeakers />
      <SponsorsSection />
      <ConventionExperienceCards />
      <SocialMediaCTA />
      <Footer />
    </div>
  )
}
