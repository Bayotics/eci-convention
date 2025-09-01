// app/immigration/page.tsx

"use client"

import { TopBar } from "@/components/sections/top-bar"
import { Header } from "@/components/sections/header"
import { Footer } from "@/components/sections/footer"
import { motion } from "framer-motion"
import { useState } from "react"

const services = [
  "Passport Application",
  "Passport Renewal",
  "Visa Application",
  "Emergency Travel Certificate",
  "Citizenship Attestation Certificate",
  "Letter to the Police for lost passport",
  "Life Attestation Letter",
  "Permit Letter to ship human remains",
  "Authentication of certificate of free sale",
  "Authentication of documents",
  "Registration of Nigerians",
]

export default function ImmigrationPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    residentialCountry: "",
    residentialState: "",
    citizenshipCountry: "",
    service: "",
  })

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    try {
      const res = await fetch("/api/immigration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        setMessage("Your request has been submitted successfully!")
        setFormData({
          name: "",
          email: "",
          phone: "",
          residentialCountry: "",
          residentialState: "",
          citizenshipCountry: "",
          service: "",
        })
      } else {
        setMessage("Something went wrong. Please try again.")
      }
    } catch (error) {
      setMessage("Error submitting form. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Header />

      {/* Hero Section */}
      <section
        className="relative text-white py-8 sm:py-12 md:py-16 lg:py-20"
        style={{
          backgroundImage: "url('/images/venue-page-banner.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/80 via-blue-600/70 to-teal-500/80"></div>
        <div className="absolute inset-0 bg-black/20"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-[190px] sm:pt-[130px] md:pt-[140px] lg:pt-[150px]">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
            Get Consular Services at the Economic Session
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl leading-relaxed">
            Access essential immigration and consular services during the economic session of the convention.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
          Available Services
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200"
            >
              <h3 className="text-lg font-semibold text-gray-800">{service}</h3>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Form Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            Apply for a Service
          </h2>
          <form
            onSubmit={handleSubmit}
            className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-4 py-3"
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-4 py-3"
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3"
              />
              <input
                type="text"
                name="residentialCountry"
                placeholder="Residential Country"
                value={formData.residentialCountry}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-4 py-3"
              />
              <input
                type="text"
                name="residentialState"
                placeholder="Residential State"
                value={formData.residentialState}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-4 py-3"
              />
              <input
                type="text"
                name="citizenshipCountry"
                placeholder="Citizenship Country"
                value={formData.citizenshipCountry}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-4 py-3"
              />
            </div>

            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-4 py-3"
            >
              <option value="">Select a Service</option>
              {services.map((service, i) => (
                <option key={i} value={service}>
                  {service}
                </option>
              ))}
            </select>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg"
            >
              {loading ? "Submitting..." : "Submit Request"}
            </motion.button>

            {message && (
              <p className="text-center text-sm mt-4 text-gray-700">{message}</p>
            )}
          </form>
        </div>
      </section>

      <Footer />
    </div>
  )
}
