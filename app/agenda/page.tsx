"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { TopBar } from "@/components/sections/top-bar"
import { Header } from "@/components/sections/header"
import { Footer } from "@/components/sections/footer"
import {
  Clock,
  MapPin,
  Users,
  Search,
  Filter,
  ChevronDown,
  ChevronRight,
  Mic,
  Heart,
  Building,
  Award,
  Plane,
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

// Agenda data organized by day
const agendaData = {
  "2025-09-17": {
    date: "Wednesday, September 17, 2025",
    day: "Day 1",
    theme: "Arrival & Welcome",
    sessions: [
      {
        id: "arrival-1",
        time: "10:00 AM - 6:00 PM",
        title: "Arrival and Registration",
        description: "Welcome to Newark! Check-in at the DoubleTree Hotel and collect your convention materials.",
        location: "Hotel Lobby",
        organizer: "ECI Registration Committee",
        type: "registration",
        icon: Plane,
      },
      {
        id: "welcome-party",
        time: "7:00 PM - 10:00 PM",
        title: "Welcome Party/Eko Club International Cultural Picnic",
        description: "Join us for an evening of cultural celebration, networking, and traditional Nigerian cuisine.",
        location: "Hotel Grand Ballroom",
        organizer: "ECI Northeast Region",
        type: "cultural",
        icon: Heart,
        speakers: ["Regional Coordinators", "Cultural Committee"],
      },
    ],
  },
  "2025-09-18": {
    date: "Thursday, September 18, 2025",
    day: "Day 2",
    theme: "Economic Development & Youth Engagement",
    sessions: [
      {
        id: "registration-2",
        time: "8:00 AM - 10:00 AM",
        title: "Late Registration and Accreditation",
        description: "Final opportunity for registration and credential collection.",
        location: "Registration Desk",
        organizer: "ECI Registration Committee",
        type: "registration",
        icon: Users,
      },
      {
        id: "economic-session",
        time: "10:30 AM - 12:30 PM",
        title: "Economic Advancement Session",
        description: "Exploring opportunities for economic growth and development in Nigeria and the diaspora.",
        location: "Main Conference Hall",
        organizer: "Consular General Office in Collaboration with ECI",
        type: "panel",
        icon: Building,
        speakers: ["Hon. Olatunbosun Alake", "Economic Development Experts"],
      },
      {
        id: "lunch-break",
        time: "12:30 PM - 2:00 PM",
        title: "Networking Lunch",
        description: "Connect with fellow members over a delicious meal.",
        location: "Hotel Restaurant",
        organizer: "ECI Hospitality Committee",
        type: "networking",
        icon: Users,
      },
      {
        id: "landmarks-tour",
        time: "2:30 PM - 5:30 PM",
        title: "Tours of Important Landmarks",
        description: "Guided tours of significant historical and cultural sites in Newark and surrounding areas.",
        location: "Various Locations",
        organizer: "ECI Tourism Committee",
        type: "tour",
        icon: MapPin,
      },
      {
        id: "youth-dinner",
        time: "7:00 PM - 10:00 PM",
        title: "Youth Dinner",
        description: "Special dinner event for young professionals and students to network and engage.",
        location: "Hotel Terrace",
        organizer: "ECI Youth Wing",
        type: "networking",
        icon: Users,
        speakers: ["Youth Leaders", "Mentorship Committee"],
      },
    ],
  },
  "2025-09-19": {
    date: "Friday, September 19, 2025",
    day: "Day 3",
    theme: "Community Service & Spiritual Reflection",
    sessions: [
      {
        id: "community-outreach",
        time: "9:00 AM - 12:00 PM",
        title: "Community Outreach Program",
        description: "Giving back to the Newark community through various service projects and initiatives.",
        location: "Local Community Centers",
        organizer: "ECI Community Service Committee",
        type: "service",
        icon: Heart,
        speakers: ["Community Leaders", "Service Coordinators"],
      },
      {
        id: "jumaat-prayer",
        time: "1:00 PM - 2:30 PM",
        title: "Jumaat Prayer",
        description: "Friday congregational prayers for Muslim members of the community.",
        location: "Hotel Prayer Room/Local Mosque",
        organizer: "ECI Islamic Affairs Committee",
        type: "religious",
        icon: Building,
      },
      {
        id: "town-hall",
        time: "3:00 PM - 5:00 PM",
        title: "Town Hall Meeting",
        description: "Open forum for members to discuss important issues and share feedback.",
        location: "Main Conference Hall",
        organizer: "ECI Executive Committee",
        type: "meeting",
        icon: Mic,
        speakers: ["Current Executive Committee", "Regional Representatives"],
      },
      {
        id: "presidential-banquet",
        time: "7:00 PM - 11:00 PM",
        title: "Presidential/Fundraising/Award Night Banquet",
        description: "Elegant evening celebrating achievements and raising funds for ECI initiatives.",
        location: "Grand Ballroom",
        organizer: "ECI Executive Committee",
        type: "gala",
        icon: Award,
        speakers: ["Current President", "Award Recipients", "Distinguished Guests"],
      },
    ],
  },
  "2025-09-20": {
    date: "Saturday, September 20, 2025",
    day: "Day 4",
    theme: "Health, Governance & Celebration",
    sessions: [
      {
        id: "walk-for-life",
        time: "7:00 AM - 9:00 AM",
        title: "Walk For Life",
        description: "Community health and wellness walk promoting healthy living and unity.",
        location: "Hotel Surroundings/Local Park",
        organizer: "ECI Health & Wellness Committee",
        type: "wellness",
        icon: Heart,
        speakers: ["Health Advocates", "Fitness Coordinators"],
      },
      {
        id: "general-sessions",
        time: "10:00 AM - 12:00 PM",
        title: "General Sessions",
        description: "Important presentations and discussions on ECI's future direction and initiatives.",
        location: "Main Conference Hall",
        organizer: "ECI Executive Committee",
        type: "session",
        icon: Mic,
        speakers: ["Executive Members", "Committee Chairs"],
      },
      {
        id: "general-meeting",
        time: "2:00 PM - 4:00 PM",
        title: "General Meeting and Executive Committee Dissolution",
        description: "Official business meeting and formal dissolution of current executive committee.",
        location: "Main Conference Hall",
        organizer: "ECI Electoral Committee",
        type: "meeting",
        icon: Users,
        speakers: ["Electoral Committee", "Current Executive"],
      },
      {
        id: "electioneering",
        time: "4:30 PM - 6:30 PM",
        title: "Electioneering Process",
        description: "Candidate presentations and voting for new executive committee members.",
        location: "Main Conference Hall",
        organizer: "ECI Electoral Committee",
        type: "election",
        icon: Users,
        speakers: ["Electoral Committee", "Candidates"],
      },
      {
        id: "gala-inauguration",
        time: "8:00 PM - 12:00 AM",
        title: "Gala Night and New Executive Committee Inauguration",
        description: "Grand celebration and official inauguration of newly elected executive committee.",
        location: "Grand Ballroom",
        organizer: "ECI Organizing Committee",
        type: "gala",
        icon: Award,
        speakers: ["Newly Elected Executive", "Distinguished Guests", "Entertainment"],
      },
    ],
  },
  "2025-09-21": {
    date: "Sunday, September 21, 2025",
    day: "Day 5",
    theme: "Spiritual Reflection & Farewell",
    sessions: [
      {
        id: "church-service",
        time: "9:00 AM - 11:00 AM",
        title: "Interdenominational Church Service",
        description: "Sunday worship service bringing together members of all Christian denominations.",
        location: "Hotel Conference Hall/Local Church",
        organizer: "ECI Christian Fellowship Committee",
        type: "religious",
        icon: Building,
        speakers: ["Guest Ministers", "ECI Chaplains"],
      },
      {
        id: "final-session",
        time: "12:00 PM - 2:00 PM",
        title: "Closing Session and Final Remarks",
        description: "Official closing of ECI@25 with final remarks and appreciation.",
        location: "Main Conference Hall",
        organizer: "New ECI Executive Committee",
        type: "closing",
        icon: Mic,
        speakers: ["New President", "Convention Organizers"],
      },
      {
        id: "departure",
        time: "3:00 PM onwards",
        title: "Departure of Participants",
        description: "Check-out and departure arrangements for all convention attendees.",
        location: "Hotel Lobby",
        organizer: "ECI Logistics Committee",
        type: "departure",
        icon: Plane,
      },
    ],
  },
}

const sessionTypes = {
  registration: { color: "bg-blue-100 text-blue-700", label: "Registration" },
  cultural: { color: "bg-orange-100 text-orange-700", label: "Cultural" },
  panel: { color: "bg-purple-100 text-purple-700", label: "Panel Discussion" },
  networking: { color: "bg-green-100 text-green-700", label: "Networking" },
  tour: { color: "bg-teal-100 text-teal-700", label: "Tour" },
  service: { color: "bg-pink-100 text-pink-700", label: "Community Service" },
  religious: { color: "bg-indigo-100 text-indigo-700", label: "Religious" },
  meeting: { color: "bg-gray-100 text-gray-700", label: "Meeting" },
  gala: { color: "bg-yellow-100 text-yellow-700", label: "Gala Event" },
  wellness: { color: "bg-red-100 text-red-700", label: "Wellness" },
  session: { color: "bg-cyan-100 text-cyan-700", label: "General Session" },
  election: { color: "bg-violet-100 text-violet-700", label: "Election" },
  closing: { color: "bg-emerald-100 text-emerald-700", label: "Closing" },
  departure: { color: "bg-slate-100 text-slate-700", label: "Departure" },
}

export default function AgendaPage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeDay, setActiveDay] = useState<string | null>("2025-09-18")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const filteredAgenda = Object.entries(agendaData).reduce(
    (acc, [date, dayData]) => {
      const filteredSessions = dayData.sessions.filter((session) => {
        const matchesSearch =
          session.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          session.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          session.organizer.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesFilter = selectedFilter === "all" || session.type === selectedFilter

        return matchesSearch && matchesFilter
      })

      if (filteredSessions.length > 0) {
        acc[date] = { ...dayData, sessions: filteredSessions }
      }

      return acc
    },
    {} as typeof agendaData,
  )

  return (
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
              Your complete guide to ECI@25
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 text-white drop-shadow-lg leading-tight"
            >
              Convention Agenda
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg md:text-xl text-white/90 leading-relaxed max-w-3xl"
            >
              Discover the full schedule of events, sessions, and activities planned for our historic 25th anniversary
              convention from September 17-21, 2025.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row gap-4 items-center justify-between"
          >
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search sessions, speakers, or topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center space-x-4">
              <Filter className="h-5 w-5 text-gray-600" />
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">All Events</option>
                <option value="panel">Panel Discussions</option>
                <option value="networking">Networking</option>
                <option value="cultural">Cultural Events</option>
                <option value="gala">Gala Events</option>
                <option value="religious">Religious Services</option>
                <option value="service">Community Service</option>
              </select>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Daily Agenda Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-teal-600 bg-clip-text text-transparent">
              5-Day Convention Schedule
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Explore our comprehensive agenda featuring inspiring sessions, cultural celebrations, and networking
              opportunities.
            </p>
          </motion.div>

          <div className="space-y-6">
            {Object.entries(filteredAgenda).map(([date, dayData], index) => (
              <motion.div
                key={date}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden"
              >
                {/* Day Header */}
                <button
                  onClick={() => setActiveDay(activeDay === date ? null : date)}
                  className="w-full px-6 py-6 bg-gradient-to-r from-purple-50 to-teal-50 hover:from-purple-100 hover:to-teal-100 transition-colors flex items-center justify-between"
                >
                  <div className="flex items-center space-x-4">
                    <div className="bg-purple-600 text-white px-4 py-2 rounded-lg font-bold">{dayData.day}</div>
                    <div className="text-left">
                      <h3 className="text-xl font-bold text-gray-800">{dayData.date}</h3>
                      <p className="text-purple-600 font-medium">{dayData.theme}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">{dayData.sessions.length} sessions</span>
                    {activeDay === date ? (
                      <ChevronDown className="h-5 w-5 text-gray-600" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-gray-600" />
                    )}
                  </div>
                </button>

                {/* Day Sessions */}
                <AnimatePresence>
                  {activeDay === date && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 space-y-6">
                        {dayData.sessions.map((session, sessionIndex) => {
                          const IconComponent = session.icon
                          const typeInfo = sessionTypes[session.type as keyof typeof sessionTypes]

                          return (
                            <motion.div
                              key={session.id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.4, delay: sessionIndex * 0.1 }}
                              className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow"
                            >
                              <div className="flex items-start space-x-4">
                                <div className="bg-purple-100 p-3 rounded-full flex-shrink-0">
                                  <IconComponent className="h-6 w-6 text-purple-600" />
                                </div>
                                <div className="flex-1">
                                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3">
                                    <div>
                                      <h4 className="text-xl font-bold text-gray-800 mb-2">{session.title}</h4>
                                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                                        <div className="flex items-center space-x-1">
                                          <Clock className="h-4 w-4" />
                                          <span>{session.time}</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                          <MapPin className="h-4 w-4" />
                                          <span>{session.location}</span>
                                        </div>
                                      </div>
                                    </div>
                                    <span
                                      className={`px-3 py-1 rounded-full text-xs font-medium ${typeInfo.color} whitespace-nowrap`}
                                    >
                                      {typeInfo.label}
                                    </span>
                                  </div>

                                  <p className="text-gray-600 leading-relaxed mb-4">{session.description}</p>

                                  <div className="space-y-2">
                                    <div className="flex items-start space-x-2">
                                      <Users className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                                      <div>
                                        <span className="text-sm font-medium text-gray-700">Organized by: </span>
                                        <span className="text-sm text-gray-600">{session.organizer}</span>
                                      </div>
                                    </div>

                                    {session.speakers && session.speakers.length > 0 && (
                                      <div className="flex items-start space-x-2">
                                        <Mic className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                                        <div>
                                          <span className="text-sm font-medium text-gray-700">Speakers: </span>
                                          <span className="text-sm text-gray-600">{session.speakers.join(", ")}</span>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          )
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-br from-purple-600 to-teal-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">Ready to Join Us?</h2>
            <p className="text-xl mb-8 text-purple-100 max-w-3xl mx-auto">
              Don't miss out on this historic celebration. Register now to secure your spot at ECI@25 and be part of our
              incredible journey.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 text-lg">
                Register Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-purple-600 px-8 py-3 text-lg bg-white/10 backdrop-blur-sm"
              >
                Download Full Schedule
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
