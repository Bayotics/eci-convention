"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { RegisterHeader } from "@/components/sections/register-header"
import { Footer } from "@/components/sections/footer"
import { Calendar, AlertCircle, Loader2, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import ReCAPTCHA from "react-google-recaptcha"

export default function EconomicSessionPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const recaptchaRef = useRef<ReCAPTCHA>(null)

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    chapterName: "Non Member",
    gender: "",
    shirtSize: "",
    dietaryRestrictions: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      // Get reCAPTCHA token
      const recaptchaToken = recaptchaRef.current?.getValue()
      if (!recaptchaToken) {
        setError("Please complete the reCAPTCHA verification")
        setIsSubmitting(false)
        return
      }

      // Check if user already registered
      const checkResponse = await fetch("/api/registration/check-existing", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: formData.email }),
      })

      const checkData = await checkResponse.json()

      if (!checkResponse.ok) {
        setError(checkData.error || "Registration check failed")
        return
      }

      if (checkData.exists) {
        setError("You have already registered for this event")
        return
      }

      // Register for economic session
      const response = await fetch("/api/registration/save-registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          attendanceDays: ["economic-session"],
          registrationCategory: "adult", // Default for economic session
          membershipStatus: "non-member",
          registrationType: "economic-session-only",
          paymentId: "",
          recaptchaToken,
        }),
      })

      const result = await response.json()

      if (result.success) {
        setSuccess(true)
        setTimeout(() => {
          router.push("/register")
        }, 25000)
      } else {
        setError(result.error || "Registration failed")
        // Reset reCAPTCHA on error
        recaptchaRef.current?.reset()
      }
    } catch (error) {
      setError("Network error. Please try again.")
      // Reset reCAPTCHA on error
      recaptchaRef.current?.reset()
    } finally {
      setIsSubmitting(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-white">
        <RegisterHeader isScrolled={false} />

        <section className="py-20 bg-gradient-to-br from-green-500 to-teal-500 text-white min-h-screen flex items-center">
          <div className="container mx-auto px-4 mt-36 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-8">
                <Check className="h-12 w-12 text-white" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">Registration Successful!</h1>
              <p className="text-xl md:text-2xl mb-8 text-white/90">
                You're registered for the free Economic Development Session
              </p>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold mb-4">What's Next?</h3>
                <ul className="text-left space-y-3 text-white/90">
                  <li className="flex items-start space-x-3">
                    <Check className="h-5 w-5 text-green-300 mt-0.5 flex-shrink-0" />
                    <span>Check your email for confirmation details</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Check className="h-5 w-5 text-green-300 mt-0.5 flex-shrink-0" />
                    <span>Session details will be sent closer to the event date</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Check className="h-5 w-5 text-green-300 mt-0.5 flex-shrink-0" />
                    <span>You can upgrade to full convention access anytime</span>
                  </li>
                </ul>
              </div>
              <p className="mt-6 text-white/80">Redirecting you back to the main page...</p>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <RegisterHeader isScrolled={false} />

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 mt-36">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                Free Economic Development Session
              </h1>
              <p className="text-lg text-gray-600">Register for our complimentary economic session on Thursday</p>
            </motion.div>

            {/* Session Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8"
            >
              <div className="flex items-center space-x-3 mb-4">
                <Calendar className="h-6 w-6 text-green-600" />
                <h3 className="text-lg font-bold text-green-800">Session Details</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="font-medium text-green-700">Date:</span>
                  <p className="text-green-600">Friday, September 19, 2025</p>
                </div>
                <div>
                  <span className="font-medium text-green-700">Time:</span>
                  <p className="text-green-600">11:30 AM - 12:00 PM</p>
                </div>
                <div>
                  <span className="font-medium text-green-700">Cost:</span>
                  <p className="text-green-600 font-bold">FREE</p>
                </div>
              </div>
            </motion.div>

            {/* Registration Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-lg shadow-lg p-8"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Chapter Name</label>
                    <input
                      type="text"
                      name="chapterName"
                      value={formData.chapterName}
                      className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
                      disabled
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gender <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                      <option value="Prefer not to say">Prefer not to say</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Shirt Size <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="shirtSize"
                    value={formData.shirtSize}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select shirt size</option>
                    <option value="XS">XS</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                    <option value="XXL">XXL</option>
                    <option value="XXXL">XXXL</option>
                  </select>
                </div>

                {/* Session Selection - Read Only */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Session</label>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-green-600" />
                      <span className="font-medium text-gray-800">Economic Development Session</span>
                      <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">FREE</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Dietary Restrictions</label>
                  <textarea
                    name="dietaryRestrictions"
                    value={formData.dietaryRestrictions}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Please list any dietary restrictions, allergies, or special meal requirements..."
                  />
                </div>

                {/* reCAPTCHA */}
                <div className="flex justify-center">
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
                    theme="light"
                  />
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-start space-x-2">
                      <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                      <span className="text-red-600 text-sm">{error}</span>
                    </div>
                  </div>
                )}

                <div className="flex space-x-4 pt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                    className="flex-1 bg-transparent"
                    disabled={isSubmitting}
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Registering...
                      </>
                    ) : (
                      "Register for Free Session"
                    )}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
