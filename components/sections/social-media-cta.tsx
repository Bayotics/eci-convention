"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"
import Link from "next/link"

export function SocialMediaCTA() {
  return (
    <section className="py-20 bg-gradient-to-r from-teal-500 to-purple-600 text-white">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-6">Stay Connected</h2>
          <p className="text-xl mb-8 text-teal-100">Follow us for the latest updates and behind-the-scenes content</p>

          <div className="flex justify-center space-x-6 mb-12">
            <Link href="#" className="bg-white/20 hover:bg-white/30 p-4 rounded-full transition-colors">
              <Facebook className="h-8 w-8" />
            </Link>
            <Link href="#" className="bg-white/20 hover:bg-white/30 p-4 rounded-full transition-colors">
              <Instagram className="h-8 w-8" />
            </Link>
            <Link href="#" className="bg-white/20 hover:bg-white/30 p-4 rounded-full transition-colors">
              <Twitter className="h-8 w-8" />
            </Link>
            <Link href="#" className="bg-white/20 hover:bg-white/30 p-4 rounded-full transition-colors">
              <Youtube className="h-8 w-8" />
            </Link>
          </div>

          <Button size="lg" className="bg-pink-500 hover:bg-pink-600 text-white px-12 py-4 text-lg">
            Register for ECI@25
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
