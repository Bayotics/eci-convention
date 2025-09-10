import type React from "react"
import type { Metadata } from "next"
import { Raleway } from 'next/font/google'
import "./globals.css"
import { Analytics } from '@vercel/analytics/next';

const raleway = Raleway({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-raleway",
  weight: ["500", "600", "700", "800", "900"],
})

export const metadata: Metadata = {
  title: {
    default: "ECI@25 - 14th Biennial Convention | Eko Club International",
    template: "%s | ECI@25 - Eko Club International"
  },
  description: "Join us for the historic 14th International Convention of Eko Club International. Bridging Generations, Building Communities in Newark, NJ from September 17-21, 2025.",
  keywords: [
    "Eko Club International",
    "ECI@25",
    "14th International Convention",
    "Nigerian diaspora",
    "Newark NJ",
    "September 2025",
    "Bridging Generations",
    "Building Communities",
    "Convention registration",
    "Cultural celebration",
    "Community development",
    "Eko club",
    "Eko club convention",
  ],
  authors: [{ name: "Abdullahi Sho" }],
  creator: "Abdullahi Sho",
  publisher: "Eko Club International",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://ekoclubevents.org'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "ECI@25 - 14th International Convention | Eko Club International",
    description: "Join us for the historic 14th International Convention of Eko Club International. Bridging Generations, Building Communities in Newark, NJ from September 17-21, 2025.",
    url: 'https://ekoclubevents.org',
    siteName: 'ECI@25 Convention',
    images: [
      {
        url: '/images/eci-logo.png',
        width: 1200,
        height: 630,
        alt: 'ECI@25 - 14th International Convention',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "ECI@25 - 14th International Convention | Eko Club International",
    description: "Join us for the historic 14th International Convention of Eko Club International. Bridging Generations, Building Communities in Newark, NJ from September 17-21, 2025.",
    images: ['/images/eci-logo.png'],
    creator: '@rapidosaponga_',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#7c3aed' },
    ],
  },
  manifest: '/site.webmanifest',
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  category: 'events',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={raleway.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#7c3aed" />
        <meta name="msapplication-TileColor" content="#7c3aed" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </head>
      <body className={`${raleway.className} antialiased`}>{children}<Analytics /></body>
    </html>
  )
}
