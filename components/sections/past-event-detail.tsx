"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Calendar, MapPin, Play, ArrowLeft, ExternalLink } from "lucide-react"
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

interface PastEventDetailProps {
  eventId: string
}

// Function to extract YouTube video ID from URL
function getYouTubeVideoId(url: string): string | null {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  return match && match[2].length === 11 ? match[2] : null
}

// Function to get YouTube thumbnail URL
function getYouTubeThumbnail(url: string): string {
  const videoId = getYouTubeVideoId(url)
  if (videoId) {
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
  }
  return "/images/hero-fallback.jpg"
}

// Function to format date range
function formatDateRange(dateFrom: string, dateTo: string): string {
  const from = new Date(dateFrom)
  const to = new Date(dateTo)

  const options: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
    year: "numeric",
  }

  if (from.getFullYear() === to.getFullYear()) {
    if (from.getMonth() === to.getMonth()) {
      return `${from.toLocaleDateString("en-US", { month: "long", day: "numeric" })}-${to.getDate()}, ${from.getFullYear()}`
    } else {
      return `${from.toLocaleDateString("en-US", { month: "long", day: "numeric" })} - ${to.toLocaleDateString("en-US", { month: "long", day: "numeric" })}, ${from.getFullYear()}`
    }
  }

  return `${from.toLocaleDateString("en-US", options)} - ${to.toLocaleDateString("en-US", options)}`
}

export function PastEventDetail({ eventId }: PastEventDetailProps) {
  const [event, setEvent] = useState<ConventionEvent | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchEvent() {
      try {
        const response = await fetch(`/api/convention-events/${eventId}`)
        if (!response.ok) {
          throw new Error("Failed to fetch event")
        }
        const data = await response.json()
        setEvent(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchEvent()
  }, [eventId])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 ">
        {/* Hero Section Skeleton */}
        <section className="relative h-[40vh] bg-gray-200 animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40" />
          <div className="relative z-10 flex items-center justify-center h-full">
            <div className="text-center">
              <div className="h-10 bg-gray-300 rounded w-80 mx-auto mb-4"></div>
              <div className="h-6 bg-gray-300 rounded w-64 mx-auto mb-2"></div>
              <div className="h-6 bg-gray-300 rounded w-48 mx-auto"></div>
            </div>
          </div>
        </section>

        {/* Content Section Skeleton */}
        <section className="py-20">
          <div className="container mx-auto px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-lg overflow-hidden animate-pulse">
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-6">
                    <div className="h-6 bg-gray-200 rounded mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    )
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-8">
            <h3 className="text-xl font-semibold text-red-800 mb-2">Error Loading Event</h3>
            <p className="text-red-600 mb-4">{error || "Event not found"}</p>
            <Link href="/past-events">
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Past Events
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[40vh] overflow-hidden mt-24 py-52">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              event.type === "Single" && event.video
                ? `url('${getYouTubeThumbnail(event.video)}')`
                : event.type === "Sectioned" && event.sections && event.sections.length > 0
                  ? `url('${getYouTubeThumbnail(event.sections[0].video)}')`
                  : "url('/images/about-page-banner.jpg')",
          }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />

        {/* Content */}
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-4"
            >
              <Link href="/past-events">
                <Button variant="ghost" className="text-white hover:bg-white/20 mb-4">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Past Events
                </Button>
              </Link>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-3xl md:text-5xl font-bold mb-4"
            >
              {event.type === "Single" ? event.title || event.name : event.name}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 text-lg"
            >
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                <span>{formatDateRange(event.dateFrom, event.dateTo)}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                <span>{event.location}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Videos Section */}
      <section className="py-20">
        <div className="container mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {event.type === "Single" ? "Event Video" : "Event Sessions"}
            </h2>
            <p className="text-lg text-gray-600">
              {event.type === "Single"
                ? "Watch the complete event recording"
                : `${event.sections?.length || 0} sessions from this convention`}
            </p>
          </motion.div>

          {/* Single Event Video */}
          {event.type === "Single" && event.video && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="relative group">
                  <img
                    src={getYouTubeThumbnail(event.video) || "/placeholder.svg"}
                    alt={event.title || event.name}
                    className="w-full h-64 md:h-96 object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = "/images/hero-fallback.jpg"
                    }}
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Link href={event.video} target="_blank" rel="noopener noreferrer">
                      <Button size="lg" className="bg-white/20 backdrop-blur-sm hover:bg-white/30">
                        <Play className="h-6 w-6 mr-2" />
                        Watch on YouTube
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">{event.title || event.name}</h3>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center text-gray-600">
                      <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded">
                        {event.year}
                      </span>
                    </div>
                    <Link href={event.video} target="_blank" rel="noopener noreferrer">
                      <Button>
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Open in YouTube
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Sectioned Event Videos */}
          {event.type === "Sectioned" && event.sections && event.sections.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {event.sections.map((section, index) => (
                <motion.div
                  key={section._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="relative group">
                    <img
                      src={getYouTubeThumbnail(section.video) || "/placeholder.svg"}
                      alt={section.title}
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = "/images/hero-fallback.jpg"
                      }}
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Link href={section.video} target="_blank" rel="noopener noreferrer">
                        <Button size="sm" className="bg-white/20 backdrop-blur-sm hover:bg-white/30">
                          <Play className="h-4 w-4 mr-2" />
                          Watch Video
                        </Button>
                      </Link>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 line-clamp-2">{section.title}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Session {index + 1}</span>
                      <Link href={section.video} target="_blank" rel="noopener noreferrer">
                        <Button size="sm" variant="outline">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Watch
                        </Button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* No Videos Available */}
          {((event.type === "Single" && !event.video) ||
            (event.type === "Sectioned" && (!event.sections || event.sections.length === 0))) && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center py-12"
            >
              <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto">
                <Play className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No Videos Available</h3>
                <p className="text-gray-500 mb-4">Videos for this event are not currently available.</p>
                <Link href="/past-events">
                  <Button variant="outline">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Past Events
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}
