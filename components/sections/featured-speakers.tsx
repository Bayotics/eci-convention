"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Users } from "lucide-react"

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

export function FeaturedSpeakers() {
  return (
    <section className="py-20 bg-gradient-to-br from-purple-600 to-purple-800 text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Featured Speakers</h2>
          <p className="text-purple-200">Hear from our distinguished guests and leaders</p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          <motion.div variants={fadeInUp} className="text-center">
            <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-pink-400 to-purple-600 flex items-center justify-center">
              <Users className="h-16 w-16 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Olatunbosun Alake</h3>
            <p className="text-purple-200">Distinguished Leader & Keynote Speaker</p>
          </motion.div>

          <motion.div variants={fadeInUp} className="text-center">
            <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-teal-400 to-blue-600 flex items-center justify-center">
              <Users className="h-16 w-16 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Gov. Sanwo-Olu</h3>
            <p className="text-purple-200">Special Guest Speaker</p>
          </motion.div>

          <motion.div variants={fadeInUp} className="text-center md:col-span-2 lg:col-span-1">
            <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-orange-400 to-red-600 flex items-center justify-center">
              <Users className="h-16 w-16 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">More Speakers</h3>
            <p className="text-purple-200">Additional distinguished guests to be announced</p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-purple-600 bg-transparent"
          >
            View All Speakers
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
