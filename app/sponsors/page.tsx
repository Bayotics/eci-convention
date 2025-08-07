"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { TopBar } from "@/components/sections/top-bar"
import { Header } from "@/components/sections/header"
import { Footer } from "@/components/sections/footer"
import { SponsorCard } from "@/components/sections/sponsor-card"
import { SponsorModal } from "@/components/sections/sponsor-modal"
import { Mail, Phone, MapPin, Users, Building, Globe, Heart, Crown, Award, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Sponsor {
  _id: string
  name: string
  description?: string
  pic?: string
  sponsorshipType: "regular" | "corporate"
  contribution?: {
    type: "monetary" | "in-kind" | "both"
    monetaryAmount?: number
    inKindDescription?: string
  }
  websiteLink?: string
  createdAt: string
  updatedAt: string
}

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const sponsorshipPackages = [
  {
    level: "Platinum",
    amount: "$50,000+",
    color: "from-gray-300 to-gray-500",
    icon: Crown,
    benefits: [
      "Premier logo placement on all materials",
      "Keynote speaking opportunity",
      "VIP reception hosting rights",
      "Full-page program advertisement",
      "10 complimentary registrations",
      "Exclusive networking session",
      "Year-round partnership recognition",
    ],
  },
  {
    level: "Gold",
    amount: "$25,000 - $49,999",
    color: "from-yellow-300 to-yellow-600",
    icon: Award,
    benefits: [
      "Prominent logo placement",
      "Panel discussion participation",
      "Half-page program advertisement",
      "6 complimentary registrations",
      "Welcome reception recognition",
      "Social media promotion",
    ],
  },
  {
    level: "Silver",
    amount: "$10,000 - $24,999",
    color: "from-gray-400 to-gray-600",
    icon: Star,
    benefits: [
      "Logo placement on materials",
      "Quarter-page program advertisement",
      "4 complimentary registrations",
      "Exhibition booth space",
      "Website recognition",
    ],
  },
  {
    level: "Bronze",
    amount: "$5,000 - $9,999",
    color: "from-orange-400 to-orange-600",
    icon: Heart,
    benefits: ["Logo in program booklet", "2 complimentary registrations", "Website listing", "Social media mentions"],
  },
]

export default function SponsorsPage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [sponsors, setSponsors] = useState<Sponsor[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedSponsor, setSelectedSponsor] = useState<Sponsor | null>(null)
  const [filterType, setFilterType] = useState<"all" | "regular" | "corporate">("all")

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    fetchSponsors()
  }, [])

  const fetchSponsors = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/sponsors")
      const data = await response.json()

      if (data.success) {
        setSponsors(data.data)
      } else {
        setError(data.error || "Failed to fetch sponsors")
      }
    } catch (err) {
      setError("Failed to fetch sponsors")
      console.error("Error fetching sponsors:", err)
    } finally {
      setLoading(false)
    }
  }

  const filteredSponsors = sponsors.filter((sponsor) => {
    if (filterType === "all") return true
    return sponsor.sponsorshipType === filterType
  })

  const regularSponsors = filteredSponsors.filter((s) => s.sponsorshipType === "regular")
  const corporateSponsors = filteredSponsors.filter((s) => s.sponsorshipType === "corporate")

  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Header />

      {/* Hero/Banner Section */}
      <section
        className={`relative bg-gradient-to-br from-purple-600 via-blue-600 to-teal-500 text-white py-32 mt-20`}
        style={{
          backgroundImage: "url('/images/confetti-doodles.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg md:text-xl italic text-white/90 mb-4"
            >
              Celebrating our valued partners
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 text-white drop-shadow-lg leading-tight"
            >
              Our Sponsors
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg md:text-xl text-white/90 leading-relaxed max-w-3xl"
            >
              We extend our heartfelt gratitude to our generous sponsors who make ECI@25 possible. Their support enables
              us to bridge generations and build stronger communities worldwide.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                onClick={() => setFilterType("all")}
                variant={filterType === "all" ? "default" : "outline"}
                className={`px-6 py-2 ${
                  filterType === "all"
                    ? "bg-gradient-to-r from-purple-600 to-teal-600 text-white"
                    : "border-gray-300 text-gray-600 hover:bg-gray-100"
                }`}
              >
                All Sponsors ({sponsors.length})
              </Button>
              <Button
                onClick={() => setFilterType("regular")}
                variant={filterType === "regular" ? "default" : "outline"}
                className={`px-6 py-2 ${
                  filterType === "regular"
                    ? "bg-gradient-to-r from-purple-600 to-teal-600 text-white"
                    : "border-gray-300 text-gray-600 hover:bg-gray-100"
                }`}
              >
                Regular ({regularSponsors.length})
              </Button>
              <Button
                onClick={() => setFilterType("corporate")}
                variant={filterType === "corporate" ? "default" : "outline"}
                className={`px-6 py-2 ${
                  filterType === "corporate"
                    ? "bg-gradient-to-r from-purple-600 to-teal-600 text-white"
                    : "border-gray-300 text-gray-600 hover:bg-gray-100"
                }`}
              >
                Corporate ({corporateSponsors.length})
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sponsors Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {[...Array(8)].map((_, index) => (
                <div key={index} className="bg-gray-100 p-6 rounded-lg animate-pulse">
                  <div className="bg-gray-200 h-32 rounded-lg mb-4"></div>
                  <div className="bg-gray-200 h-6 rounded mb-2"></div>
                  <div className="bg-gray-200 h-4 rounded mb-2"></div>
                  <div className="bg-gray-200 h-4 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-md mx-auto">
                <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Sponsors</h3>
                <p className="text-red-600 mb-4">{error}</p>
                <Button onClick={fetchSponsors} className="bg-red-600 hover:bg-red-700 text-white">
                  Try Again
                </Button>
              </div>
            </div>
          ) : filteredSponsors.length === 0 ? (
            <div className="text-center py-20">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 max-w-md mx-auto">
                <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">No Sponsors Found</h3>
                <p className="text-gray-600">
                  {filterType === "all" ? "No sponsors have been added yet." : `No ${filterType} sponsors found.`}
                </p>
              </div>
            </div>
          ) : (
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            >
              {filteredSponsors.map((sponsor) => (
                <SponsorCard key={sponsor._id} sponsor={sponsor} onReadMore={() => setSelectedSponsor(sponsor)} />
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Sponsorship Opportunities */}
      {/* <section className="py-20 bg-gradient-to-br from-purple-50 to-teal-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-teal-600 bg-clip-text text-transparent">
              Sponsorship Opportunities
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Join our community of supporters and help us create an unforgettable experience while gaining valuable
              exposure for your organization.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {sponsorshipPackages.map((pkg, index) => {
              const IconComponent = pkg.icon
              return (
                <motion.div
                  key={pkg.level}
                  variants={fadeInUp}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className={`h-4 bg-gradient-to-r ${pkg.color}`}></div>
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className={`p-2 rounded-full bg-gradient-to-r ${pkg.color} mr-3`}>
                        <IconComponent className="h-5 w-5 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-800">{pkg.level}</h3>
                    </div>
                    <p className="text-2xl font-bold text-purple-600 mb-6">{pkg.amount}</p>
                    <ul className="space-y-3">
                      {pkg.benefits.map((benefit, bIndex) => (
                        <li key={bIndex} className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-600 text-sm">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section> */}

      {/* Contact Information for Sponsors */}
      <section className="py-20 bg-gradient-to-br from-purple-600 to-teal-600 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Become a Sponsor</h2>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto leading-relaxed">
              Partner with us to make ECI@25 a historic success while showcasing your commitment to community
              development and cultural preservation.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
          >
            <motion.div variants={fadeInUp} className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-6 text-yellow-300">Why Sponsor ECI@25?</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <Globe className="h-6 w-6 text-yellow-300 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-white mb-2">Global Reach</h4>
                      <p className="text-purple-100">
                        Connect with Nigerian diaspora communities across 60+ chapters worldwide.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <Building className="h-6 w-6 text-yellow-300 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-white mb-2">Business Networking</h4>
                      <p className="text-purple-100">
                        Access to high-net-worth individuals and business leaders from diverse industries.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <Heart className="h-6 w-6 text-yellow-300 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-white mb-2">Community Impact</h4>
                      <p className="text-purple-100">
                        Support meaningful initiatives that bridge generations and build stronger communities.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-6 text-yellow-300">Contact Our Sponsorship Team</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Mail className="h-6 w-6 text-yellow-300 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-white mb-1">Email</h4>
                    <p className="text-purple-100">waletayo2000@yahoo.com</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Phone className="h-6 w-6 text-yellow-300 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-white mb-1">Phone</h4>
                    <p className="text-purple-100">+1 (610) 203-0370</p>
                  </div>
                </div>
                
              </div>

              <div className="mt-8 pt-6 border-t border-white/20">
                <h4 className="font-bold text-white mb-4">Sponsorship Coordinator</h4>
                <p className="text-purple-100 mb-2">
                  <strong>Hon. Wallace</strong>
                </p>
                <p className="text-purple-100 mb-2">ConventionChairman</p>
                <p className="text-purple-100">waletayo2000@yahoo.com</p>
                <p className="text-purple-100">+1 (610) 203-0370</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Button className="bg-pink-500 hover:bg-pink-600 text-white flex-1">
                  Download Sponsorship Package
                </Button>
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-purple-600 bg-white/10 backdrop-blur-sm flex-1"
                >
                  Schedule a Meeting
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Thank You Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-teal-600 bg-clip-text text-transparent">
              Thank You to All Our Sponsors
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
              Your generous support makes it possible for us to bring together communities from around the world,
              celebrate our heritage, and build bridges for future generations. Together, we are making ECI@25 a
              historic celebration of unity, culture, and progress.
            </p>
            <div className="bg-gradient-to-r from-purple-100 to-teal-100 p-8 rounded-lg">
              <p className="text-2xl font-bold text-purple-600 italic">
                "Bridging Generations, Building Communities - Together We Achieve More"
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />

      {/* Sponsor Modal */}
      {selectedSponsor && (
        <SponsorModal sponsor={selectedSponsor} isOpen={!!selectedSponsor} onClose={() => setSelectedSponsor(null)} />
      )}
    </div>
  )
}
