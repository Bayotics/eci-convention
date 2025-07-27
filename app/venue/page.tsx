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
  X,
  ExternalLink,
  Calendar,
  CreditCard,
  CheckCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

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
    directionsUrl:
      "https://www.google.com/maps/dir/Newark+Liberty+International+Airport+(EWR),+3+Brewster+Rd,+Newark,+NJ+07114/DoubleTree+by+Hilton+Hotel+Newark+Airport,+128+Frontage+Rd,+Newark,+NJ+07114",
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
    directionsUrl:
      "https://www.google.com/maps/dir/Newark+Penn+Station,+Raymond+Blvd,+Newark,+NJ/DoubleTree+by+Hilton+Hotel+Newark+Airport,+128+Frontage+Rd,+Newark,+NJ+07114",
  },
  {
    icon: Car,
    title: "Major Highways",
    distance: "Direct access",
    description: "Easy access to major highways and roadways",
    details: ["I-95 and I-78 highway access", "New Jersey Turnpike (I-95) - Exit 14", "Route 1&9 and Route 21 nearby"],
    directionsUrl:
      "https://www.google.com/maps/dir//DoubleTree+by+Hilton+Hotel+Newark+Airport,+128+Frontage+Rd,+Newark,+NJ+07114",
  },
]

const nearbyAccommodations = [
  {
    name: "Marriott Newark Airport",
    distance: "1.5 miles",
    rating: 4.3,
    priceRange: "$150-200/night",
    features: ["Airport Shuttle", "Restaurant", "Fitness Center", "Business Center"],
    bookingUrl: "https://www.marriott.com/en-us/hotels/ewrap-newark-liberty-international-airport-marriott/overview/",
    image: "/images/marriot.png?height=300&width=400&text=Marriott+Newark+Airport",
    address: "Newark Liberty International Airport, Newark, NJ 07114",
    phone: "+1 (973) 623-0006",
    description:
      "Located directly at Newark Liberty International Airport, this upscale hotel offers modern accommodations with easy access to all terminals. Perfect for travelers seeking convenience and luxury.",
    amenities: [
      "24-hour fitness center",
      "Indoor pool",
      "Business center",
      "Concierge services",
      "Room service",
      "Laundry service",
      "Pet-friendly rooms",
      "Accessible facilities",
    ],
    checkIn: "4:00 PM",
    checkOut: "12:00 PM",
    parking: "$25/day valet parking",
    wifi: "Complimentary high-speed WiFi",
  },
  {
    name: "Hampton Inn & Suites Newark Airport",
    distance: "2.2 miles",
    rating: 4.1,
    priceRange: "$120-160/night",
    features: ["Free Breakfast", "Airport Shuttle", "Pool", "WiFi"],
    bookingUrl:
      "https://www.guestreservations.com/hampton-inn-newark-airport/booking?utm_source=google&utm_medium=cpc&utm_campaign=20352100036&gad_source=1&gad_campaignid=20352100036&gbraid=0AAAAADiMQMYpf0MgWlZHRSrxvmjuLNPZa&gclid=Cj0KCQjwnJfEBhCzARIsAIMtfKL6MNxH1VXaWSRVlWf1uk88pF6CapcmzeofO-HzFjHuJ-Ccf7qWB7IaAke8EALw_wcB",
    image: "/images/hampton.png?height=300&width=400&text=Hampton+Inn+Newark+Airport",
    address: "450 US-1, Newark, NJ 07114",
    phone: "+1 (973) 242-0500",
    description:
      "A comfortable and affordable option featuring complimentary hot breakfast and free airport shuttle service. Ideal for budget-conscious travelers who don't want to compromise on quality.",
    amenities: [
      "Free hot breakfast",
      "24-hour fitness center",
      "Indoor pool",
      "Business center",
      "Meeting rooms",
      "Laundry facilities",
      "Pet-friendly",
      "Accessible rooms",
    ],
    checkIn: "3:00 PM",
    checkOut: "12:00 PM",
    parking: "$15/day self-parking",
    wifi: "Free high-speed WiFi",
  },
  {
    name: "Courtyard Newark Airport",
    distance: "1.8 miles",
    rating: 4.0,
    priceRange: "$140-180/night",
    features: ["Restaurant", "Fitness Center", "Business Center", "Parking"],
    bookingUrl:
      "https://www.guestreservations.com/courtyard-by-marriott-newark-liberty-international-airport/booking?utm_source=google&utm_medium=cpc&utm_campaign=16981602881&gad_source=1&gad_campaignid=16981602881&gbraid=0AAAAADiMQMYKfbvsvoVVj_TdggYIDPYgp&gclid=Cj0KCQjwnJfEBhCzARIsAIMtfKK6at4zkO6nqXr2XgL5hhgoOle2bMQU4-YT4O1zD2sKrVtUeVUpT2MaAiSPEALw_wcB",
    image: "/images/courtyard.jpg?height=300&width=400&text=Courtyard+Newark+Airport",
    address: "600 US-1, Newark, NJ 07114",
    phone: "+1 (973) 643-8500",
    description:
      "Modern hotel designed for business and leisure travelers, featuring spacious rooms and contemporary amenities. The Bistro restaurant serves fresh, healthy options for breakfast and dinner.",
    amenities: [
      "The Bistro restaurant",
      "24-hour fitness center",
      "Business center",
      "Meeting rooms",
      "Market (24-hour)",
      "Laundry service",
      "Accessible facilities",
      "Pet-friendly rooms",
    ],
    checkIn: "3:00 PM",
    checkOut: "12:00 PM",
    parking: "$18/day self-parking",
    wifi: "Complimentary WiFi",
  },
  {
    name: "Holiday Inn Express Newark Airport",
    distance: "2.5 miles",
    rating: 3.9,
    priceRange: "$110-150/night",
    features: ["Free Breakfast", "Airport Shuttle", "WiFi", "Parking"],
    bookingUrl:
      "https://www.guestreservations.com/holiday-inn-newark-intl-airport-north/booking?utm_source=google&utm_medium=cpc&utm_campaign=16981602881&gad_source=1&gad_campaignid=16981602881&gbraid=0AAAAADiMQMYKfbvsvoVVj_TdggYIDPYgp&gclid=Cj0KCQjwnJfEBhCzARIsAIMtfKKrl8qeRbNU8Khc_GTNm_8FzVw7Mdfws1Bwg_aPvStuS5MIlWroCbEaAgwnEALw_wcB",
    image: "/images/holiday-inn.png?height=300&width=400&text=Holiday+Inn+Express+Newark",
    address: "160 Frontage Road, Newark, NJ, 07114, US",
    phone: "+1 (908) 558-2400",
    description:
      "Value-focused hotel offering essential amenities and comfortable accommodations. Features complimentary Express Start breakfast and convenient airport shuttle service.",
    amenities: [
      "Express Start breakfast",
      "Fitness center",
      "Business center",
      "Meeting room",
      "Laundry facilities",
      "24-hour front desk",
      "Accessible rooms",
      "Non-smoking rooms",
    ],
    checkIn: "3:00 PM",
    checkOut: "11:00 AM",
    parking: "$12/day self-parking",
    wifi: "Free WiFi throughout",
  },
]

export default function VenuePage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [selectedHotel, setSelectedHotel] = useState(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const openHotelModal = (hotel) => {
    setSelectedHotel(hotel)
    document.body.style.overflow = "hidden"
  }

  const closeHotelModal = () => {
    setSelectedHotel(null)
    document.body.style.overflow = "unset"
  }

  return (
    <div className="min-h-screen bg-white">
      <TopBar isScrolled={isScrolled} />
      <Header isScrolled={isScrolled} />

      {/* Hero/Banner Section */}
      <section
        className="relative text-white py-12 sm:py-16 md:py-20 lg:py-24"
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
              className="text-sm sm:text-base md:text-lg lg:text-xl italic text-white/90 mb-3 sm:mb-4"
            >
              Your home away from home
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 text-white drop-shadow-lg leading-tight"
            >
              Venue & Logistics
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 leading-relaxed max-w-3xl"
            >
              Everything you need to know about our convention venue, accommodation options, and travel logistics to
              make your ECI@25 experience seamless and memorable.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Main Venue Information */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-start"
          >
            <motion.div variants={fadeInUp}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-purple-600 to-teal-600 bg-clip-text text-transparent">
                Convention Venue
              </h2>
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">
                    {venueInfo.name}
                  </h3>
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex items-start space-x-2 sm:space-x-3">
                      <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600 mt-1 flex-shrink-0" />
                      <span className="text-sm sm:text-base text-gray-600">{venueInfo.address}</span>
                    </div>
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600 flex-shrink-0" />
                      <span className="text-sm sm:text-base text-gray-600">{venueInfo.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600 flex-shrink-0" />
                      <span className="text-sm sm:text-base text-gray-600">{venueInfo.email}</span>
                    </div>
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 sm:h-4 sm:w-4 ${
                              i < Math.floor(venueInfo.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm sm:text-base text-gray-600">{venueInfo.rating}/5.0 Rating</span>
                    </div>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{venueInfo.description}</p>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white w-full sm:w-auto">
                    <Link
                      target="_blank"
                      href={
                        "https://www.hilton.com/en/book/reservation/rooms/?ctyhocn=EWRNADT&arrivalDate=2025-09-18&departureDate=2025-09-21&groupCode=CDTECI&room1NumAdults=1&cid=OM%2CWW%2CHILTONLINK%2CEN%2CDirectLink"
                      }
                    >
                      Book Your Stay
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="border-purple-600 text-purple-600 hover:bg-purple-50 bg-transparent w-full sm:w-auto"
                  >
                    <Link target="_blank" href={"https://www.hilton.com/en/"}>
                      View Hotel Website
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <div className="relative rounded-lg overflow-hidden shadow-lg">
                <img
                  src="/images/venue-page-banner.jpg?height=400&width=600"
                  alt="DoubleTree Hotel Newark Airport"
                  className="w-full h-64 sm:h-80 md:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
                  <h4 className="text-lg sm:text-xl font-bold text-white mb-2">Modern Comfort & Convenience</h4>
                  <p className="text-sm sm:text-base text-white/90">
                    Experience exceptional hospitality at our convention venue
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Hotel Features */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-gray-50 to-purple-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-gray-800">
              Hotel <span className="text-purple-600">Features</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Discover the exceptional amenities and services that make our venue perfect for ECI@25 attendees.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {venueInfo.keyFeatures.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-white p-6 sm:p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="bg-purple-100 p-3 sm:p-4 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mb-4 sm:mb-6">
                    <IconComponent className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-gray-800">{feature.title}</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{feature.description}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-purple-600 to-teal-600 bg-clip-text text-transparent">
              Location & Directions
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
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
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095343008!2d-74.19058368459418!3d40.69844797933441!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c253c5b4c3c7a7%3A0x9b8b8b8b8b8b8b8b!2sDoubleTree%20by%20Hilton%20Hotel%20Newark%20Airport!5e0!3m2!1sen!2sus!4v1635959999999!5m2!1sen!2sus!4v1635959999999!5m2!1sen!2sus"
              width="100%"
              height="350"
              className="sm:h-[400px] md:h-[450px]"
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
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-teal-50 to-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-gray-800">
              Transportation <span className="text-teal-600">Options</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Multiple convenient transportation options to reach our venue from anywhere in the region.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="space-y-6 sm:space-y-8"
          >
            {transportationOptions.map((option, index) => {
              const IconComponent = option.icon
              return (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-white p-6 sm:p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 items-center">
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      <div className="bg-teal-100 p-3 sm:p-4 rounded-full">
                        <IconComponent className="h-6 w-6 sm:h-8 sm:w-8 text-teal-600" />
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-gray-800">{option.title}</h3>
                        <p className="text-sm sm:text-base text-teal-600 font-medium">{option.distance}</p>
                      </div>
                    </div>
                    <div className="lg:col-span-2">
                      <p className="text-sm sm:text-base text-gray-600 mb-2 sm:mb-3">{option.description}</p>
                      <ul className="space-y-1">
                        {option.details.map((detail, dIndex) => (
                          <li key={dIndex} className="text-xs sm:text-sm text-gray-500 flex items-start space-x-2">
                            <span className="w-1 h-1 bg-teal-600 rounded-full mt-2 flex-shrink-0"></span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="text-left lg:text-right">
                      <Button
                        asChild
                        variant="outline"
                        className="border-teal-600 text-teal-600 hover:bg-teal-50 bg-transparent w-full sm:w-auto"
                      >
                        <Link href={option.directionsUrl} target="_blank" rel="noopener noreferrer">
                          Get Directions
                        </Link>
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
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-gray-800">
              Alternative <span className="text-purple-600">Accommodations</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Additional hotel options near the convention venue for your convenience and comfort.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
          >
            {nearbyAccommodations.map((hotel, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-gradient-to-br from-gray-50 to-purple-50 p-6 sm:p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 space-y-2 sm:space-y-0">
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">{hotel.name}</h3>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-xs sm:text-sm text-gray-600 space-y-1 sm:space-y-0">
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span>{hotel.distance}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-2 w-2 sm:h-3 sm:w-3 ${
                                i < Math.floor(hotel.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span>{hotel.rating}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="text-base sm:text-lg font-bold text-purple-600">{hotel.priceRange}</p>
                  </div>
                </div>

                <div className="mb-4 sm:mb-6">
                  <h4 className="text-xs sm:text-sm font-bold text-gray-800 mb-2">Features & Amenities</h4>
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    {hotel.features.map((feature, fIndex) => (
                      <span
                        key={fIndex}
                        className="bg-purple-100 text-purple-700 px-2 sm:px-3 py-1 rounded-full text-xs font-medium"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white flex-1" asChild>
                    <Link href={hotel.bookingUrl} target="_blank" rel="noopener noreferrer">
                      Book Now
                    </Link>
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-purple-600 text-purple-600 hover:bg-purple-50 bg-transparent flex-1 sm:flex-none"
                    onClick={() => openHotelModal(hotel)}
                  >
                    View Details
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Hotel Details Modal */}
      {selectedHotel && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[95vh] overflow-y-auto"
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 sm:p-6 flex justify-between items-center">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">{selectedHotel.name}</h2>
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mt-2 space-y-1 sm:space-y-0">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-purple-600" />
                    <span className="text-xs sm:text-sm text-gray-600">{selectedHotel.distance} from venue</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 sm:h-4 sm:w-4 ${
                          i < Math.floor(selectedHotel.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="text-xs sm:text-sm text-gray-600 ml-1">{selectedHotel.rating}</span>
                  </div>
                </div>
              </div>
              <button onClick={closeHotelModal} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-4 sm:p-6">
              {/* Hotel Image */}
              <div className="mb-6 sm:mb-8">
                <img
                  src={selectedHotel.image || "/placeholder.svg"}
                  alt={selectedHotel.name}
                  className="w-full h-48 sm:h-64 md:h-80 object-cover rounded-lg shadow-lg"
                />
              </div>

              {/* Hotel Info Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
                {/* Left Column - Basic Info */}
                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">Hotel Information</h3>
                    <div className="space-y-2 sm:space-y-3">
                      <div className="flex items-start space-x-2 sm:space-x-3">
                        <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600 mt-1 flex-shrink-0" />
                        <span className="text-sm sm:text-base text-gray-600">{selectedHotel.address}</span>
                      </div>
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600 flex-shrink-0" />
                        <span className="text-sm sm:text-base text-gray-600">{selectedHotel.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <CreditCard className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600 flex-shrink-0" />
                        <span className="text-sm sm:text-base text-gray-600 font-semibold">
                          {selectedHotel.priceRange}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-gray-800 mb-2 sm:mb-3">Description</h4>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{selectedHotel.description}</p>
                  </div>
                </div>

                {/* Right Column - Check-in Info */}
                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">Check-in Details</h3>
                    <div className="space-y-2 sm:space-y-3">
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600 flex-shrink-0" />
                        <div>
                          <span className="text-sm sm:text-base text-gray-600">Check-in: </span>
                          <span className="text-sm sm:text-base font-semibold">{selectedHotel.checkIn}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600 flex-shrink-0" />
                        <div>
                          <span className="text-sm sm:text-base text-gray-600">Check-out: </span>
                          <span className="text-sm sm:text-base font-semibold">{selectedHotel.checkOut}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <ParkingIcon className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600 flex-shrink-0" />
                        <span className="text-sm sm:text-base text-gray-600">{selectedHotel.parking}</span>
                      </div>
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <Wifi className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600 flex-shrink-0" />
                        <span className="text-sm sm:text-base text-gray-600">{selectedHotel.wifi}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Amenities */}
              <div className="mb-6 sm:mb-8">
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">Hotel Amenities</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
                  {selectedHotel.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 flex-shrink-0" />
                      <span className="text-xs sm:text-sm text-gray-600">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-gray-200">
                <Button
                  className="bg-purple-600 hover:bg-purple-700 text-white flex-1 flex items-center justify-center space-x-2"
                  asChild
                >
                  <Link href={selectedHotel.bookingUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span>Book Now</span>
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 flex-1 bg-transparent"
                  onClick={closeHotelModal}
                >
                  Close Details
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Important Information */}
      <section
        className="py-12 sm:py-16 md:py-20 text-white"
        style={{
          backgroundImage: "url('/images/rainbow-vortex.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">Important Information</h2>
            <p className="text-base sm:text-lg md:text-xl text-purple-100 max-w-3xl mx-auto">
              Essential details to help you plan your stay and make the most of your ECI@25 experience.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            <motion.div variants={fadeInUp} className="bg-white/10 backdrop-blur-sm p-4 sm:p-6 rounded-lg">
              <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-300 mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Check-in Information</h3>
              <ul className="space-y-1 sm:space-y-2 text-sm sm:text-base text-purple-100">
                <li>• Check-in: 3:00 PM</li>
                <li>• Check-out: 12:00 PM</li>
                <li>• Early check-in available upon request</li>
                <li>• Late check-out may incur additional charges</li>
              </ul>
            </motion.div>

            <motion.div variants={fadeInUp} className="bg-white/10 backdrop-blur-sm p-4 sm:p-6 rounded-lg">
              <ParkingIcon className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-300 mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Parking & Transportation</h3>
              <ul className="space-y-1 sm:space-y-2 text-sm sm:text-base text-purple-100">
                <li>• Self-parking: $15/day</li>
                <li>• Valet parking: $25/day</li>
                <li>• Free airport shuttle every 30 minutes</li>
                <li>• Taxi and rideshare readily available</li>
              </ul>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="bg-white/10 backdrop-blur-sm p-4 sm:p-6 rounded-lg md:col-span-2 lg:col-span-1"
            >
              <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-300 mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Special ECI@25 Rates</h3>
              <ul className="space-y-1 sm:space-y-2 text-sm sm:text-base text-purple-100">
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
            className="text-center mt-8 sm:mt-12"
          >
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Button
                size="lg"
                className="bg-pink-500 hover:bg-pink-600 text-white px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg"
              >
                <Link
                  target="_blank"
                  href={
                    "https://www.hilton.com/en/book/reservation/rooms/?ctyhocn=EWRNADT&arrivalDate=2025-09-18&departureDate=2025-09-21&groupCode=CDTECI&room1NumAdults=1&cid=OM%2CWW%2CHILTONLINK%2CEN%2CDirectLink"
                  }
                >
                  Book Your Room
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-purple-600 px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg bg-white/10 backdrop-blur-sm"
              >
                <Link href={"https://www.hilton.com/en/help-center/"}>Contact Concierge</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
