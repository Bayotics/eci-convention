"use client"

import { useState, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { RegisterHeader } from "@/components/sections/register-header"
import { Footer } from "@/components/sections/footer"
import { Users, Clock, Check, AlertCircle } from "lucide-react"
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"

const ticketPricing = {
  member: {
    "adult-thu-sun": { price: 200, days: ["thursday", "friday", "saturday", "sunday"], label: "Adult (Thu-Sun)" },
    "adult-fri-sun": { price: 150, days: ["friday", "saturday", "sunday"], label: "Adult (Fri-Sun)" },
    "senior-thu-sun": { price: 175, days: ["thursday", "friday", "saturday", "sunday"], label: "Senior (Thu-Sun)" },
    "senior-fri-sun": { price: 125, days: ["friday", "saturday", "sunday"], label: "Senior (Fri-Sun)" },
    "youth-thu-sun": { price: 125, days: ["thursday", "friday", "saturday", "sunday"], label: "Youth (Thu-Sun)" },
  },
  "non-member": {
    "adult-thu-sun": { price: 250, days: ["thursday", "friday", "saturday", "sunday"], label: "Adult (Thu-Sun)" },
    "adult-fri-sun": { price: 200, days: ["friday", "saturday", "sunday"], label: "Adult (Fri-Sun)" },
    "senior-thu-sun": { price: 200, days: ["thursday", "friday", "saturday", "sunday"], label: "Senior (Thu-Sun)" },
    "senior-fri-sun": { price: 150, days: ["friday", "saturday", "sunday"], label: "Senior (Fri-Sun)" },
    "youth-thu-sun": { price: 150, days: ["thursday", "friday", "saturday", "sunday"], label: "Youth (Thu-Sun)" },
  },
}

function PaymentPageContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [selectedTicket, setSelectedTicket] = useState("")
  const [guestEmail, setGuestEmail] = useState("")
  const [guestEmailError, setGuestEmailError] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentError, setPaymentError] = useState("")

  const type = searchParams.get("type") // 'member' or 'guest'
  const email = searchParams.get("email") || ""
  const membershipType = type === "member" ? "member" : "non-member"
  const tickets = ticketPricing[membershipType]
  const emailToUse = membershipType === "non-member" ? guestEmail : email


  const validateGuestEmail = () => {
    if (membershipType === "non-member" && !guestEmail.trim()) {
      setGuestEmailError("Email is required for guests")
      return false
    }
    setGuestEmailError("")
    return true
  }
  function generateMembershipId(length = 19) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
  const createOrder = (data: any, actions: any) => {
    if (!selectedTicket) {
      setPaymentError("Please select a ticket type")
      return Promise.reject(new Error("No ticket selected"))
    }
    if (!validateGuestEmail()) {
      return Promise.reject(new Error("Guest email required"))
    }
    const ticketInfo = tickets[selectedTicket as keyof typeof tickets]
    const price = ticketInfo.price

    return actions.order.create({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: price.toFixed(2),
          },
          description: `ECI@25 Convention - ${ticketInfo.label}`,
          custom_id: `ECI25-${email}-${Date.now()}`,
        },
      ],
    })
  }

  const onApprove = async (data: any, actions: any) => {
    setIsProcessing(true)
    setPaymentError("")

    try {
      const details = await actions.order.capture()

      if (details.status !== "COMPLETED") {
        throw new Error(`Payment not completed. Status: ${details.status}`)
      }

      const ticketInfo = tickets[selectedTicket as keyof typeof tickets]

      // Save payment to database
      const response = await fetch("/api/registration/save-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailToUse,
          membershipStatus: membershipType,
          ticketType: `${selectedTicket}-${membershipType}`,
          amount: ticketInfo.price,
          paymentId: details.id,
          attendanceDays: ticketInfo.days,
          paymentDetails: details,
          transactionReference: generateMembershipId()

        }),
      })

      const result = await response.json()

      if (result.success) {
        // Redirect based on membership type
        if (membershipType === "member") {
          router.push(`/register/member/form?email=${encodeURIComponent(email)}`)
        } else {
          router.push(`/register/guest/form?email=${encodeURIComponent(emailToUse)}`)
        }
      } else {
        setPaymentError(result.error || "Payment processing failed")
      }
    } catch (error) {
      console.error("Payment error:", error)
      setPaymentError(`Payment processing failed: ${error instanceof Error ? error.message : "Unknown error"}`)
    } finally {
      setIsProcessing(false)
    }
  }

  const onError = (err: any) => {
    console.error("PayPal error:", err)
    setPaymentError(`Payment error: ${err.message || "Unknown PayPal error"}`)
  }

  return (
    <PayPalScriptProvider
      options={{
        "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "",
        currency: "USD",
        intent: "capture",
      }}
    >
      <div className="min-h-screen bg-white">
        <RegisterHeader isScrolled={false} />

        <section className="py-20 bg-gray-50 min-h-screen">
          <div className="container mx-auto px-4 mt-36">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-teal-600 bg-clip-text text-transparent">
                  Select Your Ticket
                </h1>
                <p className="text-lg text-gray-600">
                  {membershipType === "member" ? "Member Pricing" : "Guest Pricing"} - Choose your convention package
                </p>
                {email && (
                  <p className="text-sm text-gray-500 mt-2">
                    <strong>Email:</strong> {email}
                  </p>
                )}
              </motion.div>

              {/* Ticket Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {Object.entries(tickets).map(([key, ticket]) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className={`bg-white rounded-lg shadow-lg p-6 cursor-pointer transition-all ${
                      selectedTicket === key ? "ring-2 ring-purple-500 bg-purple-50" : "hover:shadow-xl hover:scale-105"
                    }`}
                    onClick={() => setSelectedTicket(key)}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-800">{ticket.label}</h3>
                      <div className="text-3xl font-bold text-purple-600">${ticket.price}</div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">
                          {ticket.days.length} days ({ticket.days.join(", ")})
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">
                          {membershipType === "member" ? "Member Rate" : "Guest Rate"}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-gray-600">All sessions and activities included</span>
                      </div>
                    </div>

                    {selectedTicket === key && (
                      <div className="mt-4 p-3 bg-purple-100 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <Check className="h-4 w-4 text-purple-600" />
                          <span className="text-sm text-purple-700 font-medium">Selected</span>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
              {membershipType === "non-member" && selectedTicket && (
                <div className="mb-6 max-w-md mx-auto">
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="guest-email">
                    Guest Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="guest-email"
                    type="email"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter your email address"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    required
                    disabled={isProcessing}
                  />
                  {guestEmailError && (
                    <p className="text-red-600 text-xs mt-1">{guestEmailError}</p>
                  )}
                </div>
              )}
              {/* Payment Section */}
              {selectedTicket && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="bg-white rounded-lg shadow-lg p-8"
                >
                  <h2 className="text-2xl font-bold mb-6 text-center">Complete Your Payment</h2>

                  {paymentError && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                      <div className="flex items-start space-x-2">
                        <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                        <span className="text-red-600 text-sm">{paymentError}</span>
                      </div>
                    </div>
                  )}

                  {isProcessing && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                        <span className="text-blue-600 font-medium">Processing your payment...</span>
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
                      disabled={isProcessing || !selectedTicket}
                    />
                  </div>

                  <div className="text-center mt-6">
                    <p className="text-sm text-gray-600">
                      Secure payment processing through PayPal. You don't need a PayPal account to pay with a credit or
                      debit card.
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </PayPalScriptProvider>
  )
}

export default function PaymentPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentPageContent />
    </Suspense>
  )
}
