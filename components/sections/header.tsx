"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown, Menu, X } from "lucide-react"
import Link from "next/link"

export function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <header className="bg-white py-2 md:pt-12 px-4 md:px-8 fixed top-[44px] z-40 w-full shadow-lg sm:pt-12 main-header-app">
      <div className="container mx-auto px-2 md:px-4 pt-3">
        {/* Logo and Language Row */}
        <div className="flex items-center justify-between mb-2 md:mb-4">
          <div className="flex items-center space-x-2 md:space-x-4">
            <div className="w-20 sm:w-28 md:w-36 flex items-center justify-center flex-shrink-0">
              <img
                src="/images/eci-logo.png"
                alt="Eko Club International 25th Anniversary Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-black bg-gradient-to-r from-blue-600 via-lime-500 to-pink-500 bg-clip-text text-transparent leading-tight">
                <span className="hidden sm:inline">Eko Club International @ 25</span>
                <span className="sm:hidden">ECI @ 25</span>
              </h1>
              <h1 className="text-sm sm:text-lg md:text-xl lg:text-2xl font-black bg-gradient-to-r from-blue-600 via-lime-500 to-pink-500 bg-clip-text text-transparent leading-tight">
                <span className="hidden sm:inline">25th International Convention</span>
                <span className="sm:hidden">25th Convention</span>
              </h1>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Desktop Register Button */}
            <Link href="/register" className="hidden sm:block">
              <Button
                variant="outline"
                className="bg-pink-500 hover:bg-pink-600 text-white text-sm md:text-lg lg:text-xl px-3 py-2 md:px-8 md:py-2 font-bold"
              >
                Register Now
              </Button>
            </Link>

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
            {/* About Convention Dropdown */}
            {/* <div
              className="relative"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <button className="flex items-center text-gray-700 hover:text-purple-600 font-bold text-lg xl:text-lg">
                About
                <ChevronDown className="ml-1 h-4 w-4 xl:h-5 xl:w-5" />
              </button>

              <div
                className={`absolute top-full left-0 mt-2 w-[280px] xl:w-[300px] bg-white border border-gray-200 rounded-lg shadow-lg z-[9999] overflow-hidden ${
                  isDropdownOpen ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
              >
                <div className={`h-[3px] bg-pink-500 ${isDropdownOpen ? "w-1/2" : "w-0"}`}></div>

                <ul className="py-2">
                  <li>
                    <Link
                      href="/about"
                      className="block px-4 py-3 text-gray-800 font-bold hover:bg-gray-50 hover:text-purple-600"
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/speakers"
                      className="block px-4 py-3 text-gray-800 font-bold hover:bg-gray-50 hover:text-purple-600"
                    >
                      Speakers
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/venue"
                      className="block px-4 py-3 text-gray-800 font-bold hover:bg-gray-50 hover:text-purple-600"
                    >
                      Venue & Logistics
                    </Link>
                  </li>
                </ul>
              </div>
            </div> */}
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
              Contact
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
              {/* Mobile Register Button */}
              <Link href="/register" onClick={closeMobileMenu} className="sm:hidden">
                <Button className="w-full bg-pink-500 hover:bg-pink-600 text-white text-lg py-3">Register Now</Button>
              </Link>

              {/* About Convention - Mobile Expandable */}
              {/* <div className="border-b border-gray-100 pb-3">
                <div className="text-gray-700 font-medium text-lg mb-2">About Convention</div>
                <div className="pl-4 space-y-2">
                  <Link
                    href="/about"
                    onClick={closeMobileMenu}
                    className="block text-gray-600 hover:text-purple-600 py-1"
                  >
                    About Convention
                  </Link>
                  <Link
                    href="/speakers"
                    onClick={closeMobileMenu}
                    className="block text-gray-600 hover:text-purple-600 py-1"
                  >
                    Speakers
                  </Link>
                  <Link
                    href="/venue"
                    onClick={closeMobileMenu}
                    className="block text-gray-600 hover:text-purple-600 py-1"
                  >
                    Venue & Logistics
                  </Link>
                </div>
              </div> */}

              {/* Other Mobile Menu Items */}
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
                Contact
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
