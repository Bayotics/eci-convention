"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

interface TopBarProps {
  isScrolled: boolean
}

export function TopBar({ isScrolled }: TopBarProps) {
  return (
    <div
      className={`text-white py-3 px-4 ${isScrolled ? "fixed top-0 z-50 w-full shadow-lg" : ""}`}
      style={{
        backgroundImage: "url('/images/eci-top-bar-img.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: isScrolled ? "44px" : "auto",
      }}
    >
      <div className="container mx-auto flex justify-center items-center font-bold text-lg">
        <div className="flex items-center space-x-4">
          <span>ECI@25: Bridging Generations, Building Communities | Newark, NJ | Sept 18-21, 2025</span>
          <Link href="/register">
            <Button size="sm" className="bg-[#c3d534] text-gray-800 font-bold text-lg px-6 hover:bg-blue-500">
              Register
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
