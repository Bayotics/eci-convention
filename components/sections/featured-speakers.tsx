"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"

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
    <section
      className="py-20 text-white relative overflow-hidden"
      style={{
        backgroundImage: "url('/images/speakers-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Optional overlay for better text readability */}
      <div className="absolute inset-0 bg-black/20"></div>

      <div className="container mx-auto px-4 relative z-10 pt-20">
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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-7xl mx-auto"
        >
          {/* President Bola Ahmed Tinubu */}
          <motion.div variants={fadeInUp} className="text-center">
            <div className="w-48 h-48 sm:w-52 sm:h-52 lg:w-56 lg:h-56 mx-auto mb-4 rounded-full bg-gradient-to-br from-yellow-400 to-orange-600 flex items-center justify-center overflow-hidden shadow-lg">
              <img
                src="/images/TINUBU-7.jpg?height=224&width=224"
                alt="H.E. Bola Ahmed Tinubu"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-2 px-2">H.E. Bola Ahmed Tinubu</h3>
            <p className="text-purple-200 text-sm sm:text-base px-2">President, Federal Republic of Nigeria</p>
          </motion.div>

          {/* Gov. Sanwo-Olu */}
          <motion.div variants={fadeInUp} className="text-center">
            <div className="w-48 h-48 sm:w-52 sm:h-52 lg:w-56 lg:h-56 mx-auto mb-4 rounded-full bg-gradient-to-br from-teal-400 to-blue-600 flex items-center justify-center overflow-hidden shadow-lg">
              <img src="/images/sanwoolu.jpg" alt="Gov. Sanwo-Olu" className="w-full h-full object-cover" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-2 px-2">Gov. Sanwo-Olu</h3>
            <p className="text-purple-200 text-sm sm:text-base px-2">Executive Governor, Lagos State</p>
          </motion.div>

          {/* Olayemi Cardoso */}
          <motion.div variants={fadeInUp} className="text-center">
            <div className="w-48 h-48 sm:w-52 sm:h-52 lg:w-56 lg:h-56 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center overflow-hidden shadow-lg">
              <img
                src="/images/cardoso.png?height=224&width=224"
                alt="Mr. Olayemi Cardoso"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-2 px-2">Mr. Olayemi Cardoso</h3>
            <p className="text-purple-200 text-sm sm:text-base px-2">Governor, Central Bank of Nigeria</p>
          </motion.div>

          {/* Dr. Tunji Alausa */}
          <motion.div variants={fadeInUp} className="text-center">
            <div className="w-48 h-48 sm:w-52 sm:h-52 lg:w-56 lg:h-56 mx-auto mb-4 rounded-full bg-gradient-to-br from-pink-400 to-purple-600 flex items-center justify-center overflow-hidden shadow-lg">
              <img
                src="/images/Tunji-Alausa.jpg?height=224&width=224"
                alt="Dr. Tunji Alausa"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-2 px-2">Dr. Tunji Alausa</h3>
            <p className="text-purple-200 text-sm sm:text-base px-2">
              Hon. Minister of Education, Federal Republic of Nigeria
            </p>
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
            <Link href={"/speakers"}>View All Speakers</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
