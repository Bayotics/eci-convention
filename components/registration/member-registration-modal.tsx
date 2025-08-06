"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Mail, BadgeIcon as IdCard, AlertCircle, Loader2, Phone, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface MemberRegistrationModalProps {
  isOpen: boolean
  onClose: () => void
}

const countryCodes = [
  { code: "+1", country: "US", flag: "🇺🇸" },
  { code: "+44", country: "UK", flag: "🇬🇧" },
  { code: "+234", country: "NG", flag: "🇳🇬" },
  { code: "+1", country: "CA", flag: "🇨🇦" },
  { code: "+33", country: "FR", flag: "🇫🇷" },
  { code: "+49", country: "DE", flag: "🇩🇪" },
  { code: "+91", country: "IN", flag: "🇮🇳" },
  { code: "+86", country: "CN", flag: "🇨🇳" },
  { code: "+81", country: "JP", flag: "🇯🇵" },
  { code: "+61", country: "AU", flag: "🇦🇺" },
  { code: "+27", country: "ZA", flag: "🇿🇦" },
  { code: "+55", country: "BR", flag: "🇧🇷" },
  { code: "+52", country: "MX", flag: "🇲🇽" },
  { code: "+7", country: "RU", flag: "🇷🇺" },
  { code: "+82", country: "KR", flag: "🇰🇷" },
  { code: "+39", country: "IT", flag: "🇮🇹" },
  { code: "+34", country: "ES", flag: "🇪🇸" },
  { code: "+31", country: "NL", flag: "🇳🇱" },
  { code: "+46", country: "SE", flag: "🇸🇪" },
  { code: "+47", country: "NO", flag: "🇳🇴" },
]

export function MemberRegistrationModal({ isOpen, onClose }: MemberRegistrationModalProps) {
  const [email, setEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [countryCode, setCountryCode] = useState("+234")
  const [membershipId, setMembershipId] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [usePhoneNumber, setUsePhoneNumber] = useState(false)
  const [showCountryDropdown, setShowCountryDropdown] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      let requestData

      if (usePhoneNumber) {
        const fullPhoneNumber = `${countryCode}${phoneNumber}`

        // First check if phone number exists in database
        const phoneCheckResponse = await fetch("/api/registration/check-phone", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ phoneNumber: fullPhoneNumber }),
        })

        const phoneCheckData = await phoneCheckResponse.json()

        if (!phoneCheckResponse.ok) {
          setError(phoneCheckData.error || "Phone number not found in our records")
          return
        }

        // If phone number exists, use the retrieved email
        requestData = {
          email: phoneCheckData.email,
          membershipId,
          phoneNumber: fullPhoneNumber,
        }
      } else {
        requestData = { email, membershipId }
      }

      const response = await fetch("/api/registration/check-member", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || "An error occurred")
        return
      }

      // Handle different scenarios based on response
      if (data.redirect) {
        router.push(data.redirect)
        onClose()
      }
    } catch (error) {
      setError("Network error. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    setEmail("")
    setPhoneNumber("")
    setCountryCode("+234")
    setMembershipId("")
    setError("")
    setUsePhoneNumber(false)
    setShowCountryDropdown(false)
    onClose()
  }

  const toggleInputType = () => {
    setUsePhoneNumber(!usePhoneNumber)
    setError("")
    setEmail("")
    setPhoneNumber("")
    setShowCountryDropdown(false)
  }

  const handleCountrySelect = (code: string) => {
    setCountryCode(code)
    setShowCountryDropdown(false)
  }

  const selectedCountry = countryCodes.find((c) => c.code === countryCode)

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-lg max-w-md w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Member Registration</h2>
              <button onClick={handleClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Toggle Button */}
            <div className="mb-4">
              <button
                type="button"
                onClick={toggleInputType}
                className="text-purple-600 hover:text-purple-700 text-sm font-medium underline transition-colors"
              >
                {usePhoneNumber ? "Register with email instead" : "Register with Phone number Instead"}
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {usePhoneNumber ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="flex">
                    {/* Country Code Dropdown */}
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                        className="flex items-center px-3 py-3 border border-r-0 border-gray-300 rounded-l-lg bg-gray-50 hover:bg-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                      >
                        <span className="mr-1">{selectedCountry?.flag}</span>
                        <span className="text-sm font-medium">{countryCode}</span>
                        <ChevronDown className="h-4 w-4 ml-1 text-gray-400" />
                      </button>

                      {/* Dropdown Menu */}
                      {showCountryDropdown && (
                        <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                          {countryCodes.map((country, index) => (
                            <button
                              key={`${country.code}-${country.country}-${index}`}
                              type="button"
                              onClick={() => handleCountrySelect(country.code)}
                              className="w-full flex items-center px-3 py-2 text-left hover:bg-gray-100 transition-colors"
                            >
                              <span className="mr-2">{country.flag}</span>
                              <span className="text-sm font-medium mr-2">{country.code}</span>
                              <span className="text-sm text-gray-600">{country.country}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Phone Number Input */}
                    <div className="relative flex-1">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value.replace(/[^0-9]/g, ""))}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Enter phone number"
                        required
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Enter your email address"
                      required
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Membership ID <span className="text-gray-400">(Optional)</span>
                </label>
                <div className="relative">
                  <IdCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={membershipId}
                    onChange={(e) => setMembershipId(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter your membership ID (if available)"
                  />
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <span className="text-red-600 text-sm">{error} {" "}<a className="text-black underline" href="https://eko-club-international.vercel.app/login" target="_blank">Click here to go to the Membership Page </a></span>
                  </div>
                </div>
              )}

              <div className="flex space-x-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  className="flex-1 bg-transparent"
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Checking...
                    </>
                  ) : (
                    "Continue"
                  )}
                </Button>
              </div>
            </form>

            <div className="mt-6 p-4 bg-purple-50 rounded-lg">
              <p className="text-sm text-purple-700">
                <strong>Note:</strong> We'll check your {usePhoneNumber ? "phone number" : "email"} and membership
                status to direct you to the appropriate registration flow.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
