import type React from "react"
import type { Metadata } from "next"
import { Raleway } from "next/font/google"
import "./globals.css"

const raleway = Raleway({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-raleway",
  weight: ["500", "600", "700", "800", "900"],
})

export const metadata: Metadata = {
  title: "ECI@25 - 25th International Convention",
  description: "Bridging Generations, Building Communities - Newark, NJ | Sept 18-21, 2025",
    generator: 'Abdullahi Shobaloju'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={raleway.variable}>
      <body className={`${raleway.className} antialiased`}>{children}</body>
    </html>
  )
}
