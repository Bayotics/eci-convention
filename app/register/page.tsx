"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { TopBar } from "@/components/sections/top-bar"
import { Header } from "@/components/sections/header"
import { Footer } from "@/components/sections/footer"
import { Calendar, Users, Star, Crown, Award, Shield, Check, AlertCircle, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"

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

// Ticket types and pricing
const ticketTypes = [
  {
    id: "youth",
    name: "Youth Pass",
    price: 200,
    icon: Star,
    color: "from-green-400 to-green-600",
    description: "Special rate for youth aged 10-17 years (ID verification required)",
    ageRange: "10 Years to 17 Years",
    benefits: [
      "Access to all 5 days of events",
      "Youth-focused sessions and activities",
      "Standard seating at all sessions",
      "Welcome gift bag",
      "Mentorship opportunities",
      "Certificate of participation",
    ],
  },
  {
    id: "adult",
    name: "Adult Pass",
    price: 250,
    icon: Users,
    color: "from-blue-400 to-blue-600",
    description: "Standard rate for adults aged 18-69 years",
    ageRange: "18 Years to 69 Years",
    benefits: [
      "Access to all 5 days of events",
      "All main sessions and workshops",
      "Standard seating at all sessions",
      "Welcome gift bag",
      "Networking opportunities",
      "Certificate of participation",
    ],
  },
  {
    id: "senior",
    name: "Senior Pass",
    price: 225,
    icon: Crown,
    color: "from-purple-400 to-purple-600",
    description: "Discounted rate for seniors aged 70 years and above",
    ageRange: "70 Years and above",
    benefits: [
      "Access to all 5 days of events",
      "Priority seating arrangements",
      "Senior-focused sessions",
      "Welcome gift bag",
      "Special assistance available",
      "Certificate of participation",
    ],
  },
]

export default function RegisterPage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [selectedTicket, setSelectedTicket] = useState("")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    chapterName: "",
    gender: "",
    shirtSize: "",
    attendanceDays: [] as string[],
    registrationCategory: "",
    dietaryRestrictions: "",
  })
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showPayment, setShowPayment] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const [paymentError, setPaymentError] = useState("")
  const [registrationId, setRegistrationId] = useState("")
  const [emailSent, setEmailSent] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required"
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid"
    if (!formData.chapterName) newErrors.chapterName = "Chapter name is required"
    if (!formData.gender) newErrors.gender = "Gender is required"
    if (!formData.shirtSize) newErrors.shirtSize = "Shirt size is required"
    if (formData.attendanceDays.length === 0) newErrors.attendanceDays = "Please select at least one day to attend"
    if (!formData.registrationCategory) newErrors.registrationCategory = "Please select a registration category"
    if (!agreeToTerms) newErrors.agreeToTerms = "You must agree to the terms and conditions"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      setShowPayment(true)
      setPaymentError("") // Clear any previous errors
      // Scroll to payment section
      setTimeout(() => {
        const paymentSection = document.getElementById("payment-section")
        if (paymentSection) {
          paymentSection.scrollIntoView({ behavior: "smooth" })
        }
      }, 100)
    }
  }

  const getTicketPrice = () => {
    const prices = { youth: 200, adult: 250, senior: 225 }
    return prices[formData.registrationCategory as keyof typeof prices] || 0
  }

  const selectedTicketData = formData.registrationCategory
    ? {
        name: `${formData.registrationCategory.charAt(0).toUpperCase() + formData.registrationCategory.slice(1)} Pass`,
        price: getTicketPrice(),
        description: `Registration for ${formData.attendanceDays.length} day(s)`,
      }
    : null

  // PayPal payment handlers
  const createOrder = (data: any, actions: any) => {
    const price = getTicketPrice()
    console.log("Creating PayPal order for amount:", price)

    // Ensure price is valid
    if (!price || price <= 0) {
      console.error("Invalid price:", price)
      setPaymentError("Invalid ticket price. Please refresh and try again.")
      return Promise.reject(new Error("Invalid price"))
    }

    return actions.order
      .create({
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: price.toFixed(2), // Ensure 2 decimal places
            },
            description: `ECI@25 Convention - ${selectedTicketData?.name || "Registration"}`,
            custom_id: `ECI25-${formData.email}-${Date.now()}`,
            soft_descriptor: "ECI@25 Convention",
          },
        ],
        application_context: {
          brand_name: "Eko Club International",
          landing_page: "NO_PREFERENCE",
          user_action: "PAY_NOW",
          return_url: `${window.location.origin}/register?success=true`,
          cancel_url: `${window.location.origin}/register?cancelled=true`,
          shipping_preference: "NO_SHIPPING",
        },
      })
      .catch((error: any) => {
        console.error("PayPal order creation error:", error)
        setPaymentError("Failed to create payment order. Please try again.")
        throw error
      })
  }

  const onApprove = async (data: any, actions: any) => {
    setIsProcessing(true)
    setPaymentError("")

    try {
      console.log("PayPal payment approved, order ID:", data.orderID)

      // Capture the payment
      const details = await actions.order.capture()
      console.log("Payment captured successfully:", details)

      // Verify the payment was actually completed
      if (details.status !== "COMPLETED") {
        throw new Error(`Payment not completed. Status: ${details.status}`)
      }

      // Send registration data to backend for processing and email sending
      const response = await fetch("/api/paypal/capture", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderID: data.orderID,
          captureDetails: details,
          registrationData: {
            ...formData,
            ticketPrice: getTicketPrice(),
          },
        }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error("Backend response error:", response.status, errorText)
        throw new Error(`Server error: ${response.status}`)
      }

      const result = await response.json()
      console.log("Backend response:", result)

      if (result.success) {
        setPaymentSuccess(true)
        setIsSubmitted(true)
        setRegistrationId(result.registrationId)
        setEmailSent(result.emailSent)

        // Scroll to top to show confirmation
        window.scrollTo({ top: 0, behavior: "smooth" })
      } else {
        console.error("Registration processing failed:", result)
        setPaymentError(
          result.error || "Registration processing failed. Please contact support with your payment details.",
        )
      }
    } catch (error) {
      console.error("Payment processing error:", error)
      setPaymentError(
        `Payment processing failed: ${error instanceof Error ? error.message : "Unknown error"}. Please contact support if your payment was charged.`,
      )
    } finally {
      setIsProcessing(false)
    }
  }

  const onError = (err: any) => {
    console.error("PayPal error:", err)
    setPaymentError(`Payment error: ${err.message || "Unknown PayPal error"}. Please try again or contact support.`)
    setIsProcessing(false)
  }

  const onCancel = (data: any) => {
    console.log("Payment cancelled:", data)
    setPaymentError("Payment was cancelled. You can try again when ready.")
    setIsProcessing(false)
  }

  if (isSubmitted && paymentSuccess) {
    return (
      <div className="min-h-screen bg-white">
        <TopBar isScrolled={isScrolled} />
        <Header isScrolled={isScrolled} />

        {/* Confirmation Section */}
        <section
          className={`relative bg-gradient-to-br from-green-500 via-teal-500 to-blue-500 text-white py-32 ${isScrolled ? "pt-44" : ""}`}
        >
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="container mx-auto px-4 relative z-10 text-center">
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
                Thank you for registering for ECI@25. We're excited to see you in Newark!
              </p>

              {/* Registration Details */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 max-w-2xl mx-auto mb-8">
                <h3 className="text-2xl font-bold mb-4">Registration Details</h3>
                <div className="text-left space-y-2 text-white/90">
                  <p>
                    <strong>Registration ID:</strong> {registrationId}
                  </p>
                  <p>
                    <strong>Name:</strong> {formData.firstName} {formData.lastName}
                  </p>
                  <p>
                    <strong>Email:</strong> {formData.email}
                  </p>
                  <p>
                    <strong>Chapter:</strong> {formData.chapterName}
                  </p>
                  <p>
                    <strong>Ticket Type:</strong> {selectedTicketData?.name}
                  </p>
                  <p>
                    <strong>Amount Paid:</strong> ${selectedTicketData?.price}
                  </p>
                </div>
              </div>

              {/* Email Status */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 max-w-2xl mx-auto mb-8">
                <div className="flex items-center justify-center space-x-3 mb-4">
                  <Mail className="h-6 w-6 text-white" />
                  <h3 className="text-xl font-bold">Email Confirmation</h3>
                </div>
                {emailSent ? (
                  <div className="flex items-center justify-center space-x-2 text-green-300">
                    <Check className="h-5 w-5" />
                    <span>Confirmation email sent to {formData.email}</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2 text-yellow-300">
                    <AlertCircle className="h-5 w-5" />
                    <span>Email delivery in progress. Please check your inbox shortly.</span>
                  </div>
                )}
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold mb-4">What's Next?</h3>
                <ul className="text-left space-y-3 text-white/90">
                  <li className="flex items-start space-x-3">
                    <Check className="h-5 w-5 text-green-300 mt-0.5 flex-shrink-0" />
                    <span>Check your email for detailed confirmation and receipt</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Check className="h-5 w-5 text-green-300 mt-0.5 flex-shrink-0" />
                    <span>Convention materials will be mailed 2 weeks before the event</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Check className="h-5 w-5 text-green-300 mt-0.5 flex-shrink-0" />
                    <span>Hotel booking information and travel tips coming soon</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Check className="h-5 w-5 text-green-300 mt-0.5 flex-shrink-0" />
                    <span>
                      Save your Registration ID: <strong>{registrationId}</strong>
                    </span>
                  </li>
                </ul>
              </div>
              <div className="mt-8 space-y-4">
                <Button
                  size="lg"
                  className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3 text-lg mr-4"
                  onClick={() => window.print()}
                >
                  Print Confirmation
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-green-600 px-8 py-3 text-lg bg-white/10 backdrop-blur-sm"
                  onClick={() => (window.location.href = "/")}
                >
                  Return to Homepage
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    )
  }

  return (
    <PayPalScriptProvider
      options={{
        "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "",
        currency: "USD",
        intent: "capture",
        "enable-funding": "venmo,paylater",
        "disable-funding": "",
        "data-sdk-integration-source": "button-factory",
      }}
    >
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
                Secure your spot at the 25th International Convention in Newark, NJ. Join hundreds of members from
                around the world for five days of networking, learning, and celebration.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Introduction Section */}
        <section className="py-16 bg-gradient-to-br from-purple-50 to-teal-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center max-w-4xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-teal-600 bg-clip-text text-transparent">
                Why Register for ECI@25?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <div className="text-center">
                  <div className="bg-purple-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Global Networking</h3>
                  <p className="text-gray-600">Connect with ECI members from 60+ chapters worldwide</p>
                </div>
                <div className="text-center">
                  <div className="bg-teal-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Calendar className="h-8 w-8 text-teal-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">5 Days of Events</h3>
                  <p className="text-gray-600">Packed schedule of panels, workshops, and celebrations</p>
                </div>
                <div className="text-center">
                  <div className="bg-orange-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Award className="h-8 w-8 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Historic Milestone</h3>
                  <p className="text-gray-600">Be part of our 25th anniversary celebration</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Registration Form */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <form onSubmit={handleFormSubmit} className="max-w-4xl mx-auto">
              {/* Personal Information */}
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <h2 className="text-3xl font-bold mb-8">Personal Information</h2>
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
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                        errors.firstName ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Enter your first name"
                    />
                    {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
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
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                        errors.lastName ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Enter your last name"
                    />
                    {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
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
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Enter your email address"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Chapter Name <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="chapterName"
                      value={formData.chapterName}
                      onChange={handleInputChange}
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                        errors.chapterName ? "border-red-500" : "border-gray-300"
                      }`}
                    >
                      <option value="">Select your chapter</option>
                      <option value="Atlanta">Atlanta</option>
                      <option value="Austin">Austin</option>
                      <option value="California">California</option>
                      <option value="Dallas">Dallas</option>
                      <option value="DC Metro">DC Metro</option>
                      <option value="Delaware Valley">Delaware Valley</option>
                      <option value="Detroit">Detroit</option>
                      <option value="Eko Lagosians of Canada">Eko Lagosians of Canada</option>
                      <option value="Florida">Florida</option>
                      <option value="Houston">Houston</option>
                      <option value="Eko club Houston Women">Eko club Houston Women</option>
                      <option value="London">London</option>
                      <option value="Louisiana">Louisiana</option>
                      <option value="Miami">Miami</option>
                      <option value="Minnesota">Minnesota</option>
                      <option value="Eko Lagosians of Minnesota">Eko Lagosians of Minnesota</option>
                      <option value="New Jersey">New Jersey</option>
                      <option value="New York">New York</option>
                      <option value="Ohio">Ohio</option>
                      <option value="Pennsylvania">Pennsylvania</option>
                      <option value="Philadelphia">Philadelphia</option>
                      <option value="Rhode Island">Rhode Island</option>
                      <option value="San Antonio">San Antonio</option>
                      <option value="Lagosians of Chicago">Lagosians of Chicago</option>
                    </select>
                    {errors.chapterName && <p className="text-red-500 text-sm mt-1">{errors.chapterName}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gender <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                        errors.gender ? "border-red-500" : "border-gray-300"
                      }`}
                    >
                      <option value="">Select your gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                      <option value="Prefer not to say">Prefer not to say</option>
                    </select>
                    {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Shirt Size <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="shirtSize"
                      value={formData.shirtSize}
                      onChange={handleInputChange}
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                        errors.shirtSize ? "border-red-500" : "border-gray-300"
                      }`}
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
                    {errors.shirtSize && <p className="text-red-500 text-sm mt-1">{errors.shirtSize}</p>}
                  </div>
                </div>
              </motion.div>

              {/* Event Attendance & Registration Category */}
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <h2 className="text-3xl font-bold mb-8">Event Details</h2>

                {/* Days Attendance */}
                <div className="mb-8">
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    What days will you attend? <span className="text-red-500">*</span>
                  </label>
                  {errors.attendanceDays && <p className="text-red-500 text-sm mb-3">{errors.attendanceDays}</p>}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { id: "day1", label: "Day 1 - Sept 18", description: "Economic Development & Youth" },
                      { id: "day2", label: "Day 2 - Sept 19", description: "Community Service & Reflection" },
                      { id: "day3", label: "Day 3 - Sept 20", description: "Health, Governance & Celebration" },
                      { id: "day4", label: "Day 4 - Sept 21", description: "Spiritual Reflection & Farewell" },
                    ].map((day) => (
                      <label
                        key={day.id}
                        className={`flex items-start space-x-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                          formData.attendanceDays.includes(day.id)
                            ? "border-purple-500 bg-purple-50"
                            : "border-gray-300 hover:border-purple-300"
                        }`}
                      >
                        <input
                          type="checkbox"
                          value={day.id}
                          checked={formData.attendanceDays.includes(day.id)}
                          onChange={(e) => {
                            const value = e.target.value
                            const updatedDays = e.target.checked
                              ? [...formData.attendanceDays, value]
                              : formData.attendanceDays.filter((d) => d !== value)
                            setFormData((prev) => ({ ...prev, attendanceDays: updatedDays }))
                            if (errors.attendanceDays) {
                              setErrors((prev) => ({ ...prev, attendanceDays: "" }))
                            }
                          }}
                          className="mt-1"
                        />
                        <div>
                          <div className="font-medium text-gray-800">{day.label}</div>
                          <div className="text-sm text-gray-600">{day.description}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Registration Category */}
                <div className="mb-8">
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Registration Category <span className="text-red-500">*</span>
                  </label>
                  {errors.registrationCategory && (
                    <p className="text-red-500 text-sm mb-3">{errors.registrationCategory}</p>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { id: "youth", label: "Youth", description: "10 Years to 17 Years", price: "$200" },
                      { id: "adult", label: "Adult", description: "18 Years to 69 Years", price: "$250" },
                      { id: "senior", label: "Senior", description: "70 Years and above", price: "$225" },
                    ].map((category) => (
                      <label
                        key={category.id}
                        className={`flex items-start space-x-3 p-6 border rounded-lg cursor-pointer transition-colors ${
                          formData.registrationCategory === category.id
                            ? "border-purple-500 bg-purple-50"
                            : "border-gray-300 hover:border-purple-300"
                        }`}
                      >
                        <input
                          type="radio"
                          name="registrationCategory"
                          value={category.id}
                          checked={formData.registrationCategory === category.id}
                          onChange={(e) => {
                            setFormData((prev) => ({ ...prev, registrationCategory: e.target.value }))
                            if (errors.registrationCategory) {
                              setErrors((prev) => ({ ...prev, registrationCategory: "" }))
                            }
                          }}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <div className="font-bold text-lg text-gray-800">{category.label}</div>
                          <div className="text-sm text-gray-600 mb-2">{category.description}</div>
                          <div className="text-2xl font-bold text-purple-600">{category.price}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Dietary Restrictions */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Dietary Restrictions</label>
                  <textarea
                    name="dietaryRestrictions"
                    value={formData.dietaryRestrictions}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Please list any dietary restrictions, allergies, or special meal requirements..."
                  />
                </div>
              </motion.div>

              {/* Terms and Conditions */}
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="mb-8"
              >
                <div className="bg-gray-50 p-6 rounded-lg">
                  <label className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      checked={agreeToTerms}
                      onChange={(e) => setAgreeToTerms(e.target.checked)}
                      className="mt-1"
                    />
                    <span className="text-sm text-gray-700">
                      I agree to the{" "}
                      <a href="#" className="text-purple-600 hover:underline">
                        Terms and Conditions
                      </a>
                      ,{" "}
                      <a href="#" className="text-purple-600 hover:underline">
                        Privacy Policy
                      </a>
                      , and{" "}
                      <a href="#" className="text-purple-600 hover:underline">
                        Cancellation Policy
                      </a>
                      . I understand that registration fees are non-refundable except in cases of event cancellation.{" "}
                      <span className="text-red-500">*</span>
                    </span>
                  </label>
                  {errors.agreeToTerms && <p className="text-red-500 text-sm mt-2">{errors.agreeToTerms}</p>}
                </div>
              </motion.div>

              {/* Submit Button */}
              {!showPayment && (
                <motion.div
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <Button
                    type="submit"
                    size="lg"
                    className="bg-gradient-to-r from-purple-600 to-teal-600 hover:from-purple-700 hover:to-teal-700 text-white px-12 py-4 text-lg font-bold"
                  >
                    Proceed to Payment - {selectedTicketData ? `$${selectedTicketData.price}` : "$0"}
                  </Button>
                  <p className="text-sm text-gray-600 mt-4">
                    Review your information and proceed to secure PayPal payment
                  </p>
                </motion.div>
              )}
            </form>

            {/* Payment Section */}
            {showPayment && (
              <motion.div
                id="payment-section"
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto mt-12"
              >
                <h2 className="text-3xl font-bold mb-8 text-center">Complete Your Payment</h2>

                {selectedTicketData && (
                  <div className="bg-gradient-to-r from-purple-50 to-teal-50 p-6 rounded-lg mb-8">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">{selectedTicketData.name}</h3>
                        <p className="text-gray-600">{selectedTicketData.description}</p>
                        <p className="text-sm text-gray-600 mt-2">
                          <strong>Attendee:</strong> {formData.firstName} {formData.lastName}
                        </p>
                        <p className="text-sm text-gray-600">
                          <strong>Chapter:</strong> {formData.chapterName}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-3xl font-bold text-purple-600">${selectedTicketData.price}</p>
                        <p className="text-sm text-gray-600">Total Amount</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-center space-x-4 mb-6">
                    <Shield className="h-6 w-6 text-green-600" />
                    <span className="text-sm text-gray-600">Secure Payment with PayPal</span>
                    <img src="/placeholder.svg?height=30&width=80&text=PayPal" alt="PayPal" className="h-8" />
                  </div>

                  {paymentError && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                      <div className="flex items-start space-x-2">
                        <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="text-red-600 font-medium block">Payment Error</span>
                          <span className="text-red-600 text-sm">{paymentError}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {isProcessing && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                        <span className="text-blue-600 font-medium">Processing your payment and registration...</span>
                      </div>
                    </div>
                  )}

                  <div className="max-w-md mx-auto">
                    <PayPalButtons
                      style={{
                        layout: "vertical",
                        color: "blue",
                        shape: "rect",
                        label: "paypal",
                        height: 55,
                      }}
                      createOrder={createOrder}
                      onApprove={onApprove}
                      onError={onError}
                      onCancel={onCancel}
                      disabled={isProcessing}
                    />
                  </div>

                  <div className="text-center mt-6">
                    <p className="text-sm text-gray-600">
                      Your payment is processed securely through PayPal. You don't need a PayPal account to pay with a
                      credit or debit card.
                    </p>
                  </div>
                </div>

                <div className="text-center mt-8">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowPayment(false)
                      setPaymentError("")
                    }}
                    className="border-gray-300 text-gray-600 hover:bg-gray-50"
                    disabled={isProcessing}
                  >
                    ← Back to Registration Form
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
        </section>

        <Footer />
      </div>
    </PayPalScriptProvider>
  )
}
