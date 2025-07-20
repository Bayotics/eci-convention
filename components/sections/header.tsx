"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import Link from "next/link"

interface HeaderProps {
  isScrolled: boolean
}

export function Header({ isScrolled }: HeaderProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  return (
    <header
      className={`bg-white shadow-sm py-4 px-8 ${isScrolled ? "fixed z-40 w-full shadow-lg" : ""}`}
      style={isScrolled ? { top: "44px" } : {}}
    >
      <div className="container mx-auto px-4">
        {/* Logo Row */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="w-36 flex items-center justify-center">
              <Link href={"/"}>
                <img
                  src="/images/eci-logo.png"
                  alt="Eko Club International 25th Anniversary Logo"
                  className="w-full h-full object-contain"
                />
              </Link>
            </div>
            <div>
              <h1 className="text-4xl font-black bg-gradient-to-r from-blue-600 via-lime-500 to-pink-500 bg-clip-text text-transparent">
                Eko Club International @ 25
              </h1>
              <h1 className="text-2xl font-black bg-gradient-to-r from-blue-600 via-lime-500 to-pink-500 bg-clip-text text-transparent">
                25th International Convention
              </h1>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Link href="/register">
              <Button variant="outline" className="bg-pink-500 hover:bg-pink-600 text-white text-xl">
                Register Now
              </Button>
            </Link>
          </div>
        </div>

        {/* Navigation Menu Row */}
        <nav className="flex justify-start">
          <div className="hidden lg:flex items-center space-x-8">
            {/* About Convention Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <button className="flex items-center text-gray-700 hover:text-purple-600 font-bold text-lg transition-colors">
                About Convention
                <ChevronDown className="ml-1 h-5 w-5" />
              </button>

              {/* Dropdown Menu with Animation */}
              <div
                className={`absolute top-full left-0 mt-2 w-[300px] bg-white border border-gray-200 rounded-lg shadow-lg z-[9999] overflow-hidden transition-all duration-300 ease-out transform ${
                  isDropdownOpen
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 translate-y-[-10px] scale-95 pointer-events-none"
                }`}
              >
                {/* Pink Border Animation */}
                <div
                  className={`h-[3px] bg-pink-500 transition-all duration-500 ease-out ${
                    isDropdownOpen ? "w-1/2" : "w-0"
                  }`}
                ></div>

                {/* Menu Items */}
                <ul className="py-2">
                  <li>
                    <Link
                      href="/about"
                      className="block px-4 py-3 text-gray-800 font-bold hover:bg-gray-50 hover:text-purple-600 transition-colors"
                    >
                      About Convention
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/speakers"
                      className="block px-4 py-3 text-gray-800 font-bold hover:bg-gray-50 hover:text-purple-600 transition-colors"
                    >
                      Speakers
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/venue"
                      className="block px-4 py-3 text-gray-800 font-bold hover:bg-gray-50 hover:text-purple-600 transition-colors"
                    >
                      Venue & Logistics
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Other Menu Items */}
            <Link href="/agenda" className="text-gray-700 hover:text-purple-600 font-bold text-lg transition-colors">
              Agenda
            </Link>
            <Link
              href="/sponsors"
              className="text-gray-700 hover:text-purple-600 font-bold text-lg transition-colors"
            >
              Sponsors
            </Link>
            <Link
              href="/sponsors"
              className="text-gray-700 hover:text-purple-600 font-bold text-lg transition-colors"
            >
              Contact
            </Link>
            {/* <Link
              href="/admin/login"
              className="text-gray-700 hover:text-purple-600 font-bold text-lg transition-colors"
            >
              Admin
            </Link> */}
          </div>
        </nav>
      </div>
    </header>
  )
}
