"use client"

import { useState } from "react"
import { ChevronDown, Menu, X } from "lucide-react"
import Link from "next/link"

export function RegisterHeader() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <header className="bg-white py-2 md:pt-4 px-4 md:px-8 fixed top-0 z-40 w-full shadow-lg sm:pt-4 main-header-app">
      <div className="container mx-auto px-2 md:px-4 pt-3">
        {/* Logo and Language Row */}
        <div className="flex items-center justify-between mb-2 md:mb-4">
          <div className="flex items-center space-x-2 md:space-x-4">
            <Link href={'/'} className="w-20 sm:w-28 md:w-36 flex items-center justify-center flex-shrink-0">
              <img
                src="/images/eci-logo.png"
                alt="Eko Club International 25th Anniversary Logo"
                className="w-full h-full object-contain"
              />
            </Link>
            <Link href={'/'} className="min-w-0 flex-1">
              <div className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-black bg-gradient-to-r from-blue-600 via-lime-500 to-pink-500 bg-clip-text text-transparent leading-tight">
                <span className="hidden sm:inline">Eko Club International @ 25</span>
                <span className="sm:hidden">ECI @ 25</span>
              </div>
              <h1 className="text-sm sm:text-lg md:text-xl lg:text-2xl font-black bg-gradient-to-r from-blue-600 via-lime-500 to-pink-500 bg-clip-text text-transparent leading-tight">
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
              <Link href="/contact" className="text-gray-700 hover:text-purple-600 font-bold text-lg xl:text-lg">
                Contact Us
              </Link>
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
                href="/contact"
                onClick={closeMobileMenu}
                className="text-gray-700 hover:text-purple-600 font-medium text-lg py-2 border-b border-gray-100"
              >
                Contact Us
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
