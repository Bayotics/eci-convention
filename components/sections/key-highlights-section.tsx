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

export function KeyHighlightsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
            Get ready to <span className="text-purple-600">make your mark.</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            The international convention happens once a year, and in 2025, we'll celebrate together in Newark, NJ. Get
            ready to be entertained, find inspiration and meet new friends. We'll see you in Newark, where we will
            create unforgettable memories together!
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          <motion.div variants={fadeInUp} className="text-center">
            <div className="mb-6">
              <img
                src="/images/vibrant-community.jpg?height=300&width=400"
                alt="Networking at ECI Convention"
                className="w-full h-64 object-cover rounded-lg shadow-lg"
              />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-800">A vibrant community</h3>
            <p className="text-gray-600 leading-relaxed">
              Experience the incredible blend of cultures, fantastic networking opportunities, lively discussions,
              trendy workshops and iconic theme events that is Newark. Connect with fellow members from around the world
              in this dynamic setting.
            </p>
          </motion.div>

          <motion.div variants={fadeInUp} className="text-center">
            <div className="mb-6">
              <img
                src="/images/convention-calendar.jpg?height=300&width=400"
                alt="Convention Calendar"
                className="w-full h-64 object-cover rounded-lg shadow-lg"
              />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Convention calendar</h3>
            <p className="text-gray-600 leading-relaxed">
              The convention will kick off on Thursday with the Opening Ceremony, followed by engaging panels on Friday.
              On Saturday, July 19, the cultural exhibitions will bring our heritage to life. On Sunday, July 20, the
              presidential inauguration will bring our time in Newark to a close.
            </p>
          </motion.div>

          <motion.div variants={fadeInUp} className="text-center">
            <div className="mb-6">
              <img
                src="/images/program-of-events.jpg?height=300&width=400"
                alt="Program of Events"
                className="w-full h-64 object-cover rounded-lg shadow-lg"
              />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Program of events</h3>
            <p className="text-gray-600 leading-relaxed">
              You can find out all of the great programming Lions have come to expect at international conventions. From
              uplifting keynote speakers and a rockin' International Show to innovative seminars and the Parade of
              Nations, you can be part of it all.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
