import type { Metadata } from "next"
import { TopBar } from "@/components/sections/top-bar"
import { Header } from "@/components/sections/header"
import { Footer } from "@/components/sections/footer"
import { FAQSection } from "@/components/sections/faq-section"

export const metadata: Metadata = {
  title: "FAQ - ECI@25 Convention",
  description: "Frequently Asked Questions about the 25th International Convention - Newark, NJ | Sept 18-21, 2025",
}

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Header />
      {/* Hero Section - matching other pages */}
      <section className="relative text-white py-8 sm:py-12 md:py-16 lg:py-20"
        style={{
          backgroundImage: "url('/images/speakers-banner.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}>
        {/* Background Image */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/80 via-blue-600/70 to-teal-500/80"></div>
        <div className="absolute inset-0 bg-black/20"></div>

        {/* Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-[190px] sm:pt-[130px] md:pt-[140px] lg:pt-[150px]">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl leading-relaxed">
            Everything you need to know about the 25th International Convention
          </p>
        </div>
      </section>

      <FAQSection />
      <Footer />
    </div>
  )
}
