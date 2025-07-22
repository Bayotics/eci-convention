"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { TopBar } from "@/components/sections/top-bar"
import { Header } from "@/components/sections/header"
import { Footer } from "@/components/sections/footer"
import { Check, AlertCircle, Loader2, Mail, User, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

function GuestPreviewContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [registration, setRegistration] = useState<any>(null)

  const email = searchParams.get("email") || ""

  useEffect(() => {
    if (email) {
      // Check localStorage for guest session
      const guestSession = localStorage.getItem("guestRegistration")
      if (guestSession) {
        const session = JSON.parse(guestSession)
        if (session.email === email && Date.now() - session.timestamp < 24 * 60 * 60 * 1000) {
          // Session valid for 24 hours
          fetchRegistration()
        } else {
          setError("Session expired. Please register again.")
          setIsLoading(false)
        }
      } else {
        setError("Access denied. Please complete registration first.")
        setIsLoading(false)
      }
    }
  }, [email])

  const fetchRegistration = async () => {
    try {
      const response = await fetch(`/api/registration/get-registration?email=${encodeURIComponent(email)}`)
      const data = await response.json()

      if (data.success) {
        setRegistration(data.registration)
      } else {
        setError("Registration not found")
      }
    } catch (error) {
      setError("Failed to load registration")
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Loading registration details...</p>
        </div>
      </div>
    )
  }

  if (!registration || error) {
    return (
      <div className="min-h-screen bg-white">
        <TopBar isScrolled={false} />
        <Header isScrolled={false} />
        <section className="py-20 bg-gray-50 min-h-screen flex items-center">
          <div className="container mx-auto px-4 text-center">
            <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-md mx-auto">
              <AlertCircle className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-red-800 mb-4">Access Error</h2>
              <p className="text-red-600 mb-6">{error}</p>
              <Button onClick={() => router.push("/register")} className="bg-red-600 hover:bg-red-700 text-white">
                Back to Registration
              </Button>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <TopBar isScrolled={false} />
      <Header isScrolled={false} />

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                Guest Registration Confirmed
              </h1>
              <p className="text-lg text-gray-600">Your registration details for ECI@25</p>
            </motion.div>

            {/* Registration Status */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8"
            >
              <div className="flex items-center space-x-3 mb-4">
                <Check className="h-6 w-6 text-green-600" />
                <h3 className="text-lg font-bold text-green-800">Registration Confirmed</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="font-medium text-green-700">Registration ID:</span>
                  <p className="text-green-600 font-mono">{registration.registrationId}</p>
                </div>
                <div>
                  <span className="font-medium text-green-700">Status:</span>
                  <p className="text-green-600 capitalize">{registration.registrationStatus}</p>
                </div>
                <div>
                  <span className="font-medium text-green-700">Type:</span>
                  <p className="text-green-600">Guest Registration</p>
                </div>
              </div>
            </motion.div>

            {/* Registration Details */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-lg shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Registration Details</h2>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center space-x-3">
                    <User className="h-5 w-5 text-gray-500" />
                    <div>
                      <span className="text-sm font-medium text-gray-500">Name</span>
                      <p className="text-gray-800">
                        {registration.firstName} {registration.lastName}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-gray-500" />
                    <div>
                      <span className="text-sm font-medium text-gray-500">Email</span>
                      <p className="text-gray-800">{registration.email}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-gray-500" />
                    <div>
                      <span className="text-sm font-medium text-gray-500">Chapter</span>
                      <p className="text-gray-800">{registration.chapterName}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <User className="h-5 w-5 text-gray-500" />
                    <div>
                      <span className="text-sm font-medium text-gray-500">Gender</span>
                      <p className="text-gray-800">{registration.gender}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <span className="text-sm font-medium text-gray-500">Shirt Size</span>
                    <p className="text-gray-800">{registration.shirtSize}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Category</span>
                    <p className="text-gray-800 capitalize">{registration.registrationCategory}</p>
                  </div>
                </div>

                <div>
                  <span className="text-sm font-medium text-gray-500">Attendance Days</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {registration.attendanceDays.map((day: string) => (
                      <span key={day} className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-sm font-medium">
                        {day === "economic-session" ? "Economic Session" : day.charAt(0).toUpperCase() + day.slice(1)}
                      </span>
                    ))}
                  </div>
                </div>

                {registration.dietaryRestrictions && (
                  <div>
                    <span className="text-sm font-medium text-gray-500">Dietary Restrictions</span>
                    <p className="text-gray-800 mt-1">{registration.dietaryRestrictions}</p>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Important Information */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6"
            >
              <h3 className="text-lg font-bold text-blue-800 mb-4">Important Information</h3>
              <ul className="space-y-2 text-blue-700 text-sm">
                <li>• Save this page or take a screenshot for your records</li>
                <li>• Check your email for confirmation and additional details</li>
                <li>• Convention materials will be available at registration</li>
                <li>• Bring a valid ID for check-in at the venue</li>
                <li>• Contact us if you need to make any changes</li>
              </ul>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mt-8 text-center space-y-4"
            >
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => window.print()}
                  variant="outline"
                  className="border-teal-600 text-teal-600 hover:bg-teal-50 bg-transparent"
                >
                  Print Registration
                </Button>
                <Button onClick={() => router.push("/")} className="bg-teal-600 hover:bg-teal-700 text-white">
                  Back to Homepage
                </Button>
              </div>
              <p className="text-sm text-gray-600">
                Need help? Contact us at{" "}
                <a href="mailto:info@eciconvention.org" className="text-teal-600 hover:underline">
                  info@eciconvention.org
                </a>
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default function GuestPreviewPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GuestPreviewContent />
    </Suspense>
  )
}
