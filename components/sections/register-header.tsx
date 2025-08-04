"use client"

import { useState, useEffect } from "react"
import { Menu, X, Home } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

export function RegisterHeader() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isContactDropdownOpen, setIsContactDropdownOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 0)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
    setIsContactDropdownOpen(false)
  }

  return (
    <header
      className={`bg-white py-2 px-4 md:px-8 fixed top-0 z-40 w-full shadow-lg main-header-app transition-all duration-300 ease-in-out ${
        isScrolled ? "pt-2" : "md:pt-4 sm:pt-4"
      }`}
    >
      <div className="container mx-auto px-2 md:px-4 pt-3">
        {/* Logo and Language Row */}
        <div className="flex items-center justify-between mb-2 md:mb-4">
          <div className="flex items-center space-x-2 md:space-x-4">
            <Link
              href={"/"}
              className={`flex items-center justify-center flex-shrink-0 transition-all duration-300 ease-in-out ${
                isScrolled ? "w-24" : "w-20 sm:w-28 md:w-36"
              }`}
            >
              <img
                src="/images/eci-logo.png"
                alt="Eko Club International 25th Anniversary Logo"
                className="w-full h-full object-contain"
              />
            </Link>
            <Link href={"/"} className="min-w-0 flex-1">
              <div
                className={`font-black bg-gradient-to-r from-blue-600 via-lime-500 to-pink-500 bg-clip-text text-transparent leading-tight transition-all duration-300 ease-in-out ${
                  isScrolled ? "text-[1.8rem]" : "text-lg sm:text-2xl md:text-3xl lg:text-4xl"
                }`}
              >
                <span className="hidden sm:inline">Eko Club International @ 25</span>
                <span className="sm:hidden">ECI @ 25</span>
              </div>
              <h1
                className={`font-black bg-gradient-to-r from-blue-600 via-lime-500 to-pink-500 bg-clip-text text-transparent leading-tight transition-all duration-300 ease-in-out ${
                  isScrolled ? "text-[1.3rem]" : "text-sm sm:text-lg md:text-xl lg:text-2xl"
                }`}
              >
                <span className="hidden sm:inline">25th International Convention</span>
                <span className="sm:hidden">25th Convention</span>
              </h1>
            </Link>
          </div>

          <div className="flex items-center space-x-2">
            {/* Mobile Hamburger Menu */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 text-gray-700 hover:text-purple-600"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Desktop Navigation Menu Row */}
        <nav className="hidden lg:flex justify-start">
          <div className="flex items-center space-x-6 xl:space-x-8">
            {/* Home Icon */}
            <Link
              href="/"
              className="text-gray-700 hover:text-purple-600 font-bold text-lg xl:text-lg flex items-center"
            >
              <Home className="h-5 w-5" />
            </Link>
            {/* Other Menu Items */}
            <Link href="/about" className="text-gray-700 hover:text-purple-600 font-bold text-lg xl:text-lg">
              About
            </Link>
            <Link href="/agenda" className="text-gray-700 hover:text-purple-600 font-bold text-lg xl:text-lg">
              Agenda
            </Link>
            <Link href="/speakers" className="text-gray-700 hover:text-purple-600 font-bold text-lg xl:text-lg">
              Speakers
            </Link>
            <Link href="/venue" className="text-gray-700 hover:text-purple-600 font-bold text-lg xl:text-lg">
              Venue & Logistics
            </Link>
            <Link href="/sponsors" className="text-gray-700 hover:text-purple-600 font-bold text-lg xl:text-lg">
              Sponsors
            </Link>
            <Link href="/past-events" className="text-gray-700 hover:text-purple-600 font-bold text-lg xl:text-lg">
              Past Events
            </Link>
            {/* Contact Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsContactDropdownOpen(true)}
              onMouseLeave={() => setIsContactDropdownOpen(false)}
            >
              <button className="text-gray-700 hover:text-purple-600 font-bold text-lg xl:text-lg flex items-center">
                Contact
                <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <AnimatePresence>
                {isContactDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50"
                  >
                    <div className="py-2">
                      <Link
                        href="/contact"
                        className="block px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600 font-medium"
                      >
                        Contact Us
                      </Link>
                      <Link
                        href="/faq"
                        className="block px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600 font-medium"
                      >
                        FAQs
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </nav>

        {/* Mobile Navigation Menu */}
        <div
          className={`lg:hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? "max-h-[70vh] opacity-100 overflow-y-auto" : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <nav className="py-4 border-t border-gray-200 mt-2">
            <div className="flex flex-col space-y-3">
              {/* Home Icon */}
              <Link
                href="/"
                onClick={closeMobileMenu}
                className="text-gray-700 hover:text-purple-600 font-medium text-lg py-2 border-b border-gray-100 flex items-center"
              >
                <Home className="h-5 w-5 mr-2" />
                Home
              </Link>
              <Link
                href="/about"
                onClick={closeMobileMenu}
                className="text-gray-700 hover:text-purple-600 font-medium text-lg py-2 border-b border-gray-100"
              >
                About
              </Link>
              <Link
                href="/agenda"
                onClick={closeMobileMenu}
                className="text-gray-700 hover:text-purple-600 font-medium text-lg py-2 border-b border-gray-100"
              >
                Agenda
              </Link>
              <Link
                href="/speakers"
                onClick={closeMobileMenu}
                className="text-gray-700 hover:text-purple-600 font-medium text-lg py-2 border-b border-gray-100"
              >
                Speakers
              </Link>
              <Link
                href="/venue"
                onClick={closeMobileMenu}
                className="text-gray-700 hover:text-purple-600 font-medium text-lg py-2 border-b border-gray-100"
              >
                Venue
              </Link>
              <Link
                href="/sponsors"
                onClick={closeMobileMenu}
                className="text-gray-700 hover:text-purple-600 font-medium text-lg py-2 border-b border-gray-100"
              >
                Sponsors
              </Link>
              <Link
                href="/past-events"
                onClick={closeMobileMenu}
                className="text-gray-700 hover:text-purple-600 font-medium text-lg py-2 border-b border-gray-100"
              >
                Past Events
              </Link>
              {/* Contact Dropdown for Mobile */}
              <div className="border-b border-gray-100">
                <button
                  onClick={() => setIsContactDropdownOpen(!isContactDropdownOpen)}
                  className="w-full text-left text-gray-700 hover:text-purple-600 font-medium text-lg py-2 flex items-center justify-between"
                >
                  Contact
                  <motion.svg
                    animate={{ rotate: isContactDropdownOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </motion.svg>
                </button>

                <AnimatePresence>
                  {isContactDropdownOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden bg-gray-50 rounded-md ml-4 mb-2"
                    >
                      <Link
                        href="/contact"
                        onClick={closeMobileMenu}
                        className="block px-4 py-2 text-gray-600 hover:text-purple-600 font-medium"
                      >
                        Contact Us
                      </Link>
                      <Link
                        href="/faq"
                        onClick={closeMobileMenu}
                        className="block px-4 py-2 text-gray-600 hover:text-purple-600 font-medium"
                      >
                        FAQs
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
