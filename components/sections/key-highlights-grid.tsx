"use client"

import { motion } from "framer-motion"
import { Network, Mic, Camera, PartyPopper } from "lucide-react"

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

export function KeyHighlightsGrid() {
  return (
    <section className="relative -mt-20 z-20">
      <div className="container mx-auto px-4">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 max-w-6xl mx-auto shadow-2xl"
        >
          <motion.div
            variants={fadeInUp}
            className="bg-gradient-to-br from-orange-400 to-orange-600 text-white p-12 flex flex-col items-center text-center"
          >
            <Network className="h-16 w-16 mb-4" />
            <h3 className="text-2xl font-bold mb-2">Connect with fellow members</h3>
            <p className="text-orange-100">Network and build lasting relationships</p>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="bg-gradient-to-br from-purple-500 to-purple-700 text-white p-12 flex flex-col items-center text-center"
          >
            <Mic className="h-16 w-16 mb-4" />
            <h3 className="text-2xl font-bold mb-2">Engaging Panels</h3>
            <p className="text-purple-100">Inspiring discussions and insights</p>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="bg-gradient-to-br from-pink-500 to-red-500 text-white p-12 flex flex-col items-center text-center"
          >
            <Camera className="h-16 w-16 mb-4" />
            <h3 className="text-2xl font-bold mb-2">Cultural Exhibitions</h3>
            <p className="text-pink-100">Celebrate our rich heritage</p>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="bg-gradient-to-br from-teal-400 to-teal-600 text-white p-12 flex flex-col items-center text-center"
          >
            <PartyPopper className="h-16 w-16 mb-4" />
            <h3 className="text-2xl font-bold mb-2">Gala Night</h3>
            <p className="text-teal-100">An unforgettable celebration</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
