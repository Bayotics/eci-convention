"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

interface TopBarProps {
  isScrolled: boolean
}

export function TopBar({ isScrolled }: TopBarProps) {
  return (
    <div
      className={`text-white py-2 md:py-3 px-2 md:px-4 ${isScrolled ? "fixed top-0 z-50 w-full shadow-lg" : ""}`}
      style={{
        backgroundImage: "url('/images/eci-top-bar-img.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: isScrolled ? "44px" : "auto",
      }}
    >
      <div className="container mx-auto flex flex-col sm:flex-row justify-center items-center text-xs sm:text-sm gap-2 sm:gap-4">
        <div className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-4 text-center sm:text-left">
          <span className="text-xs sm:text-sm leading-tight">
            <span className="hidden sm:inline">
              ECI@25: Bridging Generations, Building Communities | Newark, NJ | Sept 18-21, 2025
            </span>
            <span className="sm:hidden">ECI@25 | Newark, NJ | Sept 18-21, 2025</span>
          </span>
          <Link href="/register">
            <Button
              size="sm"
              className="bg-pink-500 hover:bg-pink-600 text-white text-xs sm:text-sm px-3 py-1 sm:px-4 sm:py-2"
            >
              Register
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
