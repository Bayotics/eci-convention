"use client"

import { motion } from "framer-motion"

export function SponsorsSection() {
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
        <div className="relative">
          <div className="flex animate-infinite-scroll">
            {/* First set of 6 sponsors */}
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={`set1-${i}`} className="flex-shrink-0 mx-6">
                <div className="bg-gray-100 rounded-lg p-8 flex items-center justify-center h-32 w-56 hover:bg-gray-200 transition-colors shadow-md">
                  <span className="text-gray-500 font-semibold text-lg">Sponsor {i}</span>
                </div>
              </div>
            ))}
            {/* Second set of 6 sponsors for seamless loop */}
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={`set2-${i}`} className="flex-shrink-0 mx-6">
                <div className="bg-gray-100 rounded-lg p-8 flex items-center justify-center h-32 w-56 hover:bg-gray-200 transition-colors shadow-md">
                  <span className="text-gray-500 font-semibold text-lg">Sponsor {i}</span>
                </div>
              </div>
            ))}
            {/* Third set of 6 sponsors for extra smoothness */}
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={`set3-${i}`} className="flex-shrink-0 mx-6">
                <div className="bg-gray-100 rounded-lg p-8 flex items-center justify-center h-32 w-56 hover:bg-gray-200 transition-colors shadow-md">
                  <span className="text-gray-500 font-semibold text-lg">Sponsor {i}</span>
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
            transform: translateX(calc(-100% / 3));
          }
        }
        
        .animate-infinite-scroll {
          animation: infinite-scroll 20s linear infinite;
          width: calc(300% + 144px); /* 3 sets * (6 cards * 224px + 6 gaps * 24px) */
        }
        
        .animate-infinite-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}
