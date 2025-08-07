"use client"

import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <Link href={'/'}>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 flex items-center justify-center">
                <img
                  src="/images/eci-logo.png"
                  alt="Eko Club International Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xl font-bold">Eko Club International</span>
            </div>
            <p className="text-gray-400">Bridging Generations, Building Communities</p>
          </Link>
          <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/about" className="hover:text-white">
                  About ECI
                </Link>
              </li>
              <li>
                <Link href="/agenda" className="hover:text-white">
                  Event Agenda
                </Link>
              </li>
              <li>
                <Link href="/speakers" className="hover:text-white">
                  Speakers
                </Link>
              </li>
              <li>
                <Link href="/venue" className="hover:text-white">
                  Venue Info
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Support</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/contact" className="hover:text-white">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/sponsors" className="hover:text-white">
                  Become a Sponsor
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Contact Info</h3>
            <div className="text-gray-400 space-y-2">
              <p>Convention Chairman</p>
              <p>waletayo2000@yahoo.com</p>
              <p>+1 (555) 123-4567</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Eko Club International. All rights reserved</p>
        </div>
        <div className="mt-4 text-xs text-gray-500 text-center">Design and development by <a className="underline" target="_blank" href="https://abdullahi-shobaloju.vercel.app/"> Abdullahi Sho</a></div>
      </div>
    </footer>
  )
}
