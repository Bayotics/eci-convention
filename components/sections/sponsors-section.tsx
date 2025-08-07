"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface Sponsor {
  _id: string
  name: string
  description?: string
  pic?: string
  sponsorshipType: "regular" | "corporate"
  contribution?: {
    type: "monetary" | "in-kind" | "both"
    monetaryAmount?: number
    inKindDescription?: string
  }
  websiteLink?: string
  createdAt: string
  updatedAt: string
}

export function SponsorsSection() {
  const [sponsors, setSponsors] = useState<Sponsor[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        const response = await fetch("/api/sponsors")
        const data = await response.json()
        
        if (data.success) {
          // Filter sponsors that have images (pic property is not empty)
          const sponsorsWithImages = data.data.filter((sponsor: Sponsor) => 
            sponsor.pic && sponsor.pic.trim() !== ""
          )
          setSponsors(sponsorsWithImages)
        } else {
          setError("Failed to fetch sponsors")
        }
      } catch (err) {
        setError("Error loading sponsors")
        console.error("Error fetching sponsors:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchSponsors()
  }, [])

  // Don't render if no sponsors with images or still loading
  if (loading) {
    return (
      <section className="py-20 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-800">Our Sponsors</h2>
            <p className="text-gray-600">Thank you to our generous sponsors who make this event possible</p>
          </div>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          </div>
        </div>
      </section>
    )
  }

  if (error || sponsors.length === 0) {
    return null // Don't show section if no sponsors with images
  }

  // Create duplicate sets for seamless infinite scroll
  // We need at least 2 complete sets to create seamless loop
  const duplicatedSponsors = [...sponsors, ...sponsors]

  // Calculate dimensions
  const cardWidth = 224 // 56 * 4 (w-56 = 14rem = 224px)
  const cardMargin = 48 // mx-6 = 24px on each side = 48px total
  const totalCardWidth = cardWidth + cardMargin
  const totalWidth = sponsors.length * totalCardWidth

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 text-gray-800">Our Sponsors</h2>
          <p className="text-gray-600">Thank you to our generous sponsors who make this event possible</p>
        </motion.div>

        {/* Infinite Slider */}
        <div className="relative overflow-hidden">
          <div 
            className="flex animate-infinite-scroll"
            style={{
              width: `${totalWidth * 2}px`, // Double width for seamless loop
              animation: `infinite-scroll ${Math.max(20, sponsors.length * 2)}s linear infinite`
            }}
          >
            {duplicatedSponsors.map((sponsor, index) => (
              <div 
                key={`${sponsor._id}-${index}`} 
                className="flex-shrink-0 mx-6"
                style={{ width: `${cardWidth}px` }}
              >
                <div className="bg-white rounded-lg p-6 flex flex-col items-center justify-center h-40 hover:bg-gray-50 transition-all duration-300 shadow-md hover:shadow-lg border border-gray-100">
                  {/* Sponsor Image */}
                  <div className="flex-1 flex items-center justify-center w-full mb-3 overflow-hidden">
                    <img
                      src={sponsor.pic || "/placeholder.svg"}
                      alt={`${sponsor.name} logo`}
                      className="max-w-full max-h-20 w-auto h-auto object-contain transition-transform duration-300 hover:scale-105"
                      style={{
                        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                      }}
                      onError={(e) => {
                        // Fallback to placeholder if image fails to load
                        const img = e.currentTarget as HTMLImageElement
                        img.src = "/placeholder.svg?height=80&width=160&text=" + encodeURIComponent(sponsor.name)
                      }}
                      loading="lazy"
                    />
                  </div>
                  
                  {/* Sponsor Name */}
                  <div className="text-center w-full">
                    <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 leading-tight">
                      {sponsor.name}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes infinite-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-${totalWidth}px);
          }
        }
        
        .animate-infinite-scroll:hover {
          animation-play-state: paused;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        @media (max-width: 768px) {
          .animate-infinite-scroll {
            animation-duration: ${Math.max(15, sponsors.length * 1.5)}s !important;
          }
        }

        @media (max-width: 480px) {
          .flex-shrink-0 {
            margin-left: 0.75rem !important;
            margin-right: 0.75rem !important;
            width: 12rem !important;
          }
          
          .h-40 {
            height: 9rem !important;
          }

          @keyframes infinite-scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-${sponsors.length * (192 + 24)}px);
            }
          }
        }
      `}</style>
    </section>
  )
}
