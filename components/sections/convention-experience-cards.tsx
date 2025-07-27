"use client"

import { motion } from "framer-motion"

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

export function ConventionExperienceCards() {
  return (
    <section className="py-0">
      <motion.div
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="grid grid-cols-2 h-auto"
      >
        {/* Top Left - Engaging Panels (Caption Left, Image Right) */}
        <motion.div variants={fadeInUp} className="flex flex-col md:flex-row min-h-[50vh]">
          <div className="w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-gradient-to-br from-orange-500 to-orange-600 text-white">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">Engaging Panels</h3>
            <p className="text-orange-100 leading-relaxed text-lg">
              Participate in thought-provoking discussions and panels featuring industry leaders and experts sharing
              insights on community building and leadership.
            </p>
          </div>
          <div className="w-1/2">
            <img
              src="/images/engaging-panels.jpg?height=400&width=600"
              alt="Engaging Panels"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* Top Right - Cultural Exhibitions (Caption Left, Image Right) */}
        <motion.div variants={fadeInUp} className="flex flex-col md:flex-row min-h-[50vh]">
          <div className="w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-gradient-to-br from-purple-600 to-purple-700 text-white">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">Cultural Exhibitions</h3>
            <p className="text-purple-100 leading-relaxed text-lg">
              Celebrate our rich heritage through vibrant cultural exhibitions showcasing traditional arts, music, and
              performances from our diverse communities.
            </p>
          </div>
          <div className="w-1/2">
            <img
              src="/images/cultural-exhibitions.jpg?height=400&width=600"
              alt="Cultural Exhibitions"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* Bottom Left - Networking (Image Left, Caption Right) */}
        <motion.div variants={fadeInUp} className="flex flex-col md:flex-row min-h-[50vh]">
          <div className="w-1/2">
            <img
              src="/images/networking.jpg?height=400&width=600"
              alt="Networking among members"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-gradient-to-br from-teal-500 to-teal-600 text-white">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">Networking among members</h3>
            <p className="text-teal-100 leading-relaxed text-lg">
              Connect with fellow members from around the world, build lasting relationships, and expand your
              professional network in meaningful ways.
            </p>
          </div>
        </motion.div>

        {/* Bottom Right - Gala (Image Left, Caption Right) */}
        <motion.div variants={fadeInUp} className="flex flex-col md:flex-row min-h-[50vh]">
          <div className="w-1/2">
            <img src="/images/gala.jpg?height=400&width=600" alt="Gala Night" className="w-full h-full object-cover" />
          </div>
          <div className="w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-gradient-to-br from-pink-500 to-red-500 text-white">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">Gala</h3>
            <p className="text-pink-100 leading-relaxed text-lg">
              Experience an unforgettable gala night celebration with elegant dining, entertainment, and recognition of
              outstanding achievements within our community.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
