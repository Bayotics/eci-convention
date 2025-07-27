"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

export function TopBar() {
  return (
    <div
      className="text-white py-2 md:py-3 px-2 md:px-4 sticky top-0 z-50 w-full shadow-lg"
      style={{
        backgroundImage: "url('/images/eci-top-bar-img.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "44px",
      }}
    >
      <div className="container mx-auto flex flex-col sm:flex-row justify-center items-center text-xs sm:text-sm gap-2 sm:gap-4">
        <div className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-4 text-center sm:text-left">
          <span className="text-lg sm:text-xl leading-tight font-bold">
            <span className="hidden sm:inline">
              Eko Club International 25th Convention | Newark, NJ | Sept 18-21, 2025
            </span>
            <span className="sm:hidden">ECI@25 | Newark, NJ | Sept 18-21, 2025</span>
          </span>
          <Link href="/register">
            <Button
              size="sm"
              className="bg-[#c3d534] hover:bg-blue-600 hover:text-white text-black text-lg font-bold sm:text-lg px-3 py-1 sm:px-4 sm:py-2"
            >
              Register
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
