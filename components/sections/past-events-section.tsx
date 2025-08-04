"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Calendar, MapPin, Play, Users, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface Section {
  _id: string
  title: string
  video: string
}

interface ConventionEvent {
  _id: string
  name: string
  location: string
  dateFrom: string
  dateTo: string
  year: number
  type: "Single" | "Sectioned"
  title?: string
  video?: string
  sections?: Section[]
}

// Function to extract YouTube video ID from URL
function getYouTubeVideoId(url: string): string | null {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  return match && match[2].length === 11 ? match[2] : null
}

// Function to get YouTube thumbnail URL with fallback options
function getYouTubeThumbnail(url: string): string {
  const videoId = getYouTubeVideoId(url)
  if (videoId) {
    // Try maxresdefault first, but we'll handle fallbacks in the component
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
  }
  return "/images/hero-fallback.jpg"
}

// Function to format date range
function formatDateRange(dateFrom: string, dateTo: string): string {
  const from = new Date(dateFrom)
  const to = new Date(dateTo)

  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  }

  if (from.getFullYear() === to.getFullYear()) {
    if (from.getMonth() === to.getMonth()) {
      return `${from.toLocaleDateString("en-US", { month: "short", day: "numeric" })}-${to.getDate()}, ${from.getFullYear()}`
    } else {
      return `${from.toLocaleDateString("en-US", { month: "short", day: "numeric" })} - ${to.toLocaleDateString("en-US", { month: "short", day: "numeric" })}, ${from.getFullYear()}`
    }
  }

  return `${from.toLocaleDateString("en-US", options)} - ${to.toLocaleDateString("en-US", options)}`
}

export function PastEventsSection() {
  const [events, setEvents] = useState<ConventionEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedYear, setSelectedYear] = useState<number | null>(null)

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch("/api/convention-events")
        if (!response.ok) {
          throw new Error("Failed to fetch events")
        }
        const data = await response.json()
        setEvents(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-8">
          <div className="text-center mb-12">
            <div className="animate-pulse h-8 bg-gray-200 rounded w-64 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-lg overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-200 rounded mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-8 text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-8">
            <h3 className="text-xl font-semibold text-red-800 mb-2">Error Loading Events</h3>
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </section>
    )
  }

  // Get unique years for filtering
  const years = [...new Set(events.map((event) => event.year))].sort((a, b) => b - a)

  // Filter events by selected year
  const filteredEvents = selectedYear ? events.filter((event) => event.year === selectedYear) : events

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Convention History</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our rich heritage of conventions, celebrations, and community building events
          </p>
        </motion.div>

        {/* Year Filter */}
        {years.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-2 mb-12"
          >
            <Button
              variant={selectedYear === null ? "default" : "outline"}
              onClick={() => setSelectedYear(null)}
              className="mb-2"
            >
              All Years
            </Button>
            {years.map((year) => (
              <Button
                key={year}
                variant={selectedYear === year ? "default" : "outline"}
                onClick={() => setSelectedYear(year)}
                className="mb-2"
              >
                {year}
              </Button>
            ))}
          </motion.div>
        )}

        {/* Events Grid */}
        {filteredEvents.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center py-12"
          >
            <div className="bg-white rounded-lg shadow-lg p-8">
              <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No Events Found</h3>
              <p className="text-gray-500">
                {selectedYear
                  ? `No events found for ${selectedYear}. Try selecting a different year.`
                  : "No past events are currently available."}
              </p>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                {/* Event Type: Single */}
                {event.type === "Single" && event.video && (
                  <>
                    <div className="relative group">
                      <img
                        src={getYouTubeThumbnail(event.video) || "/placeholder.svg"}
                        alt={event.title || event.name}
                        className="w-full h-48 object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.src = "/images/hero-fallback.jpg"
                        }}
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <Link href={event.video} target="_blank" rel="noopener noreferrer">
                          <Button size="sm" className="bg-white/20 backdrop-blur-sm hover:bg-white/30">
                            <Play className="h-4 w-4 mr-2" />
                            Watch Video
                          </Button>
                        </Link>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{event.title || event.name}</h3>
                      <div className="flex items-center text-gray-600 mb-2">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span className="text-sm">{formatDateRange(event.dateFrom, event.dateTo)}</span>
                      </div>
                      <div className="flex items-center text-gray-600 mb-4">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span className="text-sm">{event.location}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                          {event.year}
                        </span>
                        <Link href={`/past-events/${event._id}`}>
                          <Button size="sm" variant="outline">
                            <ArrowRight className="h-4 w-4 mr-2" />
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </>
                )}

                {/* Event Type: Sectioned */}
                {event.type === "Sectioned" && event.sections && event.sections.length > 0 && (
                  <>
                    <div className="relative group">
                      <img
                        src={getYouTubeThumbnail(event.sections[0].video) || "/placeholder.svg"}
                        alt={event.name}
                        className="w-full h-48 object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.src = "/images/hero-fallback.jpg"
                        }}
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                          <Users className="h-4 w-4 text-white" />
                          <span className="text-white text-sm">{event.sections.length} Sessions</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{event.name}</h3>
                      <div className="flex items-center text-gray-600 mb-2">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span className="text-sm">{formatDateRange(event.dateFrom, event.dateTo)}</span>
                      </div>
                      <div className="flex items-center text-gray-600 mb-4">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span className="text-sm">{event.location}</span>
                      </div>

                      {/* Sections Preview */}
                      <div className="mb-4">
                        <p className="text-sm text-gray-500 mb-2">Featured Sessions:</p>
                        <div className="space-y-1">
                          {event.sections.slice(0, 2).map((section) => (
                            <div key={section._id} className="flex items-center justify-between text-sm">
                              <span className="text-gray-700 truncate">{section.title}</span>
                              <Link href={section.video} target="_blank" rel="noopener noreferrer">
                                <Button size="sm" variant="ghost" className="h-6 px-2">
                                  <Play className="h-3 w-3" />
                                </Button>
                              </Link>
                            </div>
                          ))}
                          {event.sections.length > 2 && (
                            <p className="text-xs text-gray-500">+{event.sections.length - 2} more sessions</p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">
                          {event.year}
                        </span>
                        <Link href={`/past-events/${event._id}`}>
                          <Button size="sm" variant="outline">
                            <ArrowRight className="h-4 w-4 mr-2" />
                            View All
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </>
                )}

                {/* Fallback for events without videos */}
                {((event.type === "Single" && !event.video) ||
                  (event.type === "Sectioned" && (!event.sections || event.sections.length === 0))) && (
                  <>
                    <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                      <div className="text-center">
                        <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500 text-sm">No video available</p>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{event.name}</h3>
                      <div className="flex items-center text-gray-600 mb-2">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span className="text-sm">{formatDateRange(event.dateFrom, event.dateTo)}</span>
                      </div>
                      <div className="flex items-center text-gray-600 mb-4">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span className="text-sm">{event.location}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
                          {event.year}
                        </span>
                        <Link href={`/past-events/${event._id}`}>
                          <Button size="sm" variant="outline">
                            <ArrowRight className="h-4 w-4 mr-2" />
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
