"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  const [videoLoaded, setVideoLoaded] = useState(false)

  const handleVideoLoad = () => {
    setVideoLoaded(true)
  }

  return (
    <section className="relative text-white py-32 overflow-hidden">
      {/* Fallback Image Background - Shows only when video is not loaded */}
      {!videoLoaded && (
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/hero-fallback.jpg')",
          }}
        />
      )}

      {/* Video Background - Shows when loaded */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          videoLoaded ? "opacity-100" : "opacity-0"
        }`}
        onLoadedData={handleVideoLoad}
        onCanPlayThrough={handleVideoLoad}
      >
        <source
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/eyo-bg-Baj7i77MWFpcAh0aElJT2hP1pHhiI8.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Blue to Pink Gradient Overlay - Only shows when video is loaded */}
      {videoLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/70 via-purple-600/60 to-pink-500/70"></div>
      )}

      {/* Content - Left Aligned */}
      <div className="container mx-auto px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          {/* Small intro text */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl md:text-2xl italic text-white/90 mb-4"
          >
            25th annual convention
          </motion.p>

          {/* Separator border */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="w-[10%] h-1 bg-white/60 mb-6"
            style={{ transformOrigin: "left" }}
          ></motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white drop-shadow-lg leading-tight"
          >
            ECI@25: Bridging Generations, Building Communities!
          </motion.h1>

          {/* Description paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed max-w-3xl"
          >
            Newark, NJ welcomes Eko Club members from around the world for celebration, service and the 25th Eko Club
            International Convention. With its rich cultural diversity and unforgettable experiences at every turn,
            Newark is an exciting destination for our biggest event of the year. Come be part of it all!
          </motion.p>

          {/* Date and Location */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-8 mb-8"
          >
            <div className="flex items-center space-x-2 bg-black/20 backdrop-blur-sm rounded-full px-4 py-2">
              <Calendar className="h-6 w-6" />
              <span className="text-lg">Sept 18-21, 2025</span>
            </div>
            <div className="flex items-center space-x-2 bg-black/20 backdrop-blur-sm rounded-full px-4 py-2">
              <MapPin className="h-6 w-6" />
              <span className="text-lg">Newark, NJ</span>
            </div>
          </motion.div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link href="/register">
              <Button size="lg" className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 text-lg shadow-lg">
                Register Now
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-purple-600 px-8 py-3 text-lg bg-white/10 backdrop-blur-sm shadow-lg"
            >
              Watch Livestream
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
