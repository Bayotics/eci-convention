"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { TopBar } from "@/components/sections/top-bar"
import { Header } from "@/components/sections/header"
import { Footer } from "@/components/sections/footer"
import { Users, UserPlus, Edit, Home, CreditCard, Calendar, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MemberRegistrationModal } from "@/components/registration/member-registration-modal"
import { NonMemberRegistrationModal } from "@/components/registration/non-member-registration-modal"
import { ModifyRegistrationModal } from "@/components/registration/modify-registration-modal"
import Link from "next/link"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

export default function RegisterPage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [showMemberModal, setShowMemberModal] = useState(false)
  const [showNonMemberModal, setShowNonMemberModal] = useState(false)
  const [showModifyModal, setShowModifyModal] = useState(false)

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

      {/* Hero Section */}
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
              Join us for this historic celebration
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 text-white drop-shadow-lg leading-tight"
            >
              Register for ECI@25
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg md:text-xl text-white/90 leading-relaxed max-w-3xl"
            >
              Choose your registration path below. Whether you're an ECI member or joining us as a guest, we have
              options tailored for you.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Main Registration Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Two Section Layout */}
          <div className="flex flex-col lg:flex-row gap-12 max-w-7xl mx-auto">
            {/* Registration Section */}
            <div className="flex-1">
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-teal-600 bg-clip-text text-transparent text-center">
                  Event Registration
                </h2>
                <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto">
                  Select your registration option below based on your membership status
                </p>
              </motion.div>

              <div className="space-y-6">
                {/* Register as Member Card */}
                <motion.div
                  variants={fadeInUp}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow cursor-pointer border-l-4 border-purple-500"
                  onClick={() => setShowMemberModal(true)}
                >
                  <div className="flex items-center space-x-6">
                    <div className="bg-purple-100 p-4 rounded-full">
                      <Users className="h-8 w-8 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">Register as an ECI Member</h3>
                      <p className="text-gray-600 mb-4">
                        Already an ECI member? Register with your member benefits and discounted rates.
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <CreditCard className="h-4 w-4" />
                          <span>Member Pricing</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>Full Access</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-purple-600">
                      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </motion.div>

                {/* Register as Non-Member Card */}
                <motion.div
                  variants={fadeInUp}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow cursor-pointer border-l-4 border-teal-500"
                  onClick={() => setShowNonMemberModal(true)}
                >
                  <div className="flex items-center space-x-6">
                    <div className="bg-teal-100 p-4 rounded-full">
                      <UserPlus className="h-8 w-8 text-teal-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">Register as a Guest</h3>
                      <p className="text-gray-600 mb-4">
                        New to ECI? Join us as a guest or register for our free economic session.
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>Multiple Options</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span>Guest Pricing</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-teal-600">
                      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </motion.div>

                {/* Modify/Cancel Registration Card */}
                <motion.div
                  variants={fadeInUp}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow cursor-pointer border-l-4 border-orange-500"
                  onClick={() => setShowModifyModal(true)}
                >
                  <div className="flex items-center space-x-6">
                    <div className="bg-orange-100 p-4 rounded-full">
                      <Edit className="h-8 w-8 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">Modify / Cancel Existing Registration</h3>
                      <p className="text-gray-600 mb-4">
                        Already registered? View, edit, or cancel your existing registration.
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Edit className="h-4 w-4" />
                          <span>Edit Details</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Mail className="h-4 w-4" />
                          <span>Email Lookup</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-orange-600">
                      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Housing Section */}
            <div className="flex-1">
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent text-center">
                  Housing & Accommodation
                </h2>
                <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto">
                  Find the perfect accommodation for your stay in Newark
                </p>
              </motion.div>

              <div className="space-y-6">
                {/* Official Hotel Card */}
                <motion.div
                  variants={fadeInUp}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-pink-500"
                >
                  <div className="flex items-center space-x-6">
                    <div className="bg-pink-100 p-4 rounded-full">
                      <Home className="h-8 w-8 text-pink-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">Official Convention Hotel</h3>
                      <p className="text-gray-600 mb-4">
                        DoubleTree by Hilton Newark Airport - Special ECI@25 group rates available
                      </p>
                      <div className="space-y-2 text-sm text-gray-600">
                        <p>
                          <strong>Group Code:</strong> ECI25
                        </p>
                        <p>
                          <strong>Rate:</strong> $235/night
                        </p>
                        <p>
                          <strong>Includes:</strong> Free WiFi, Airport Shuttle
                        </p>
                      </div>
                      <Button className="mt-4 bg-pink-600 hover:bg-pink-700 text-white">
                       <Link target="_blank" href={'https://www.hilton.com/en/book/reservation/rooms/?ctyhocn=EWRNADT&arrivalDate=2025-09-18&departureDate=2025-09-21&groupCode=CDTECI&room1NumAdults=1&cid=OM%2CWW%2CHILTONLINK%2CEN%2CDirectLink'}>
                        Book Now
                       </Link>
                      </Button>
                    </div>
                  </div>
                </motion.div>

                {/* Alternative Hotels Card */}
                <motion.div
                  variants={fadeInUp}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-orange-500"
                >
                  <div className="flex items-center space-x-6">
                    <div className="bg-orange-100 p-4 rounded-full">
                      <Home className="h-8 w-8 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">Alternative Accommodations</h3>
                      <p className="text-gray-600 mb-4">
                        Explore other nearby hotels and accommodation options in the Newark area
                      </p>
                      <div className="space-y-2 text-sm text-gray-600">
                        <p>• Marriott Newark Airport</p>
                        <p>• Hampton Inn & Suites</p>
                        <p>• Courtyard Newark Airport</p>
                        <p>• Holiday Inn Express</p>
                      </div>
                      <Button
                        variant="outline"
                        className="mt-4 border-orange-600 text-orange-600 hover:bg-orange-50 bg-transparent"
                      >
                        <Link target="_blank" href={'https://www.rome2rio.com/s/Hotels-Near/DoubleTree-by-Hilton-Hotel-Newark-Airport?source=adwords&gad_source=1&gad_campaignid=21441945537&gbraid=0AAAAADm27_bK4r1CGKBOWtQTwwzIn_szm&gclid=CjwKCAjw1ozEBhAdEiwAn9qbzV2avXt1wXHRCVimm83a0l8C3X0mFxDuUocyFMoVUY8i2gPeYpVExxoCctoQAvD_BwE'}>
                          View Options
                        </Link>
                      </Button>
                    </div>
                  </div>
                </motion.div>
                {/* Housing Assistance Card */}
                {/* <motion.div
                  variants={fadeInUp}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-blue-500"
                >
                  <div className="flex items-center space-x-6">
                    <div className="bg-blue-100 p-4 rounded-full">
                      <Users className="h-8 w-8 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">Housing Assistance</h3>
                      <p className="text-gray-600 mb-4">
                        Need help finding accommodation? Our housing committee is here to assist you
                      </p>
                      <div className="space-y-2 text-sm text-gray-600">
                        <p>• Room sharing opportunities</p>
                        <p>• Local host families</p>
                        <p>• Budget-friendly options</p>
                        <p>• Transportation coordination</p>
                      </div>
                      <Button
                        variant="outline"
                        className="mt-4 border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent"
                      >
                        Get Assistance
                      </Button>
                    </div>
                  </div>
                </motion.div> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modals */}
      <MemberRegistrationModal isOpen={showMemberModal} onClose={() => setShowMemberModal(false)} />
      <NonMemberRegistrationModal isOpen={showNonMemberModal} onClose={() => setShowNonMemberModal(false)} />
      <ModifyRegistrationModal isOpen={showModifyModal} onClose={() => setShowModifyModal(false)} />
      <Footer />
    </div>
  )
}
