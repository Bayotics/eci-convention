"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export function AboutSection() {
  return (
    <section className="pt-32 pb-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-teal-600 bg-clip-text text-transparent">
            About ECI@25
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            Join us for the 25th Eko Club International Convention, a milestone celebration that brings together
            generations of leaders, innovators, and community builders. This historic gathering in Newark, NJ, will
            showcase our journey of excellence while charting the course for the next 25 years of impact and service to
            our communities worldwide.
          </p>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white">Learn More About ECI</Button>
        </motion.div>
      </div>
    </section>
  )
}
