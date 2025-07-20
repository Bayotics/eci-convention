"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { TopBar } from "@/components/sections/top-bar"
import { Header } from "@/components/sections/header"
import { Footer } from "@/components/sections/footer"
import { Mail, Phone, MapPin, ExternalLink, Star, Crown, Award, Heart, Users, Building, Globe, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"

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

// Sponsor data organized by tier
const sponsorData = {
  platinum: {
    title: "Platinum Sponsors",
    subtitle: "$50,000+",
    icon: Crown,
    color: "from-gray-300 to-gray-500",
    textColor: "text-gray-700",
    bgColor: "bg-gray-50",
    sponsors: [
      {
        id: "sponsor-1",
        name: "Lagos State Government",
        logo: "/placeholder.svg?height=120&width=300",
        website: "https://lagosstate.gov.ng",
        description: "Supporting community development and cultural preservation initiatives.",
        contribution: "Venue sponsorship and logistical support",
      },
      {
        id: "sponsor-2",
        name: "First Bank of Nigeria",
        logo: "/placeholder.svg?height=120&width=300",
        website: "https://firstbanknigeria.com",
        description: "Nigeria's premier financial institution supporting diaspora communities.",
        contribution: "Financial services and banking solutions",
      },
    ],
  },
  gold: {
    title: "Gold Sponsors",
    subtitle: "$25,000 - $49,999",
    icon: Award,
    color: "from-yellow-300 to-yellow-600",
    textColor: "text-yellow-700",
    bgColor: "bg-yellow-50",
    sponsors: [
      {
        id: "sponsor-3",
        name: "Nigerian National Petroleum Corporation",
        logo: "/placeholder.svg?height=100&width=250",
        website: "https://nnpc.gov.ng",
        description: "Leading energy company supporting Nigerian communities worldwide.",
        contribution: "Energy sector insights and networking opportunities",
      },
      {
        id: "sponsor-4",
        name: "Dangote Group",
        logo: "/placeholder.svg?height=100&width=250",
        website: "https://dangote.com",
        description: "Africa's largest industrial conglomerate promoting economic development.",
        contribution: "Business development and entrepreneurship programs",
      },
      {
        id: "sponsor-5",
        name: "United Bank for Africa",
        logo: "/placeholder.svg?height=100&width=250",
        website: "https://ubagroup.com",
        description: "Pan-African financial services group connecting Africa to the world.",
        contribution: "Financial literacy workshops and banking services",
      },
    ],
  },
  silver: {
    title: "Silver Sponsors",
    subtitle: "$10,000 - $24,999",
    icon: Star,
    color: "from-gray-400 to-gray-600",
    textColor: "text-gray-600",
    bgColor: "bg-gray-50",
    sponsors: [
      {
        id: "sponsor-6",
        name: "MTN Nigeria",
        logo: "/placeholder.svg?height=80&width=200",
        website: "https://mtnonline.com",
        description: "Leading telecommunications company connecting communities.",
        contribution: "Communication technology and connectivity solutions",
      },
      {
        id: "sponsor-7",
        name: "Guaranty Trust Bank",
        logo: "/placeholder.svg?height=80&width=200",
        website: "https://gtbank.com",
        description: "Innovative banking solutions for modern Nigeria.",
        contribution: "Digital banking workshops and financial services",
      },
      {
        id: "sponsor-8",
        name: "Nigerian Breweries",
        logo: "/placeholder.svg?height=80&width=200",
        website: "https://nbplc.com",
        description: "Celebrating Nigerian culture through quality beverages.",
        contribution: "Beverage services and cultural celebration support",
      },
      {
        id: "sponsor-9",
        name: "Shoprite Nigeria",
        logo: "/placeholder.svg?height=80&width=200",
        website: "https://shoprite.co.za",
        description: "Retail excellence supporting community events.",
        contribution: "Retail partnerships and community support",
      },
    ],
  },
  bronze: {
    title: "Bronze Sponsors",
    subtitle: "$5,000 - $9,999",
    icon: Heart,
    color: "from-orange-400 to-orange-600",
    textColor: "text-orange-600",
    bgColor: "bg-orange-50",
    sponsors: [
      {
        id: "sponsor-10",
        name: "Arik Air",
        logo: "/placeholder.svg?height=60&width=180",
        website: "https://arikair.com",
        description: "Nigeria's leading airline connecting people and places.",
        contribution: "Travel discounts for convention attendees",
      },
      {
        id: "sponsor-11",
        name: "Indomie Nigeria",
        logo: "/placeholder.svg?height=60&width=180",
        website: "https://indomie.com.ng",
        description: "Bringing families together through quality food products.",
        contribution: "Catering support and food services",
      },
      {
        id: "sponsor-12",
        name: "Glo Mobile",
        logo: "/placeholder.svg?height=60&width=180",
        website: "https://gloworld.com",
        description: "Telecommunications services for all Nigerians.",
        contribution: "Mobile communication services and data packages",
      },
      {
        id: "sponsor-13",
        name: "Zenith Bank",
        logo: "/placeholder.svg?height=60&width=180",
        website: "https://zenithbank.com",
        description: "Banking excellence and financial inclusion.",
        contribution: "Banking services and financial advisory",
      },
      {
        id: "sponsor-14",
        name: "Coca-Cola Nigeria",
        logo: "/placeholder.svg?height=60&width=180",
        website: "https://coca-cola.com.ng",
        description: "Refreshing moments and community support.",
        contribution: "Beverage sponsorship and refreshment services",
      },
      {
        id: "sponsor-15",
        name: "Access Bank",
        logo: "/placeholder.svg?height=60&width=180",
        website: "https://accessbankplc.com",
        description: "Banking made simple and accessible for all.",
        contribution: "Financial services and digital banking solutions",
      },
    ],
  },
  community: {
    title: "Community Partners",
    subtitle: "In-Kind & Service Sponsors",
    icon: Users,
    color: "from-teal-400 to-teal-600",
    textColor: "text-teal-600",
    bgColor: "bg-teal-50",
    sponsors: [
      {
        id: "sponsor-16",
        name: "Newark Tourism Board",
        logo: "/placeholder.svg?height=60&width=180",
        website: "https://newark.com",
        description: "Promoting Newark as a premier destination for events and tourism.",
        contribution: "Local tourism support and city partnerships",
      },
      {
        id: "sponsor-17",
        name: "Nigerian Consulate New York",
        logo: "/placeholder.svg?height=60&width=180",
        website: "https://nigerianconsulateny.org",
        description: "Diplomatic support for Nigerian diaspora communities.",
        contribution: "Diplomatic services and community liaison",
      },
      {
        id: "sponsor-18",
        name: "African Cultural Center",
        logo: "/placeholder.svg?height=60&width=180",
        website: "https://africanculturalcenter.org",
        description: "Preserving and promoting African culture in America.",
        contribution: "Cultural programming and artistic performances",
      },
      {
        id: "sponsor-19",
        name: "New Jersey Chamber of Commerce",
        logo: "/placeholder.svg?height=60&width=180",
        website: "https://njchamber.com",
        description: "Supporting business development and economic growth.",
        contribution: "Business networking and economic development support",
      },
    ],
  },
}

const sponsorshipPackages = [
  {
    level: "Platinum",
    amount: "$50,000+",
    color: "from-gray-300 to-gray-500",
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
    benefits: ["Logo in program booklet", "2 complimentary registrations", "Website listing", "Social media mentions"],
  },
]

export default function SponsorsPage() {
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

      {/* Hero/Banner Section */}
      <section
        className={`relative bg-gradient-to-br from-purple-600 via-blue-600 to-teal-500 text-white py-32 ${isScrolled ? "pt-44" : ""}`}
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

      {/* Sponsors by Tier */}
      {Object.entries(sponsorData).map(([tier, tierData], tierIndex) => {
        const IconComponent = tierData.icon
        return (
          <section key={tier} className={`py-20 ${tierIndex % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <div className="flex items-center justify-center mb-6">
                  <div className={`p-4 rounded-full bg-gradient-to-r ${tierData.color} mr-4`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800">{tierData.title}</h2>
                    <p className={`text-lg ${tierData.textColor} font-medium`}>{tierData.subtitle}</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className={`grid grid-cols-1 ${
                  tier === "platinum"
                    ? "md:grid-cols-2"
                    : tier === "gold"
                      ? "md:grid-cols-2 lg:grid-cols-3"
                      : "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                } gap-8`}
              >
                {tierData.sponsors.map((sponsor, index) => (
                  <motion.div
                    key={sponsor.id}
                    variants={fadeInUp}
                    className={`${tierData.bgColor} p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}
                  >
                    <div className="text-center">
                      <div className="bg-white p-6 rounded-lg mb-6 shadow-sm">
                        <img
                          src={sponsor.logo || "/placeholder.svg"}
                          alt={`${sponsor.name} logo`}
                          className="w-full h-auto max-h-20 object-contain mx-auto"
                        />
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-3">{sponsor.name}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed mb-4">{sponsor.description}</p>
                      <div className={`${tierData.bgColor} p-3 rounded-lg mb-4`}>
                        <p className={`text-xs ${tierData.textColor} font-medium`}>
                          <strong>Contribution:</strong> {sponsor.contribution}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className={`border-gray-300 text-gray-600 hover:bg-gray-100 bg-transparent`}
                        onClick={() => window.open(sponsor.website, "_blank")}
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Visit Website
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>
        )
      })}

      {/* Sponsorship Opportunities */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-teal-50">
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
            {sponsorshipPackages.map((pkg, index) => (
              <motion.div
                key={pkg.level}
                variants={fadeInUp}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className={`h-4 bg-gradient-to-r ${pkg.color}`}></div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{pkg.level}</h3>
                  <p className="text-3xl font-bold text-purple-600 mb-6">{pkg.amount}</p>
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
            ))}
          </motion.div>
        </div>
      </section>

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
                  <div className="flex items-start space-x-4">
                    <Eye className="h-6 w-6 text-yellow-300 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-white mb-2">Brand Visibility</h4>
                      <p className="text-purple-100">
                        Extensive marketing exposure through digital platforms, print materials, and event signage.
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
                    <p className="text-purple-100">sponsors@eciconvention.org</p>
                    <p className="text-purple-100">partnerships@eciconvention.org</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Phone className="h-6 w-6 text-yellow-300 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-white mb-1">Phone</h4>
                    <p className="text-purple-100">+1 (555) 123-4567</p>
                    <p className="text-purple-100">+1 (555) 987-6543</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-yellow-300 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-white mb-1">Address</h4>
                    <p className="text-purple-100">
                      ECI Sponsorship Department
                      <br />
                      123 Convention Plaza
                      <br />
                      Newark, NJ 07102
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/20">
                <h4 className="font-bold text-white mb-4">Sponsorship Coordinator</h4>
                <p className="text-purple-100 mb-2">
                  <strong>Mrs. Adunni Ogundimu</strong>
                </p>
                <p className="text-purple-100 mb-2">Director of Corporate Relations</p>
                <p className="text-purple-100">adunni.ogundimu@eciconvention.org</p>
                <p className="text-purple-100">+1 (555) 234-5678</p>
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
    </div>
  )
}
