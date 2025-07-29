"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { TopBar } from "@/components/sections/top-bar"
import { Header } from "@/components/sections/header"
import { Footer } from "@/components/sections/footer"
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Users,
  Calendar,
  AlertCircle,
  CheckCircle,
  Loader2,
  Facebook,
  Instagram,
  X,
  Youtube,
} from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [showAlert, setShowAlert] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")
    setShowAlert(false)

    try {
      const response = await fetch("https://public.herotofu.com/v1/f1ee8b90-b2d3-11ee-ae0b-a7e011fe96d3", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          _subject: `ECI@25 Contact Form: ${formData.subject}`,
          _template: "table",
        }),
      })

      if (response.ok) {
        setSubmitStatus("success")
        setShowAlert(true)
        // Reset form after successful submission
        setFormData({ name: "", email: "", subject: "", message: "" })

        // Auto-hide alert after 8 seconds
        setTimeout(() => {
          setShowAlert(false)
          setSubmitStatus("idle")
        }, 8000)
      } else {
        throw new Error("Failed to submit form")
      }
    } catch (error) {
      console.error("Form submission error:", error)
      setSubmitStatus("error")
      setShowAlert(true)

      // Auto-hide alert after 8 seconds
      setTimeout(() => {
        setShowAlert(false)
        setSubmitStatus("idle")
      }, 8000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const closeAlert = () => {
    setShowAlert(false)
    setSubmitStatus("idle")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar />
      <Header />

      {/* Alert Notification */}
      {showAlert && (
        <div className="fixed top-4 right-4 z-50 w-full max-w-md animate-in slide-in-from-right-full duration-300">
          {submitStatus === "success" ? (
            <Alert className="bg-green-50 border-green-200 shadow-lg">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <AlertDescription className="text-green-800 pr-8">
                <div className="font-semibold mb-1">Message sent successfully! 🎉</div>
                <div className="text-sm">Thank you for contacting ECI@25. We'll get back to you within 24 hours.</div>
              </AlertDescription>
              <button
                onClick={closeAlert}
                className="absolute top-2 right-2 text-green-600 hover:text-green-800 transition-colors"
                aria-label="Close alert"
              >
                <X className="h-4 w-4" />
              </button>
            </Alert>
          ) : (
            <Alert className="bg-red-50 border-red-200 shadow-lg">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <AlertDescription className="text-red-800 pr-8">
                <div className="font-semibold mb-1">Failed to send message ❌</div>
                <div className="text-sm">
                  Please try again or contact us directly at{" "}
                  <a href="mailto:info@eciconvention.org" className="underline font-medium">
                    info@eciconvention.org
                  </a>
                </div>
              </AlertDescription>
              <button
                onClick={closeAlert}
                className="absolute top-2 right-2 text-red-600 hover:text-red-800 transition-colors"
                aria-label="Close alert"
              >
                <X className="h-4 w-4" />
              </button>
            </Alert>
          )}
        </div>
      )}

      <main className="pt-[190px] sm:pt-[130px] md:pt-[140px] lg:pt-[150px] contact-container-main">
        {/* Hero Section */}
        <section
          style={{
            backgroundImage: "url('/images/blob-scene-haikei.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
          className="text-white py-12 sm:py-16 md:py-20"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-4 sm:mb-6">
              Contact Us
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
              Get in touch with the ECI@25 organizing committee. We're here to help with any questions about the
              convention.
            </p>
          </div>
        </section>

        {/* Contact Form and Info Section */}
        <section className="py-12 sm:py-16 md:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Contact Form */}
              <div>
                <Card className="shadow-lg">
                  <CardContent className="p-6 sm:p-8">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">Send us a Message</h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name *
                          </label>
                          <Input
                            id="name"
                            type="text"
                            value={formData.name}
                            onChange={(e) => handleInputChange("name", e.target.value)}
                            required
                            className="w-full"
                            placeholder="Enter your full name"
                            disabled={isSubmitting}
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address *
                          </label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            required
                            className="w-full"
                            placeholder="Enter your email"
                            disabled={isSubmitting}
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                          Subject *
                        </label>
                        <Select
                          value={formData.subject}
                          onValueChange={(value) => handleInputChange("subject", value)}
                          disabled={isSubmitting}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a subject" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Registration Inquiry">Registration Inquiry</SelectItem>
                            <SelectItem value="Speaker Information">Speaker Information</SelectItem>
                            <SelectItem value="Venue & Logistics">Venue & Logistics</SelectItem>
                            <SelectItem value="Sponsorship Opportunities">Sponsorship Opportunities</SelectItem>
                            <SelectItem value="Technical Support">Technical Support</SelectItem>
                            <SelectItem value="General Question">General Question</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                          Message *
                        </label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) => handleInputChange("message", e.target.value)}
                          required
                          rows={6}
                          className="w-full resize-none"
                          placeholder="Please provide details about your inquiry..."
                          disabled={isSubmitting}
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={
                          isSubmitting || !formData.name || !formData.email || !formData.subject || !formData.message
                        }
                        className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Sending Message...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 h-4 w-4" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Information */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">Get in Touch</h2>
                  <p className="text-gray-600 text-base sm:text-lg mb-8">
                    We're here to help make your ECI@25 experience unforgettable. Reach out to us through any of the
                    following channels.
                  </p>
                </div>

                {/* Contact Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                  <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="bg-blue-100 p-3 rounded-lg">
                          <Mail className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                          <p className="text-gray-600 text-sm mb-2">General inquiries</p>
                          <a
                            href="mailto:waletayo2000@yahoo.com"
                            className="text-blue-600 hover:text-blue-700 font-medium"
                          >
                            waletayo2000@yahoo.com
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="bg-green-100 p-3 rounded-lg">
                          <Phone className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                          <p className="text-gray-600 text-sm mb-2">Mon-Fri, 9AM-6PM EST</p>
                          <a href="tel:+15551234567" className="text-green-600 hover:text-green-700 font-medium">
                            +1 (555) 123-4567
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="bg-purple-100 p-3 rounded-lg">
                          <MapPin className="h-6 w-6 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">Location</h3>
                          <p className="text-gray-600 text-sm mb-2">Convention venue</p>
                          <p className="text-purple-600 font-medium">Newark, NJ</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="bg-orange-100 p-3 rounded-lg">
                          <Clock className="h-6 w-6 text-orange-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">Office Hours</h3>
                          <p className="text-gray-600 text-sm">
                            Monday - Friday: 9:00 AM - 6:00 PM EST
                            <br />
                            Saturday: 10:00 AM - 4:00 PM EST
                            <br />
                            Sunday: Closed
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card> */}
                </div>

                {/* Emergency Contact */}
                <Card className="bg-red-50 border-red-200">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-red-100 p-3 rounded-lg">
                        <AlertCircle className="h-6 w-6 text-red-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-red-900 mb-1">Emergency Contact</h3>
                        <p className="text-red-700 text-sm mb-2">24/7 emergency line during convention</p>
                        <a href="tel:+15559876543" className="text-red-600 hover:text-red-700 font-medium">
                          +1 (555) 987-6543
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 sm:py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                Quick answers to common questions about ECI@25
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Users className="mr-2 h-5 w-5 text-blue-600" />
                    How do I register for the convention?
                  </h3>
                  <p className="text-gray-600">
                    Click the "Register Now" button in the header or visit our registration page. Follow the
                    step-by-step process to secure your spot.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Calendar className="mr-2 h-5 w-5 text-green-600" />
                    What are the convention dates?
                  </h3>
                  <p className="text-gray-600">
                    The ECI@25 convention will take place over three days. Check our agenda page for the complete
                    schedule of events.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <MapPin className="mr-2 h-5 w-5 text-purple-600" />
                    Where is the venue located?
                  </h3>
                  <p className="text-gray-600">
                    The convention will be held in Newark, NJ. Visit our venue page for detailed location information
                    and transportation options.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <MessageCircle className="mr-2 h-5 w-5 text-orange-600" />
                    Can I get a refund if I can't attend?
                  </h3>
                  <p className="text-gray-600">
                    Refund policies vary by registration type and timing. Please contact us directly for specific refund
                    requests and conditions.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Social Media Section */}
        <section className="py-12 sm:py-16 md:py-20 bg-gray-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">Follow Us</h2>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Stay updated with the latest news and announcements about ECI@25
            </p>

            <div className="flex justify-center space-x-6">
              <a
                href="https://web.facebook.com/profile.php?id=100064708539337"
                className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition-colors"
                aria-label="Facebook" target="_blank"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a
                href="https://www.instagram.com/ekoclubinternational/"
                className="bg-pink-600 hover:bg-pink-700 text-white p-3 rounded-full transition-colors"
                aria-label="Instagram" target="_blank"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href="https://www.youtube.com/@EkoClubGroup"
                className="bg-blue-700 hover:bg-blue-800 text-white p-3 rounded-full transition-colors"
                aria-label="LinkedIn" target="_blank"
              >
                <Youtube className="h-6 w-6" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
