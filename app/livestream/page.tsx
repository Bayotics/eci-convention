"use client"

import { motion } from "framer-motion"
import { Header } from "@/components/sections/header"
import { Footer } from "@/components/sections/footer"
import { TopBar } from "@/components/sections/top-bar"


export default function LiveStream () {
  return (
    <div>
        <TopBar />
        <Header />
<section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 via-purple-700 to-pink-600 text-white px-4 py-12 mt-44">
      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-3xl md:text-5xl font-bold mb-6 text-center drop-shadow-lg"
      >
        Watch Our Live Stream
      </motion.h1>

      {/* Subheading */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-lg md:text-xl mb-8 max-w-2xl text-center text-white/90"
      >
        Join us live as we celebrate and connect with our global community. Stay tuned and enjoy the event in real time!
      </motion.p>

      {/* Responsive Video Wrapper */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="w-full max-w-5xl aspect-video rounded-xl overflow-hidden shadow-2xl border border-white/20"
      >
        <iframe
          className="w-full h-full"
          src="https://www.youtube.com/embed/Zxu_xKozyLk"
          title="YouTube Live Stream"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </motion.div>
    </section>
    <Footer />
    </div>
    
  )
}
