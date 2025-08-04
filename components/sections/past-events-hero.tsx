"use client"

import { motion } from "framer-motion"
import { Calendar, Play } from "lucide-react"

export function PastEventsHero() {
  return (
    <section
      className="relative text-white py-32 mt-24 overflow-hidden"
      style={{
        backgroundImage: "url('/images/past-event-banner.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/80 via-purple-600/70 to-pink-500/80"></div>

      {/* Content */}
      <div className="container mx-auto px-8 relative z-10 text-center">
        <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          {/* Small intro text */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl md:text-2xl italic text-white/90 mb-4"
          >
            Relive the memories
          </motion.p>

          {/* Separator border */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="w-24 h-1 bg-white/60 mb-6 mx-auto"
            style={{ transformOrigin: "center" }}
          ></motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white drop-shadow-lg leading-tight"
          >
            Past Events
          </motion.h1>

          {/* Description paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed max-w-3xl mx-auto"
          >
            Journey through the rich history of Eko Club International conventions.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8"
          >
            <div className="flex items-center space-x-2 bg-black/20 backdrop-blur-sm rounded-full px-4 py-2">
              <Calendar className="h-6 w-6" />
              <span className="text-lg">25 Years of Excellence</span>
            </div>
            <div className="flex items-center space-x-2 bg-black/20 backdrop-blur-sm rounded-full px-4 py-2">
              <Play className="h-6 w-6" />
              <span className="text-lg">Memorable Moments</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
