"use client"

import type React from "react"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { TopBar } from "@/components/sections/top-bar"
import { Header } from "@/components/sections/header"
import { Footer } from "@/components/sections/footer"
import { Edit, Check, AlertCircle, Loader2, Mail, User, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

const chapterOptions = [
  "Atlanta",
  "Austin",
  "California",
  "Dallas",
  "DC Metro",
  "Delaware Valley",
  "Detroit",
  "Eko Lagosians of Canada",
  "Florida",
  "Houston",
  "Eko club Houston Women",
  "London",
  "Louisiana",
  "Miami",
  "Minnesota",
  "Eko Lagosians of Minnesota",
  "New Jersey",
  "New York",
  "Ohio",
  "Pennsylvania",
  "Philadelphia",
  "Rhode Island",
  "San Antonio",
  "Lagosians of Chicago",
]

function PreviewPageContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState("")
  const [registration, setRegistration] = useState<any>(null)
  const [editData, setEditData] = useState<any>({})

  const email = searchParams.get("email") || ""

  useEffect(() => {
    if (email) {
      fetchRegistration()
    }
  }, [email])

  const fetchRegistration = async () => {
    try {
      const response = await fetch(`/api/registration/get-registration?email=${encodeURIComponent(email)}`)
      const data = await response.json()

      if (data.success) {
        setRegistration(data.registration)
        setEditData(data.registration)
      } else {
        setError("Registration not found")
      }
    } catch (error) {
      setError("Failed to load registration")
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = () => {
    setIsEditing(true)
    setError("")
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditData(registration)
    setError("")
  }

  const handleSave = async () => {
    setIsSaving(true)
    setError("")

    try {
      const response = await fetch("/api/registration/update-registration", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          ...editData,
        }),
      })

      const result = await response.json()

      if (result.success) {
        setRegistration(editData)
        setIsEditing(false)
      } else {
        setError(result.error || "Failed to update registration")
      }
    } catch (error) {
      setError("Network error. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setEditData((prev: any) => ({ ...prev, [name]: value }))
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

  if (!registration) {
    return (
      <div className="min-h-screen bg-white">
        <TopBar isScrolled={false} />
        <Header isScrolled={false} />
        <section className="py-20 bg-gray-50 min-h-screen flex items-center">
          <div className="container mx-auto px-4 text-center">
            <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-md mx-auto">
              <AlertCircle className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-red-800 mb-4">Registration Not Found</h2>
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
              <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-teal-600 bg-clip-text text-transparent">
                Registration Preview
              </h1>
              <p className="text-lg text-gray-600">
                {isEditing ? "Edit your registration details" : "Review and manage your registration"}
              </p>
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
                  <p className="text-green-600 capitalize">
                    {registration.registrationType === "economic-session-only" ? "Economic Session" : "Full Convention"}
                  </p>
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
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Registration Details</h2>
                {!isEditing && (
                  <Button onClick={handleEdit} className="bg-purple-600 hover:bg-purple-700 text-white">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Details
                  </Button>
                )}
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <span className="text-red-600 text-sm">{error}</span>
                  </div>
                </div>
              )}

              {isEditing ? (
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={editData.firstName}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={editData.lastName}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      value={editData.email}
                      className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50"
                      disabled
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Chapter Name</label>
                      <select
                        name="chapterName"
                        value={editData.chapterName}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        {chapterOptions.map((chapter) => (
                          <option key={chapter} value={chapter}>
                            {chapter}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                      <select
                        name="gender"
                        value={editData.gender}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                        <option value="Prefer not to say">Prefer not to say</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Shirt Size</label>
                      <select
                        name="shirtSize"
                        value={editData.shirtSize}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
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
                      <label className="block text-sm font-medium text-gray-700 mb-2">Registration Category</label>
                      <select
                        name="registrationCategory"
                        value={editData.registrationCategory}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        <option value="youth">Youth (10-17 years)</option>
                        <option value="adult">Adult (18-69 years)</option>
                        <option value="senior">Senior (70+ years)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Dietary Restrictions</label>
                    <textarea
                      name="dietaryRestrictions"
                      value={editData.dietaryRestrictions}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Please list any dietary restrictions, allergies, or special meal requirements..."
                    />
                  </div>

                  <div className="flex space-x-4 pt-6">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleCancel}
                      className="flex-1 bg-transparent"
                      disabled={isSaving}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="button"
                      onClick={handleSave}
                      className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
                      disabled={isSaving}
                    >
                      {isSaving ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        "Save Changes"
                      )}
                    </Button>
                  </div>
                </form>
              ) : (
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
                        <span
                          key={day}
                          className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium"
                        >
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
              )}
            </motion.div>

            {/* Action Buttons */}
            {!isEditing && (
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
                    className="border-purple-600 text-purple-600 hover:bg-purple-50 bg-transparent"
                  >
                    Print Registration
                  </Button>
                  <Button onClick={() => router.push("/")} className="bg-purple-600 hover:bg-purple-700 text-white">
                    Back to Homepage
                  </Button>
                </div>
                <p className="text-sm text-gray-600">
                  Need help? Contact us at{" "}
                  <a href="mailto:info@eciconvention.org" className="text-purple-600 hover:underline">
                    info@eciconvention.org
                  </a>
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default function PreviewPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PreviewPageContent />
    </Suspense>
  )
}
