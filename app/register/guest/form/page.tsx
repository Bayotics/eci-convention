"use client"

import type React from "react"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { RegisterHeader } from "@/components/sections/register-header"
import { Footer } from "@/components/sections/footer"
import { Check, AlertCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"


function GuestFormContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [paymentInfo, setPaymentInfo] = useState<any>(null)

  const email = searchParams.get("email") || ""

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: email,
    chapterName: "Non Member",
    gender: "",
    shirtSize: "",
    attendanceDays: [] as string[],
    registrationCategory: "",
    dietaryRestrictions: "",
  })

  useEffect(() => {
    if (email) {
      fetchPaymentInfo()
    }
  }, [email])

  const fetchPaymentInfo = async () => {
    try {
      const response = await fetch(`/api/registration/get-payment?email=${encodeURIComponent(email)}`)
      const data = await response.json()

      if (data.success) {
        setPaymentInfo(data.payment)
        setFormData((prev) => ({
          ...prev,
          attendanceDays: data.payment.attendanceDays,
        }))
      } else {
        setError("Payment information not found")
      }
    } catch (error) {
      setError("Failed to load payment information")
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      const response = await fetch("/api/registration/save-registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          membershipStatus: "non-member",
          registrationType: "full-convention",
          paymentId: paymentInfo?.paymentId,
        }),
      })

      const result = await response.json()

      if (result.success) {
        // Save to localStorage for guest access
        localStorage.setItem(
          "guestRegistration",
          JSON.stringify({
            email,
            registrationId: result.registrationId,
            timestamp: Date.now(),
          }),
        )
        router.push(`/register/guest/preview?email=${encodeURIComponent(email)}`)
      } else {
        setError(result.error || "Registration failed")
      }
    } catch (error) {
      setError("Network error. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Loading payment information...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <RegisterHeader isScrolled={false} />

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
                Guest Registration Form
              </h1>
              <p className="text-lg text-gray-600">Complete your registration for ECI@25 as our guest</p>
            </motion.div>

            {/* Payment Confirmation */}
            {paymentInfo && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <Check className="h-6 w-6 text-green-600" />
                  <h3 className="text-lg font-bold text-green-800">Payment Confirmed</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-green-700">Amount Paid:</span>
                    <p className="text-green-600">${paymentInfo.amount}</p>
                  </div>
                  <div>
                    <span className="font-medium text-green-700">Ticket Type:</span>
                    <p className="text-green-600">{paymentInfo.ticketType}</p>
                  </div>
                  <div>
                    <span className="font-medium text-green-700">Days Included:</span>
                    <p className="text-green-600">{paymentInfo.attendanceDays.join(", ")}</p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Registration Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-lg shadow-lg p-8"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
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
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
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
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50"
                    disabled
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
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Shirt Size <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="shirtSize"
                      value={formData.shirtSize}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
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
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Registration Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="registrationCategory"
                      value={formData.registrationCategory}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select category</option>
                      <option value="youth">Youth (10-17 years)</option>
                      <option value="adult">Adult (18-69 years)</option>
                      <option value="senior">Senior (70+ years)</option>
                    </select>
                  </div>
                </div>

                {/* Attendance Days - Read Only */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Attendance Days</label>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2">Based on your ticket purchase:</p>
                    <div className="flex flex-wrap gap-2">
                      {formData.attendanceDays.map((day) => (
                        <span
                          key={day}
                          className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {day.charAt(0).toUpperCase() + day.slice(1)}
                        </span>
                      ))}
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
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Please list any dietary restrictions, allergies, or special meal requirements..."
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
                    className="flex-1 bg-teal-600 hover:bg-teal-700 text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Registering...
                      </>
                    ) : (
                      "Complete Registration"
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

export default function GuestFormPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GuestFormContent />
    </Suspense>
  )
}
