"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { TopBar } from "@/components/sections/top-bar"
import { Header } from "@/components/sections/header"
import { Footer } from "@/components/sections/footer"
import {
  MapPin,
  Car,
  Plane,
  Train,
  Wifi,
  Utensils,
  Dumbbell,
  ParkingMeterIcon as ParkingIcon,
  Phone,
  Mail,
  Clock,
  Star,
  Users,
  Shield,
} from "lucide-react"
import { Button } from "@/components/ui/button"

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

// Venue and accommodation data
const venueInfo = {
  name: "DoubleTree by Hilton Hotel Newark Airport",
  address: "128 Frontage Rd, Newark, NJ 07114, United States",
  phone: "+1 (973) 690-5500",
  email: "newark_airport@doubletree.com",
  website: "https://www.hilton.com/en/hotels/ewrnwdt-doubletree-newark-airport/",
  rating: 4.2,
  description:
    "Experience comfort and convenience at the DoubleTree by Hilton Hotel Newark Airport, perfectly positioned for ECI@25. This modern hotel offers exceptional amenities and easy access to Newark Liberty International Airport, making it the ideal choice for our international attendees.",
  keyFeatures: [
    {
      icon: Plane,
      title: "Airport Proximity",
      description: "Just 2 miles from Newark Liberty International Airport with complimentary shuttle service",
    },
    {
      icon: Wifi,
      title: "High-Speed WiFi",
      description: "Complimentary high-speed internet throughout the hotel for all your connectivity needs",
    },
    {
      icon: Utensils,
      title: "Dining Options",
      description: "On-site restaurant and bar serving delicious meals and refreshing beverages",
    },
    {
      icon: Dumbbell,
      title: "Fitness Center",
      description: "24-hour fitness center with modern equipment to maintain your wellness routine",
    },
    {
      icon: Users,
      title: "Meeting Facilities",
      description: "State-of-the-art conference rooms and event spaces perfect for our convention activities",
    },
    {
      icon: ParkingIcon,
      title: "Parking Available",
      description: "Convenient on-site parking with special rates for convention attendees",
    },
  ],
}

const transportationOptions = [
  {
    icon: Plane,
    title: "Newark Liberty International Airport (EWR)",
    distance: "2 miles (5 minutes)",
    description: "Major international airport with direct flights from around the world",
    details: [
      "Complimentary hotel shuttle service every 30 minutes",
      "Direct flights from major African, European, and American cities",
      "AirTrain Newark connects to NYC and regional transportation",
    ],
  },
  {
    icon: Train,
    title: "Newark Penn Station",
    distance: "8 miles (15 minutes)",
    description: "Major transportation hub connecting to NYC and regional destinations",
    details: [
      "NJ Transit trains to New York Penn Station (30 minutes)",
      "Amtrak Northeast Corridor service",
      "PATH train connections to Manhattan",
    ],
  },
  {
    icon: Car,
    title: "Major Highways",
    distance: "Direct access",
    description: "Easy access to major highways and roadways",
    details: ["I-95 and I-78 highway access", "New Jersey Turnpike (I-95) - Exit 14", "Route 1&9 and Route 21 nearby"],
  },
]

const nearbyAccommodations = [
  {
    name: "Marriott Newark Airport",
    distance: "1.5 miles",
    rating: 4.3,
    priceRange: "$150-200/night",
    features: ["Airport Shuttle", "Restaurant", "Fitness Center", "Business Center"],
  },
  {
    name: "Hampton Inn & Suites Newark Airport",
    distance: "2.2 miles",
    rating: 4.1,
    priceRange: "$120-160/night",
    features: ["Free Breakfast", "Airport Shuttle", "Pool", "WiFi"],
  },
  {
    name: "Courtyard Newark Airport",
    distance: "1.8 miles",
    rating: 4.0,
    priceRange: "$140-180/night",
    features: ["Restaurant", "Fitness Center", "Business Center", "Parking"],
  },
  {
    name: "Holiday Inn Express Newark Airport",
    distance: "2.5 miles",
    rating: 3.9,
    priceRange: "$110-150/night",
    features: ["Free Breakfast", "Airport Shuttle", "WiFi", "Parking"],
  },
]

export default function VenuePage() {
  const [isScrolled, setIsScrolled] = useState(false)

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

      {/* Hero/Banner Section */}
      <section
        className={`relative bg-gradient-to-br from-purple-600 via-blue-600 to-teal-500 text-white py-32 ${isScrolled ? "pt-44" : ""}`}
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10 pt-48">
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
              Your home away from home
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 text-white drop-shadow-lg leading-tight"
            >
              Venue & Logistics
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg md:text-xl text-white/90 leading-relaxed max-w-3xl"
            >
              Everything you need to know about our convention venue, accommodation options, and travel logistics to
              make your ECI@25 experience seamless and memorable.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Main Venue Information */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
          >
            <motion.div variants={fadeInUp}>
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-teal-600 bg-clip-text text-transparent">
                Convention Venue
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">{venueInfo.name}</h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <MapPin className="h-5 w-5 text-purple-600 mt-1 flex-shrink-0" />
                      <span className="text-gray-600">{venueInfo.address}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-purple-600 flex-shrink-0" />
                      <span className="text-gray-600">{venueInfo.phone}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-purple-600 flex-shrink-0" />
                      <span className="text-gray-600">{venueInfo.email}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(venueInfo.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-gray-600">{venueInfo.rating}/5.0 Rating</span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 leading-relaxed">{venueInfo.description}</p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white">Book Your Stay</Button>
                  <Button
                    variant="outline"
                    className="border-purple-600 text-purple-600 hover:bg-purple-50 bg-transparent"
                  >
                    View Hotel Website
                  </Button>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <div className="relative rounded-lg overflow-hidden shadow-lg">
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="DoubleTree Hotel Newark Airport"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h4 className="text-xl font-bold text-white mb-2">Modern Comfort & Convenience</h4>
                  <p className="text-white/90">Experience exceptional hospitality at our convention venue</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Hotel Features */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-purple-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
              Hotel <span className="text-purple-600">Features</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Discover the exceptional amenities and services that make our venue perfect for ECI@25 attendees.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {venueInfo.keyFeatures.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="bg-purple-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                    <IconComponent className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-800">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-teal-600 bg-clip-text text-transparent">
              Location & Directions
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Find us easily with our interactive map and detailed directions to the convention venue.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="rounded-lg overflow-hidden shadow-lg"
          >
            {/* Google Maps Embed */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095343008!2d-74.19058368459418!3d40.69844797933441!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c253c5b4c3c7a7%3A0x9b8b8b8b8b8b8b8b!2sDoubleTree%20by%20Hilton%20Hotel%20Newark%20Airport!5e0!3m2!1sen!2sus!4v1635959999999!5m2!1sen!2sus"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="DoubleTree Hotel Newark Airport Location"
            ></iframe>
          </motion.div>
        </div>
      </section>

      {/* Transportation Options */}
      <section className="py-20 bg-gradient-to-br from-teal-50 to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
              Transportation <span className="text-teal-600">Options</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Multiple convenient transportation options to reach our venue from anywhere in the region.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="space-y-8"
          >
            {transportationOptions.map((option, index) => {
              const IconComponent = option.icon
              return (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-center">
                    <div className="flex items-center space-x-4">
                      <div className="bg-teal-100 p-4 rounded-full">
                        <IconComponent className="h-8 w-8 text-teal-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">{option.title}</h3>
                        <p className="text-teal-600 font-medium">{option.distance}</p>
                      </div>
                    </div>
                    <div className="lg:col-span-2">
                      <p className="text-gray-600 mb-3">{option.description}</p>
                      <ul className="space-y-1">
                        {option.details.map((detail, dIndex) => (
                          <li key={dIndex} className="text-sm text-gray-500 flex items-start space-x-2">
                            <span className="w-1 h-1 bg-teal-600 rounded-full mt-2 flex-shrink-0"></span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="text-right">
                      <Button
                        variant="outline"
                        className="border-teal-600 text-teal-600 hover:bg-teal-50 bg-transparent"
                      >
                        Get Directions
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Nearby Accommodations */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
              Alternative <span className="text-purple-600">Accommodations</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Additional hotel options near the convention venue for your convenience and comfort.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {nearbyAccommodations.map((hotel, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-gradient-to-br from-gray-50 to-purple-50 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{hotel.name}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{hotel.distance}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < Math.floor(hotel.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span>{hotel.rating}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-purple-600">{hotel.priceRange}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-bold text-gray-800 mb-2">Features & Amenities</h4>
                  <div className="flex flex-wrap gap-2">
                    {hotel.features.map((feature, fIndex) => (
                      <span
                        key={fIndex}
                        className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-medium"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white flex-1">
                    Book Now
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-purple-600 text-purple-600 hover:bg-purple-50 bg-transparent"
                  >
                    View Details
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Important Information */}
      <section className="py-20 bg-gradient-to-br from-purple-600 to-teal-600 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6">Important Information</h2>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto">
              Essential details to help you plan your stay and make the most of your ECI@25 experience.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <motion.div variants={fadeInUp} className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
              <Clock className="h-8 w-8 text-yellow-300 mb-4" />
              <h3 className="text-xl font-bold mb-3">Check-in Information</h3>
              <ul className="space-y-2 text-purple-100">
                <li>• Check-in: 3:00 PM</li>
                <li>• Check-out: 12:00 PM</li>
                <li>• Early check-in available upon request</li>
                <li>• Late check-out may incur additional charges</li>
              </ul>
            </motion.div>

            <motion.div variants={fadeInUp} className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
              <ParkingIcon className="h-8 w-8 text-yellow-300 mb-4" />
              <h3 className="text-xl font-bold mb-3">Parking & Transportation</h3>
              <ul className="space-y-2 text-purple-100">
                <li>• Self-parking: $15/day</li>
                <li>• Valet parking: $25/day</li>
                <li>• Free airport shuttle every 30 minutes</li>
                <li>• Taxi and rideshare readily available</li>
              </ul>
            </motion.div>

            <motion.div variants={fadeInUp} className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
              <Shield className="h-8 w-8 text-yellow-300 mb-4" />
              <h3 className="text-xl font-bold mb-3">Special ECI@25 Rates</h3>
              <ul className="space-y-2 text-purple-100">
                <li>• Group rate: $139/night</li>
                <li>• Booking code: ECI25</li>
                <li>• Rate valid until August 15, 2025</li>
                <li>• Includes complimentary WiFi</li>
              </ul>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 text-lg">
                Book Your Room
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-purple-600 px-8 py-3 text-lg bg-white/10 backdrop-blur-sm"
              >
                Contact Concierge
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
