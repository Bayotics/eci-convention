"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { TopBar } from "@/components/sections/top-bar"
import { Header } from "@/components/sections/header"
import { Footer } from "@/components/sections/footer"
import { ChevronLeft, ChevronRight, ExternalLink, Play } from "lucide-react"
import {
  Users,
  Globe,
  Heart,
  Target,
  Mic,
  Camera,
  Network,
  PartyPopper,
  Building,
  Award,
  Crown,
  Palmtree,
  Mountain,
  Fish,
  X, BookOpen
} from "lucide-react"
import { Button } from "@/components/ui/button"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

// Chapter data
const chaptersData = [
  { id: 1, name: "Atlanta", country: "USA", members: 120, url: "http://ekoclubatlanta.org/" },
  { id: 2, name: "Austin", country: "USA", members: 85, url: "http://ecatmembers.org/about_us" },
  { id: 3, name: "California", country: "USA", members: 150, url: "https://ekoclubinternational.org/california/" },
  { id: 4, name: "Dallas", country: "USA", members: 110, url: "http://www.ekoclubdfw.org" },
  { id: 5, name: "DC Metro", country: "USA", members: 95, url: "https://www.ekoclubdcmetro.org/" },
  { id: 6, name: "Delaware Valley", country: "USA", members: 75, url: "http://ekoclubdeva.com/styled-5/index.html" },
  { id: 7, name: "Detroit", country: "USA", members: 65, url: "http://www.ekoclubdetroit.org" },
  { id: 8, name: "Eko Lagosians of Canada", country: "Canada", members: 90, url: "http://www.lagosiansofcanada.com" },
  { id: 9, name: "Florida", country: "USA", members: 105, url: "www.ekoclubflorida.org" },
  { id: 10, name: "Houston", country: "USA", members: 130, url: "www.ekoclubhouston.com" },
  { id: 11, name: "Eko club Houston Women", country: "USA", members: 65, url: "#" },
  { id: 12, name: "London, U.K.", country: "United Kingdom", members: 115, url: "http://www.gobspace.com/ekl" },
  { id: 13, name: "Louisiana", country: "USA", members: 60, url: "https://ekoclub-louisiana.org" },
  { id: 14, name: "Miami", country: "USA", members: 85, url: "https://ekoclub-miami.org" },
  { id: 15, name: "Minnesota", country: "USA", members: 55, url: "www.ekoclubminnesota.com/" },
  { id: 16, name: "New Jersey", country: "USA", members: 125, url: "https://ekoclubnj.org/" },
  { id: 17, name: "New York", country: "USA", members: 160, url: "www.ekoclubny.org" },
  { id: 18, name: "Ohio", country: "USA", members: 70, url: "https://ekoclubohio.org" },
  { id: 19, name: "Pennsylvania", country: "USA", members: 80, url: "https://www.facebook.com/ekoclub.pennsylvania" },
  { id: 20, name: "Philadelphia", country: "USA", members: 95, url: "www.ekoclubphiladelphia.org" },
  { id: 21, name: "Rhode Island", country: "USA", members: 45, url: "https://ekoclub-rhodeisland.org" },
  { id: 22, name: "San Antonio", country: "USA", members: 65, url: "https://ekoclub-sanantonio.org" },
  { id: 23, name: "Lagosians of Chicago", country: "USA", members: 65, url: "#" },
  { id: 24, name: "Eko Lagosians of Minnesota", country: "USA", members: 65, url: "#" },
  { id: 25, name: "Lagos", country: "Nigeria", members: 200, url: "https://ekoclubnigeria.org" },
]

// Group chapters by region
const getChaptersByRegion = (region: string) => {
  switch (region) {
    case "North America":
      return chaptersData.filter((chapter) => chapter.country === "USA" || chapter.country === "Canada")
    case "Europe":
      return chaptersData.filter((chapter) => chapter.country === "United Kingdom")
    case "Africa":
      return chaptersData.filter((chapter) => chapter.country === "Nigeria")
    default:
      return []
  }
}

// IBILE Division Data - Updated with new content and external URLs
const ibileDivisions = {
  ikeja: {
    name: "Ikeja",
    icon: Building,
    color: "orange",
    brief:
      "The capital of Lagos State and a major commercial and residential hub. Ikeja's history is intertwined with the development of Lagos as a modern city, serving as the administrative center of the state.",
    image: "/images/ikeja.jpg",
    title: "The Cradle of Modernity",
    content: `Before skyscrapers, Lagos was shaped by its waterways. Ikeja, now the vibrant capital, reminds us of the journey from early settlements to a center of progress, yet always respecting its past.`,
    externalUrl: "https://ikeja.lg.gov.ng/history-of-mushin-local-governement/",
  },
  badagry: {
    name: "Badagry",
    icon: Palmtree,
    color: "blue",
    brief:
      "A coastal town with rich history as a major trading post and significant site in the transatlantic slave trade. Badagry holds immense cultural and historical importance with remnants of slave routes and historical buildings.",
    image: "/images/badagry.jpeg",
    title: "Echoes of Resilience",
    content: `Badagry stands as a poignant reminder of profound history. Its ancient traditions, symbolized by the revered Egungun masquerades, speak of resilience, endurance, and cultural depth that transcends centuries.`,
    externalUrl: "https://badagry.lg.gov.ng/customs-and-culture/",
  },
  ikorodu: {
    name: "Ikorodu",
    icon: Crown,
    color: "green",
    brief:
      "A rapidly developing area with a dynamic mix of residential, industrial, and commercial zones. Ikorodu is one of the fastest-growing divisions in Lagos State, representing modern urban development.",
    image: "/images/ikorodu.jpg",
    title: "Guardians of Heritage",
    content: `Ikorodu, with its strong sense of community and heritage, represents the enduring strength of the Lagosian spirit. Its landmarks celebrate the heroes and values that continue to define the people.`,
    externalUrl: "https://ikoroduoga.net/history/geography",
  },
  lagosIsland: {
    name: "Lagos Island",
    icon: Mountain,
    color: "purple",
    brief:
      "Historically known as Eko, Lagos Island is one of the oldest parts of Lagos where the first settlements were established. It has been a significant commercial and political center for centuries, with its name originating from the Benin Kingdom.",
    image: "/images/lagos-island.png",
    title: "The Melting Pot",
    content: `Lagos Island, the historic heart, tells tales of powerful kings and vibrant markets. It's where diverse cultures converged, creating the unique 'Lagosian' identity – a blend of tradition and dynamic growth.`,
    externalUrl: "https://lagosislandlg.lg.gov.ng/history/",
  },
  epe: {
    name: "Epe",
    icon: Fish,
    color: "teal",
    brief:
      "A coastal town with strong fishing and agricultural traditions. Epe is known for its historical connections to the Epe kingdom and its vital role in the region's economy through maritime and agricultural activities.",
    image: "/images/epe.jpg",
    title: "Custodians of the Coast",
    content: `Epe, a serene coastal town, highlights the deep connection Lagosians have with their natural environment. The fishing industry and its rich culture are testament to generations rooted in the land and sea.`,
    externalUrl: "https://epelga.lg.gov.ng/about-epe/",
  },
}

// VIDEO URLS MAPPING - COMPLETELY SEPARATE FROM CAROUSEL
const VIDEO_URLS = {
  "ikeja-heritage": "https://www.youtube.com/watch?v=-962rOv3UfI",
  "badagry-heritage": "https://www.youtube.com/watch?v=mG1ep9_8MMA",
  "ikorodu-heritage": "https://www.youtube.com/watch?v=fYFbFmg3HAM",
  "lagos-island-heritage": "https://www.youtube.com/watch?v=jrrOuiK5UHc",
  "epe-heritage": "https://www.youtube.com/watch?v=u0FkwMpBgZs",
} as const

export default function AboutPage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [selectedDivision, setSelectedDivision] = useState<string | null>(null)
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [clickedCard, setClickedCard] = useState<string | null>(null)
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)

  // Carousel images data - SIMPLIFIED WITHOUT VIDEO URLS
  const carouselImages = [
    {
      id: "ibile-overview",
      src: "/images/ibile.jpg",
      alt: "IBILE - The Five Divisions of Lagos State",
      name: null,
      hasVideo: false,
    },
    {
      id: "ikeja-heritage",
      src: "/images/ikeja-heritage.jpg",
      alt: "Ikeja Heritage - Traditional Monuments",
      name: "Ikeja",
      hasVideo: true,
    },
    {
      id: "badagry-heritage",
      src: "/images/badagry-heritage.jpg",
      alt: "Badagry Heritage - Traditional Boat Festival",
      name: "Badagry",
      hasVideo: true,
    },
    {
      id: "ikorodu-heritage",
      src: "/images/ikorodu-heritage.jpg",
      alt: "Ikorodu Heritage - Traditional Drummers",
      name: "Ikorodu",
      hasVideo: true,
    },
    {
      id: "lagos-island-heritage",
      src: "/images/lagos-island-heritage.jpg",
      alt: "Lagos Island Heritage - Eyo Masqueraders",
      name: "Lagos Island",
      hasVideo: true,
    },
    {
      id: "epe-heritage",
      src: "/images/epe-heritage.jpg",
      alt: "Epe Heritage - Traditional Festival",
      name: "Epe",
      hasVideo: true,
    },
  ]

  // Mission data
  const missionData = [
    {
      id: "mission",
      title: "Our Mission",
      icon: Heart,
      color: "purple",
      content:
        "To foster unity, promote cultural heritage, and empower communities through service, leadership development, and meaningful connections across generations.",
    },
    {
      id: "vision",
      title: "Our Vision",
      icon: Target,
      color: "teal",
      content:
        "To be the leading global organization that bridges generations, preserves cultural identity, and builds sustainable communities for future generations.",
    },
    {
      id: "values",
      title: "Our Values",
      icon: Users,
      color: "orange",
      content:
        "Unity, Excellence, Service, Cultural Pride, Leadership, Innovation, and Community Empowerment guide everything we do.",
    },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])
  useEffect(() => {
    if (selectedVideo) return // Pause autoplay when video modal is open
    const interval = setInterval(nextSlide, 10000)
    return () => clearInterval(interval)
  }, [selectedVideo])

  const openModal = (divisionKey: string) => {
    setSelectedDivision(divisionKey)
    document.body.style.overflow = "hidden"
  }

  const closeModal = () => {
    setSelectedDivision(null)
    document.body.style.overflow = "unset"
  }

  const openChaptersModal = (region: string) => {
    setSelectedRegion(region)
    document.body.style.overflow = "hidden"
  }

  const closeChaptersModal = () => {
    setSelectedRegion(null)
    document.body.style.overflow = "unset"
  }

  const handleChapterClick = (url: string) => {
    if (url && url !== "#") {
      const fullUrl = url.startsWith("http") ? url : `https://${url}`
      window.open(fullUrl, "_blank", "noopener,noreferrer")
    }
  }

  const handleExternalLinkClick = (url: string, event: React.MouseEvent) => {
    event.stopPropagation()
    window.open(url, "_blank", "noopener,noreferrer")
  }

  // NEW VIDEO HANDLING FUNCTIONS
  const openVideoModal = useCallback((slideId: string) => {
    const videoUrl = VIDEO_URLS[slideId as keyof typeof VIDEO_URLS]
    if (videoUrl) {
      console.log(`Opening video for ${slideId}: ${videoUrl}`)
      setSelectedVideo(videoUrl)
      document.body.style.overflow = "hidden"
    }
  }, [])

  const closeVideoModal = useCallback(() => {
    setSelectedVideo(null)
    document.body.style.overflow = "unset"
  }, [])

  const getYouTubeEmbedUrl = (url: string) => {
    let videoId = ""
    if (url.includes("watch?v=")) {
      videoId = url.split("watch?v=")[1].split("&")[0]
    } else if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1].split("?")[0]
    } else if (url.includes("/embed/")) {
      videoId = url.split("/embed/")[1].split("?")[0]
    }
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length)
  }

  const toggleCard = (cardId: string) => {
    if (clickedCard === cardId) {
      setClickedCard(null)
    } else {
      setClickedCard(cardId)
    }
  }

  const handleMouseEnter = (cardId: string) => {
    setHoveredCard(cardId)
  }

  const handleMouseLeave = (cardId: string) => {
    setHoveredCard(null)
  }

  const currentDivision = selectedDivision ? ibileDivisions[selectedDivision as keyof typeof ibileDivisions] : null

  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Header />

      {/* Add padding-top to account for fixed header */}
      <div className="pt-[120px] sm:pt-[130px] md:pt-[140px] lg:pt-[150px] about-banner-hero">
        {/* Hero/Banner Section */}
        <section
          className="relative text-white py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden"
          style={{
            backgroundImage: "url('/images/about-page-banner.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/80 via-blue-600/70 to-teal-500/80"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl"
            >
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-sm sm:text-base md:text-lg lg:text-xl italic text-white/90 mb-3 sm:mb-4"
              >
                Learn more about our prestigious club and events
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 text-white drop-shadow-lg leading-tight"
              >
                About
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-sm sm:text-base md:text-lg lg:text-xl text-white leading-relaxed max-w-3xl"
              >
                Discover the rich history, mission, and vision of Eko Club International as we celebrate 25 years of
                bridging generations and building communities worldwide.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* ECI Legacy & Mission Section */}
        <section className="py-12 sm:py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-8 sm:mb-12"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold pb-4 sm:pb-6 bg-gradient-to-r from-purple-600 to-teal-600 bg-clip-text text-transparent">
                Our Heritage
              </h2>
            </motion.div>

            {/* Image Carousel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative w-[90%] mx-auto mb-8 sm:mb-12 md:mb-16"
            >
              <div className="relative overflow-hidden rounded-lg shadow-2xl aspect-[16/10] sm:aspect-[16/9] md:aspect-[16/8]">
                {carouselImages.map((image, index) => (
                  <motion.div
                    key={image.id}
                    className={`absolute inset-0 transition-opacity duration-500 ${
                      index === currentSlide ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
                  >
                    <img src={image.src || "/placeholder.svg"} alt={image.alt} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

                    {/* Only render play button for the visible slide */}
                    {image.hasVideo && index === currentSlide && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            console.log(`Clicked play for slide: ${image.id}`)
                            openVideoModal(image.id)
                          }}
                          className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-4 sm:p-6 md:p-8 rounded-full transition-all duration-300 hover:scale-110 group"
                          aria-label={`Play ${image.name} heritage video`}
                        >
                          <Play className="h-8 w-8 sm:h-12 sm:w-12 md:h-16 md:w-16 fill-current group-hover:scale-110 transition-transform duration-300" />
                        </button>
                      </div>
                    )}
                    {/* Division Name */}
                    {image.name && (
                      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: index === currentSlide ? 1 : 0, y: index === currentSlide ? 0 : 20 }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                          className="text-center"
                        >
                          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
                            {image.name}
                          </h3>
                        </motion.div>
                      </div>
                    )}
                  </motion.div>
                ))}
                {/* Navigation Arrows */}
                <button
                  onClick={prevSlide}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 sm:p-3 rounded-full transition-all duration-200 hover:scale-110"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 sm:p-3 rounded-full transition-all duration-200 hover:scale-110"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
                </button>

                {/* Dot Indicators */}
                <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                  {carouselImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-200 ${
                        index === currentSlide ? "bg-white scale-125" : "bg-white/50 hover:bg-white/75"
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Video Modal */}
        <AnimatePresence>
          {selectedVideo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 z-[9999] flex items-center justify-center p-2 sm:p-4"
              onClick={closeVideoModal}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-black rounded-lg max-w-4xl w-full aspect-video relative"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={closeVideoModal}
                  className="absolute -top-12 right-0 bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors z-10"
                >
                  <X className="h-6 w-6 text-white" />
                </button>

                {/* YouTube Embed */}
                <iframe
                  key={selectedVideo}
                  src={getYouTubeEmbedUrl(selectedVideo)}
                  title="Heritage Video"
                  className="w-full h-full rounded-lg"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Lagos State History Section */}
        <section
          className="py-12 sm:py-16 md:py-20 text-white relative overflow-hidden"
          style={{
            backgroundImage: "url('/images/speakers-bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="absolute inset-0 bg-black/20"></div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12 sm:mb-16"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-white">
                The Rich Heritage of <span className="text-yellow-300">Lagos State</span>
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-white/90 max-w-4xl mx-auto leading-relaxed">
                Discover the fascinating history of Lagos State and its five administrative divisions that form the
                IBILE acronym - the cultural and administrative foundation of our heritage.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16"
            >
              {Object.entries(ibileDivisions).map(([key, division]) => {
                const IconComponent = division.icon
                const colorClasses = {
                  orange: "bg-orange-100 text-orange-600",
                  blue: "bg-blue-100 text-blue-600",
                  green: "bg-green-100 text-green-600",
                  purple: "bg-purple-100 text-purple-600",
                  teal: "bg-teal-100 text-teal-600",
                }

                return (
                  <motion.div
                    key={key}
                    variants={fadeInUp}
                    className="bg-white/95 backdrop-blur-sm p-6 sm:p-8 rounded-lg shadow-lg"
                  >
                    <div
                      className={`p-3 sm:p-4 rounded-full w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center mb-4 sm:mb-6 ${colorClasses[division.color as keyof typeof colorClasses]}`}
                    >
                      <IconComponent className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />
                    </div>

                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-800">{division.name}</h3>
                      <button
                        onClick={(e) => handleExternalLinkClick(division.externalUrl, e)}
                        className="p-1.5 sm:p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200 group"
                        title={`Visit ${division.name} official website`}
                        aria-label={`Visit ${division.name} official website`}
                      >
                        <ExternalLink className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600 group-hover:text-purple-600 transition-colors duration-200" />
                      </button>
                    </div>

                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4 sm:mb-6">{division.brief}</p>
                    <Button
                      onClick={() => openModal(key)}
                      className="bg-purple-600 hover:bg-purple-700 text-white w-full sm:w-auto text-sm sm:text-base"
                    >
                      Read More
                    </Button>
                  </motion.div>
                )
              })}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center mt-8 sm:mt-12"
            >
              <div className="bg-white/10 backdrop-blur-sm text-white p-6 sm:p-8 lg:p-10 rounded-lg">
                <div className="flex items-center justify-center gap-3 mb-6 sm:mb-8">
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-yellow-300">Origins of Lagos</h3>
                  <button
                    onClick={(e) => handleExternalLinkClick("https://en.wikipedia.org/wiki/History_of_Lagos", e)}
                    className="p-2 sm:p-2.5 rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-200 group"
                    title="Visit Lagos State official website"
                    aria-label="Visit Lagos State official website"
                  >
                    <ExternalLink className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-300 group-hover:text-white transition-colors duration-200" />
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 text-left">
                  <div className="space-y-4 sm:space-y-6">
                    <div>
                      <h4 className="text-lg sm:text-xl font-semibold text-yellow-200 mb-2 sm:mb-3">Foundation</h4>
                      <p className="text-sm sm:text-base text-white/90 leading-relaxed">
                        Founded in the 16th century by the Awori people as Eko, a small but important commercial
                        kingdom.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-lg sm:text-xl font-semibold text-yellow-200 mb-2 sm:mb-3">Names</h4>
                      <p className="text-sm sm:text-base text-white/90 leading-relaxed">
                        The Awori called it Oko, then Eko under Benin rule; the Portuguese named it 'Lagos' meaning
                        'lakes'.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-lg sm:text-xl font-semibold text-yellow-200 mb-2 sm:mb-3">Awori Legend</h4>
                      <p className="text-sm sm:text-base text-white/90 leading-relaxed">
                        Olofin followed a drifting mud plate to settle; his son Aromire planted pepper on Lagos Island,
                        leading to Iga Idunganran – the 'pepper farm palace'.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-lg sm:text-xl font-semibold text-yellow-200 mb-2 sm:mb-3">British Era</h4>
                      <p className="text-sm sm:text-base text-white/90 leading-relaxed">
                        British intervention in 1851 ended internal conflicts; Lagos became a British protectorate in
                        1861.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4 sm:space-y-6">
                    <h4 className="text-xl sm:text-2xl font-bold text-yellow-300 mb-4 sm:mb-6">
                      Formation of Lagos State & IBILE
                    </h4>

                    <div>
                      <p className="text-sm sm:text-base text-white/90 leading-relaxed mb-3">
                        On 27 May 1967 Nigeria was restructured into 12 states; Lagos State was created by Decree No.
                        14.
                      </p>
                      <p className="text-sm sm:text-base text-white/90 leading-relaxed mb-3">
                        The state became operational on 11 April 1968.
                      </p>
                      <p className="text-sm sm:text-base text-white/90 leading-relaxed mb-3">
                        On 1 April 1968 Lagos was divided into five divisions – <strong>I</strong>korodu,{" "}
                        <strong>B</strong>adagry, <strong>I</strong>keja, <strong>L</strong>agos Island &{" "}
                        <strong>E</strong>pe – forming the acronym '<strong>IBILE</strong>'.
                      </p>
                      <p className="text-sm sm:text-base text-white/90 leading-relaxed">
                        These divisions reflect the state's varied geography, heritage and administrative
                        responsibilities.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Modal for Division Details */}
        <AnimatePresence>
          {selectedDivision && currentDivision && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-2 sm:p-4"
              onClick={closeModal}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-lg max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-hidden flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative flex-shrink-0">
                  <button
                    onClick={closeModal}
                    className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-white/90 hover:bg-white p-1.5 sm:p-2 rounded-full transition-colors z-10"
                  >
                    <X className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-gray-800" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto">
                  <div className="relative" style={{ height: "65vh" }}>
                    <img
                      src={currentDivision.image || "/placeholder.svg"}
                      alt={currentDivision.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8">
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                      >
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-3">
                          {currentDivision.name}
                        </h2>
                        <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-yellow-300 mb-3 sm:mb-4">
                          {currentDivision.title}
                        </h3>
                      </motion.div>
                    </div>
                  </div>

                  <div className="p-4 sm:p-6 lg:p-8">
                    <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg">
                        {currentDivision.content}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 p-4 sm:p-6 flex-shrink-0">
                  <Button
                    onClick={closeModal}
                    className="bg-purple-600 hover:bg-purple-700 text-white w-full sm:w-auto"
                  >
                    Close
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Convention Theme Section */}
        <section
          className="py-12 sm:py-16 md:py-20 text-white"
          style={{
            backgroundImage: "url('/images/diamond-sunset.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12 sm:mb-16"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
                Convention Theme:{" "}
                <span className="text-yellow-300 block sm:inline">"Bridging Generations, Building Communities"</span>
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-purple-100 max-w-4xl mx-auto leading-relaxed">
                Our 25th anniversary theme reflects our commitment to connecting the wisdom of our elders with the
                energy of our youth, creating stronger, more unified communities for the future.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
            >
              <motion.div variants={fadeInUp} className="bg-white/10 backdrop-blur-sm p-6 sm:p-8 rounded-lg">
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-yellow-300">Bridging Generations</h3>
                <p className="text-sm sm:text-base text-purple-100 leading-relaxed">
                  We honor the wisdom and experience of our founding members while embracing the fresh perspectives and
                  innovative ideas of our younger generation. This intergenerational dialogue creates a powerful synergy
                  that drives our organization forward.
                </p>
              </motion.div>

              <motion.div variants={fadeInUp} className="bg-white/10 backdrop-blur-sm p-6 sm:p-8 rounded-lg">
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-yellow-300">Building Communities</h3>
                <p className="text-sm sm:text-base text-purple-100 leading-relaxed">
                  Through service projects, cultural preservation, and leadership development, we create lasting
                  positive impact in communities worldwide. Our work extends beyond our membership to benefit society as
                  a whole.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>
        <section
          className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50"
          style={{
            backgroundImage: "url('/images/bg-skin.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12 sm:mb-16"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-gray-800">
                Eko without <span className="text-purple-600">Borders</span>: Silver Jubilee{" "}
                <span className="text-pink-600">Chronicles</span>
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
                A comprehensive chronicle of our 25-year journey, celebrating the remarkable legacy of Eko Club
                International USA, Canada, and Europe.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="max-w-6xl mx-auto"
            >
              <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-10 lg:p-12">
                <div className="prose prose-lg max-w-none">
                  <div className="mb-6 p-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg border-l-4 border-purple-500">
                    <p className="text-sm text-gray-600 mb-2 font-medium">By Otunba T J Abass</p>
                    <p className="text-gray-700 italic leading-relaxed">
                      "A flame was lit in a foreign land. They thought it would not burn this long, burn this bright,
                      burn this far. Today, 25 years on, Eko Club International USA, Canada, and Europe stand at the
                      golden gates of history as a living legacy of Lagosians in the diaspora."
                    </p>
                  </div>

                  <div id="preview-content" className="space-y-6">
                    <p className="text-gray-700 leading-relaxed">
                      That flame has grown into a fire of fellowship that has crossed borders, defied distance, and
                      gained strength year after year.
                    </p>

                    <p className="text-gray-700 leading-relaxed">
                      This Silver Jubilee is, without question, a moment of collective pride for every member. It bears
                      witness to our unity, resilience, and the enduring relevance of our mission.
                    </p>

                    <p className="text-gray-700 leading-relaxed">
                      Rooted in heritage and rising through service, ECI has carried our culture with dignity and
                      planted the seeds of progress everywhere the Lagos' footstep is found, from Toronto to Houston,
                      from London to New Jersey, and across the world.
                    </p>

                    <p className="text-gray-700 leading-relaxed">
                      This celebration is not just the ticking of years on the calendar; it is the telling of a story
                      written in sacrifice, service, and shared triumph. We honor those who first lit the torch with
                      sacrifice, we celebrate those who have kept it burning with vision and vigor, and we charge those
                      coming behind to carry it higher, brighter, and further.
                    </p>

                    <p className="text-gray-700 leading-relaxed">
                      Indeed, this 25th anniversary is not the last chapter of our book; it is a new title in our
                      publication series.
                    </p>

                    <p className="text-gray-700 leading-relaxed">
                      For some of us who laid the first stone of this organization, this celebration feels like a
                      personal win, a badge of honor, and a bragging right. To have been part of a journey so rich in
                      sacrifice, vision, and triumph is nothing short of extraordinary. If this odyssey were ever
                      transcribed into a movie script, it would surely earn a nomination for an Oscar.
                    </p>

                    <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mt-8 mb-4">
                      <span className="text-purple-600">The Genesis</span>
                    </h3>

                    <p className="text-gray-700 leading-relaxed">
                      The story of Eko Club International began with the voice of a leader in exile, President Bola
                      Ahmed Tinubu, who called upon Lagosians scattered abroad to remember our root and gather beneath
                      one banner which would bound our hearts to home. His goal was for members to carry Lagos beyond
                      its shores and showcase it on the world stage.
                    </p>

                    <p className="text-gray-700 leading-relaxed">
                      From its cradle, Eko Club International bore the seal of destiny, guided by the vision of Asiwaju
                      Bola Ahmed Tinubu during his exile. Although the organization was officially incorporated in Texas
                      in 2000, the seed was planted earlier in 1997 when Eko Club Houston was formally registered,
                      carrying forward Asiwaju Tinubu's call to pool resources and energies to advance Lagos State.
                    </p>

                    <div className="bg-gradient-to-r from-teal-50 to-green-50 p-6 rounded-lg border-l-4 border-teal-500">
                      <h4 className="text-lg font-semibold text-gray-800 mb-3">Early Eko Clubs (Before 2000)</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-start">
                          <span className="text-teal-600 mr-2">•</span>
                          <span>Lagosians of Chicago, registered in 1991</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-teal-600 mr-2">•</span>
                          <span>Eko Club Canada</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-teal-600 mr-2">•</span>
                          <span>Eko Club Houston registered in Texas in 1997</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-teal-600 mr-2">•</span>
                          <span>Eko Club New York, registered in 1998</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="text-center mt-8">
                    <button
                      onClick={() => {
                        const modal = document.getElementById("chronicles-modal")
                        if (modal) modal.style.display = "flex"
                      }}
                      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      <BookOpen className="mr-2 h-5 w-5" />
                      Read Full Chronicles
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Chronicles Modal */}
        <div
          id="chronicles-modal"
          className="fixed inset-0 bg-black bg-opacity-50 z-50 hidden items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              e.currentTarget.style.display = "none"
            }
          }}
        >
          <div className="bg-white rounded-2xl max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl">
            <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 flex justify-between items-center">
              <h3 className="text-xl sm:text-2xl font-bold">Eko without Borders: Silver Jubilee Chronicles</h3>
              <button
                onClick={() => {
                  const modal = document.getElementById("chronicles-modal")
                  if (modal) modal.style.display = "none"
                }}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6 sm:p-8 overflow-y-auto max-h-[calc(90vh-100px)]">
              <div className="prose prose-lg max-w-none">
                <div className="mb-6 p-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg border-l-4 border-purple-500">
                  <p className="text-sm text-gray-600 mb-2 font-medium">By Otunba T J Abass</p>
                  <p className="text-gray-700 italic leading-relaxed">
                    "A flame was lit in a foreign land. They thought it would not burn this long, burn this bright, burn
                    this far. Today, 25 years on, Eko Club International USA, Canada, and Europe stand at the golden
                    gates of history as a living legacy of Lagosians in the diaspora."
                  </p>
                </div>

                <div className="space-y-6">
                  <p className="text-gray-700 leading-relaxed">
                    That flame has grown into a fire of fellowship that has crossed borders, defied distance, and gained
                    strength year after year.
                  </p>

                  <p className="text-gray-700 leading-relaxed">
                    This Silver Jubilee is, without question, a moment of collective pride for every member. It bears
                    witness to our unity, resilience, and the enduring relevance of our mission.
                  </p>

                  <p className="text-gray-700 leading-relaxed">
                    Rooted in heritage and rising through service, ECI has carried our culture with dignity and planted
                    the seeds of progress everywhere the Lagos' footstep is found, from Toronto to Houston, from London
                    to New Jersey, and across the world.
                  </p>

                  <p className="text-gray-700 leading-relaxed">
                    This celebration is not just the ticking of years on the calendar; it is the telling of a story
                    written in sacrifice, service, and shared triumph. We honor those who first lit the torch with
                    sacrifice, we celebrate those who have kept it burning with vision and vigor, and we charge those
                    coming behind to carry it higher, brighter, and further.
                  </p>

                  <p className="text-gray-700 leading-relaxed">
                    Indeed, this 25th anniversary is not the last chapter of our book; it is a new title in our
                    publication series.
                  </p>

                  <p className="text-gray-700 leading-relaxed">
                    For some of us who laid the first stone of this organization, this celebration feels like a personal
                    win, a badge of honor, and a bragging right. To have been part of a journey so rich in sacrifice,
                    vision, and triumph is nothing short of extraordinary. If this odyssey were ever transcribed into a
                    movie script, it would surely earn a nomination for an Oscar.
                  </p>

                  <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mt-8 mb-4">
                    <span className="text-purple-600">The Genesis</span>
                  </h3>

                  <p className="text-gray-700 leading-relaxed">
                    The story of Eko Club International began with the voice of a leader in exile, President Bola Ahmed
                    Tinubu, who called upon Lagosians scattered abroad to remember our root and gather beneath one
                    banner which would bound our hearts to home. His goal was for members to carry Lagos beyond its
                    shores and showcase it on the world stage.
                  </p>

                  <p className="text-gray-700 leading-relaxed">
                    Our organization's story must not be told like a personal account; it must stand in the court of
                    history, with documents as evidence and dates as witnesses. Our organization's story must be
                    preserved in both memory and record.
                  </p>

                  <p className="text-gray-700 leading-relaxed">
                    If history is indeed a record of past events, encompassing successes, challenges, and
                    accomplishments, then the following accounts of Eko Club International's journey since its formation
                    in September 2000 provides a truthful and accurate reflection of its significant achievements and
                    the obstacles it has overcome.
                  </p>

                  <p className="text-gray-700 leading-relaxed">
                    From its cradle, Eko Club International bore the seal of destiny, guided by the vision of Asiwaju
                    Bola Ahmed Tinubu during his exile. Although the organization was officially incorporated in Texas
                    in 2000, the seed was planted earlier in 1997 when Eko Club Houston was formally registered,
                    carrying forward Asiwaju Tinubu's call to pool resources and energies to advance Lagos State.
                  </p>

                  <p className="text-gray-700 leading-relaxed">
                    That seed soon became a torch passed across borders. The trio of Otunba Sam Dipeolu, Otunba T.J.
                    Abass, and the late Mr. Yesir Ganiyu traveled to Canada to engage with their counterparts in Eko
                    Club Canada, one of the earliest diaspora branches established in 1991.
                  </p>

                  <div className="bg-gradient-to-r from-teal-50 to-green-50 p-6 rounded-lg border-l-4 border-teal-500">
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">Early Eko Clubs (Before 2000)</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <span className="text-teal-600 mr-2">•</span>
                        <span>Lagosians of Chicago, registered in 1991</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-teal-600 mr-2">•</span>
                        <span>Eko Club Canada</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-teal-600 mr-2">•</span>
                        <span>Eko Club Houston registered in Texas in 1997</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-teal-600 mr-2">•</span>
                        <span>Eko Club New York, registered in 1998</span>
                      </li>
                    </ul>
                  </div>

                  <p className="text-gray-700 leading-relaxed">
                    A pivotal meeting took place in January 2000 at the residence of Mr. & Mrs. Akeem and Biola Nosiru.
                    In attendance were the three representatives from Houston, the late Alhaji Agiri, and Mrs. Abiola
                    Nosiru.
                  </p>

                  <p className="text-gray-700 leading-relaxed">
                    While the formal meeting occurred in January 2000, discussions with Eko Club Canada had begun as
                    early as 1998, paving the way for the 2000 meeting in Canada and the convention in Houston.
                  </p>

                  <p className="text-gray-700 leading-relaxed">
                    This meeting proved highly productive. From it came a Memorandum of Understanding (MOU) that cleared
                    the path for the registration of Eko Club International in Texas. More importantly, it spread the
                    great canopy of Eko Club International, USA, Canada & Europe; an umbrella body whose shade has
                    nurtured growth in Lagos State and in the host communities of its chapters abroad.
                  </p>

                  <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mt-8 mb-4">
                    <span className="text-pink-600">The First Convention</span>
                  </h3>

                  <p className="text-gray-700 leading-relaxed">
                    Another seed sown in that meeting blossomed into the very first Eko Club International Convention,
                    held in Houston in March 2000, with attendance from only three chapters: Chicago, Canada, and
                    Houston.
                  </p>

                  <p className="text-gray-700 leading-relaxed">
                    Eko Club Houston proudly hosted the 1st Eko Club International Convention in March 2000. Two other
                    chapters participated in this historic gathering:
                  </p>

                  <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-6 rounded-lg border-l-4 border-orange-500">
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">Participating Chapters (2000)</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <span className="text-orange-600 mr-2">•</span>
                        <span>
                          Eko Club Canada, represented by the late Alhaji Agiri (then President), alongside Ms. Biola
                          Nosiru, Kemmy Baljack, and Anu Oluwapo
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-orange-600 mr-2">•</span>
                        <span>
                          Lagosians of Chicago, represented by Alhaji Wahab Owokoniran, Dr. Nurudeen Olowopopo, Dr.
                          Shafi Amuwo, and Dr. Maruf Tunji Alausa
                        </span>
                      </li>
                    </ul>
                  </div>

                  <p className="text-gray-700 leading-relaxed">
                    For nine days, the Adams Mark Hotel became a stage for an event that stamped a milestone of pride
                    into our organization's dossier. It was a gathering of crowns and captains, where traditional
                    rulers, industry leaders, and Lagos State officials stood shoulder to shoulder. At its helm was the
                    then-Executive Governor, Asiwaju Bola Ahmed Tinubu.
                  </p>

                  <p className="text-gray-700 leading-relaxed">
                    A significant convention highlight was Asiwaju's official visit to the Mayor of Houston, Mr. Lee
                    Brown. This visit resulted in a bilateral agreement between the City of Houston and Lagos State,
                    marking a milestone in international cooperation.
                  </p>

                  <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mt-8 mb-4">
                    <span className="text-purple-600">The Enron Deal</span>
                  </h3>

                  <p className="text-gray-700 leading-relaxed">
                    It was also this convention that further discussions were held with Enron's top management. The
                    Enron Independent Power Project – one of the largest of its kind - was an initiative of Governor
                    Bola Tinubu's administration. This project was also a bold step to shatter PHCN's monopoly and flood
                    Lagos with light without flickers.
                  </p>

                  <p className="text-gray-700 leading-relaxed">
                    Sadly, what was initially conceived as a transformative initiative to improve millions of lives was
                    poisoned at its root by selfish interests and unscrupulous elements.
                  </p>

                  <p className="text-gray-700 leading-relaxed">
                    Still, the 2000 convention remains a monument in time. It laid the foundation for a formidable
                    partnership with the administration of Asiwaju Bola Ahmed Tinubu and subsequent Lagos State
                    administrations over the past 25 years.
                  </p>

                  <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mt-8 mb-4">
                    <span className="text-teal-600">Leadership Through the Years</span>
                  </h3>

                  <p className="text-gray-700 leading-relaxed">
                    From its inception, Eko Club International has walked the path of democracy, holding fast to values
                    that light its way. Seven times, the torch of leadership has been passed through the will of the
                    ballot, proving our enduring commitment to orderly transitions and stability:
                  </p>

                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border-l-4 border-blue-500">
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">Presidential Timeline</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span>2000–2001: Interim President, Late Prince Adelani Adeniji Adele</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span>2001–2003: Late Alhaji Olusisi Dawodu</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span>2003–2005: Attorney O.J. Lawal</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span>2005–2009: Otunba T.J. Abass</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span>2009–2013: Alhaji Zainudeen Popoola</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span>2013–2017: Alhaji Bisi Gaji</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span>2017–2021: Dr. Lanre Ojo</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span>2021–2025: Chief Saheed Olushi</span>
                      </li>
                    </ul>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mt-8 mb-4">
                    <span className="text-green-600">Community Impact & Projects</span>
                  </h3>

                  <p className="text-gray-700 leading-relaxed">
                    This proud record of steady democratic leadership has made Eko Club International a poster child of
                    stability. Over the last 25 years, Eko Club International has lived out its creed with a litany of
                    life-changing initiatives that have reached the very heart of society, particularly the
                    underprivileged.
                  </p>

                  <p className="text-gray-700 leading-relaxed">
                    A crown jewel project of this club is the Medical Mission, exclusively championed by the parent
                    body. This project carries a healing touch with free medical services for the people of Lagos State.
                    These services have included surgeries, dental care, and the provision of eyeglasses, all at no cost
                    to beneficiaries.
                  </p>

                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border-l-4 border-green-500">
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">Major Community Projects</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span>Computerization of LASU</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span>Provision of school uniforms to all secondary schools in Ikeja</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span>Scholarship for the conjoined "Shortcake Twins"</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span>Scholarships for deserving students in both the U.S. and Nigeria</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span>Adoption of Massey Street Children's Hospital</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span>Renovation of Ansarudeen Alakoro</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span>Computerization of Ansarudeen Aroloya</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span>Annual Thanksgiving Dinner for the Homeless</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span>Education Endowment Fund for conjoined twins</span>
                      </li>
                    </ul>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mt-8 mb-4">
                    <span className="text-purple-600">Looking Forward</span>
                  </h3>

                  <p className="text-gray-700 leading-relaxed">
                    Eko Club International is more than an organization; it is a living story. These past twenty-five
                    years have built a bridge across oceans, the heartbeat of Lagosians in the diaspora, and a tree with
                    roots that run deep and branches that spread wide. We have faced trials and turned them into
                    triumphs; carried burdens that became our badges of honor; and crossed distances that only drew us
                    closer.
                  </p>

                  <p className="text-gray-700 leading-relaxed">
                    On this 25th anniversary, we are not just looking back, but also looking forward. The story of Eko
                    Club International is still being written: each member, a pen, each convention, a chapter, each act
                    of service, a sentence in our book of legacy.
                  </p>

                  <p className="text-gray-700 leading-relaxed font-semibold">
                    At this silver harvest of 25 years, we give thanks for the road already traveled and lift our eyes
                    to the horizon, praying for many more years of service, progress, and fulfillment.
                  </p>

                  <div className="text-center mt-8 p-6 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg">
                    <p className="text-lg font-bold text-gray-800">Congratulations on this remarkable milestone!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* What to Expect Section */}
        <section
          className="py-12 sm:py-16 md:py-20 bg-gray-50"
          style={{
            backgroundImage: "url('/images/bg-skin.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12 sm:mb-16"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-gray-800">
                What to <span className="text-purple-600">Expect</span>
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
                ECI@25 promises an unforgettable experience filled with learning, networking, celebration, and community
                building.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            >
              <motion.div
                variants={fadeInUp}
                className="bg-white p-6 sm:p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="bg-purple-100 p-3 sm:p-4 rounded-full w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center mb-4 sm:mb-6">
                  <Mic className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-purple-600" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-gray-800">Engaging Panels & Workshops</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Interactive sessions featuring industry leaders, thought-provoking discussions, and skill-building
                  workshops designed to inspire and educate.
                </p>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="bg-white p-6 sm:p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="bg-pink-100 p-3 sm:p-4 rounded-full w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center mb-4 sm:mb-6">
                  <Camera className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-pink-600" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-gray-800">Cultural Exhibitions</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Vibrant displays of traditional arts, music, dance, and crafts celebrating our rich cultural heritage
                  and diversity.
                </p>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="bg-white p-6 sm:p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="bg-teal-100 p-3 sm:p-4 rounded-full w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center mb-4 sm:mb-6">
                  <Network className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-teal-600" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-gray-800">Networking Opportunities</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Connect with fellow members from around the world, build lasting relationships, and expand your
                  professional network.
                </p>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="bg-white p-6 sm:p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="bg-orange-100 p-3 sm:p-4 rounded-full w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center mb-4 sm:mb-6">
                  <PartyPopper className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-orange-600" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-gray-800">Gala Night & Awards</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  An elegant evening of celebration, recognition, and entertainment honoring outstanding achievements
                  and contributions.
                </p>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="bg-white p-6 sm:p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="bg-green-100 p-3 sm:p-4 rounded-full w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center mb-4 sm:mb-6">
                  <Building className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-green-600" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-gray-800">
                  Community Empowerment Projects
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Hands-on service initiatives that make a tangible difference in local communities and demonstrate our
                  commitment to giving back.
                </p>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="bg-white p-6 sm:p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="bg-yellow-100 p-3 sm:p-4 rounded-full w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:w-16 flex items-center justify-center mb-4 sm:mb-6">
                  <Award className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-yellow-600" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-gray-800">25th Anniversary Ceremonies</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Special commemorative events celebrating our 25-year journey, honoring founding members, and launching
                  initiatives for the next 25 years.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Global Chapters Section */}
        <section
          className="py-12 sm:py-16 md:py-20 text-white"
          style={{
            backgroundImage: "url('/images/endless-constellation.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12 sm:mb-16"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
                ECI Chapters <span className="text-yellow-300">Worldwide</span>
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-teal-100 max-w-4xl mx-auto leading-relaxed">
                Our global network spans continents, connecting communities and fostering cultural exchange across the
                world.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto"
            >
              <motion.div variants={fadeInUp} className="text-center">
                <div
                  className="bg-white/20 backdrop-blur-sm p-6 sm:p-8 rounded-lg mb-3 sm:mb-4 cursor-pointer hover:bg-white/30 transition-all duration-300"
                  onClick={() => openChaptersModal("North America")}
                >
                  <Globe className="h-10 w-10 sm:h-12 sm:w-12 mx-auto mb-3 sm:mb-4 text-yellow-300" />
                  <h3 className="text-xl sm:text-2xl font-bold mb-2">North America</h3>
                  <p className="text-sm sm:text-base text-teal-100">
                    {getChaptersByRegion("North America").length} Active Chapters
                  </p>
                </div>
                <p className="text-xs sm:text-sm text-teal-100">USA, Canada</p>
              </motion.div>

              <motion.div variants={fadeInUp} className="text-center">
                <div
                  className="bg-white/20 backdrop-blur-sm p-6 sm:p-8 rounded-lg mb-3 sm:mb-4 cursor-pointer hover:bg-white/30 transition-all duration-300"
                  onClick={() => openChaptersModal("Europe")}
                >
                  <Globe className="h-10 w-10 sm:h-12 sm:w-12 mx-auto mb-3 sm:mb-4 text-yellow-300" />
                  <h3 className="text-xl sm:text-2xl font-bold mb-2">Europe</h3>
                  <p className="text-sm sm:text-base text-teal-100">
                    {getChaptersByRegion("Europe").length} Active Chapter
                  </p>
                </div>
                <p className="text-xs sm:text-sm text-teal-100">UK</p>
              </motion.div>

              <motion.div variants={fadeInUp} className="text-center sm:col-span-2 md:col-span-1">
                <div
                  className="bg-white/20 backdrop-blur-sm p-6 sm:p-8 rounded-lg mb-3 sm:mb-4 cursor-pointer hover:bg-white/30 transition-all duration-300"
                  onClick={() => openChaptersModal("Africa")}
                >
                  <Globe className="h-10 w-10 sm:h-12 sm:w-12 mx-auto mb-3 sm:mb-4 text-yellow-300" />
                  <h3 className="text-xl sm:text-2xl font-bold mb-2">Africa</h3>
                  <p className="text-sm sm:text-base text-teal-100">
                    {getChaptersByRegion("Africa").length} Active Chapter
                  </p>
                </div>
                <p className="text-xs sm:text-sm text-teal-100">Nigeria</p>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center mt-8 sm:mt-12"
            >
              <div className="bg-white/10 backdrop-blur-sm p-6 sm:p-8 rounded-lg">
                <h3 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-yellow-300">
                  {chaptersData.length} Chapters Globally
                </h3>
                <p className="text-base sm:text-lg md:text-xl text-teal-100 leading-relaxed">
                  From Lagos to London, New York to Canada, our chapters serve as beacons of cultural pride and
                  community service, maintaining our traditions while adapting to local contexts and needs.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="text-center mt-8 sm:mt-12"
            >
              <Button
                onClick={() =>
                  window.open(
                    "https://eko-club-international.vercel.app/about/our-story",
                    "_blank",
                    "noopener,noreferrer",
                  )
                }
                className="bg-yellow-300 hover:bg-yellow-400 text-gray-900 font-semibold px-8 py-3 text-lg transition-all duration-300 hover:scale-105"
              >
                Learn More About Us
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Chapters Modal */}
        <AnimatePresence>
          {selectedRegion && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-2 sm:p-4"
              onClick={closeChaptersModal}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-lg max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="bg-gradient-to-r from-purple-600 to-teal-600 p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-bold text-white">{selectedRegion} Chapters</h2>
                      <p className="text-white/90 text-sm sm:text-base">
                        {getChaptersByRegion(selectedRegion).length} active chapters
                      </p>
                    </div>
                    <button
                      onClick={closeChaptersModal}
                      className="bg-white/20 hover:bg-white/30 p-1.5 sm:p-2 rounded-full transition-colors"
                    >
                      <X className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white" />
                    </button>
                  </div>
                </div>

                <div className="p-4 sm:p-6 max-h-[calc(95vh-12rem)] sm:max-h-[calc(90vh-16rem)] overflow-y-auto">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {getChaptersByRegion(selectedRegion).map((chapter) => (
                      <motion.div
                        key={chapter.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: chapter.id * 0.05 }}
                        className={`bg-gray-50 p-4 sm:p-6 rounded-lg border-2 transition-all duration-300 ${
                          chapter.url && chapter.url !== "#"
                            ? "hover:border-purple-300 hover:shadow-lg cursor-pointer"
                            : "border-gray-200"
                        }`}
                        onClick={() => handleChapterClick(chapter.url)}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-1">{chapter.name}</h3>
                            <p className="text-sm text-gray-600">{chapter.country}</p>
                          </div>
                          {chapter.url && chapter.url !== "#" && (
                            <ExternalLink className="h-4 w-4 text-gray-400 flex-shrink-0 ml-2" />
                          )}
                        </div>
                        <div className="flex items-center justify-end">
                          {chapter.url && chapter.url !== "#" && (
                            <span className="text-xs text-purple-600 font-medium">Visit Website</span>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {getChaptersByRegion(selectedRegion).length === 0 && (
                    <div className="text-center py-8">
                      <p className="text-gray-500">No chapters found in this region.</p>
                    </div>
                  )}
                </div>

                <div className="border-t border-gray-200 p-4 sm:p-6">
                  <Button
                    onClick={closeChaptersModal}
                    className="bg-purple-600 hover:bg-purple-700 text-white w-full sm:w-auto"
                  >
                    Close
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        <Footer />
      </div>
    </div>
  )
}
