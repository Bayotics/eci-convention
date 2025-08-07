"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { TopBar } from "@/components/sections/top-bar"
import { Header } from "@/components/sections/header"
import { Footer } from "@/components/sections/footer"
import { Award, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

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

// Speaker Data
const keynoteSpeakers = [
  {
    id: "sanwo-olu",
    name: "His Excellency, Mr. Babajide Olusola Sanwo-Olu",
    title: "Executive Governor, Lagos State",
    image: "/images/sanwoolu.jpg?height=400&width=400",
    shortBio: "Visionary leader transforming Lagos State through innovative governance and sustainable development.",
    fullBio: `His Excellency, Mr. Babajide Olusola Sanwo-Olu is the Executive Governor of Lagos State, Nigeria, having assumed office on May 29, 2019. A seasoned administrator and technocrat, Governor Sanwo-Olu has brought a wealth of experience from both the private and public sectors to his role as the chief executive of Nigeria's commercial capital.

Born on June 25, 1965, in Lagos, Governor Sanwo-Olu holds a Bachelor of Science degree in Surveying from the University of Lagos and a Master of Business Administration from the University of Liverpool, United Kingdom. He is also an alumnus of the prestigious Lagos Business School Senior Management Programme and Harvard Business School.

Before his election as Governor, Sanwo-Olu served in various capacities in Lagos State government, including as Commissioner for Establishments, Training and Pensions (2007-2009), Commissioner for Commerce and Cooperatives (2009-2012), and Commissioner for Waterfront Infrastructure Development (2013-2016). His extensive experience in public administration has equipped him with deep insights into the workings of government and the challenges facing Lagos State.

As Governor, Sanwo-Olu has championed the T.H.E.M.E.S agenda - Traffic Management and Transportation, Health and Environment, Education and Technology, Making Lagos a 21st Century Economy, Entertainment and Tourism, and Security and Governance. Under his leadership, Lagos State has witnessed significant improvements in infrastructure development, healthcare delivery, education, and economic growth.

His administration has prioritized digital transformation, making Lagos a smart city through various technology initiatives. The Governor has also focused on improving the ease of doing business, attracting both local and international investments to the state.

Governor Sanwo-Olu's leadership during the COVID-19 pandemic was particularly noteworthy, as he implemented comprehensive health and economic measures that helped Lagos State navigate the crisis effectively. His commitment to transparency, accountability, and inclusive governance has earned him recognition both nationally and internationally.`,
    achievements: [
      "Led Lagos State's digital transformation initiatives",
      "Implemented comprehensive COVID-19 response strategy",
      "Advanced the T.H.E.M.E.S development agenda",
      "Improved ease of doing business rankings for Lagos",
      "Championed sustainable urban development projects",
    ],
    sessions: [
      {
        title: "Leadership in the 21st Century",
        time: "Friday, Sept 19 | 10:00 AM - 11:00 AM",
        description: "Keynote address on modern governance and leadership in a digital age",
      },
    ],
  },
  {
    id: "alake",
    name: "Hon. Olatunbosun Alake",
    title: "Commissioner for Innovation, Science & Technology, Lagos State",
    image: "/images/Tubosun-Alake.jpg?height=400&width=400",
    shortBio: "Technology visionary driving innovation and digital transformation across Lagos State.",
    fullBio: `Hon. Olatunbosun Alake serves as the Commissioner for Innovation, Science & Technology in Lagos State, where he has been instrumental in positioning Lagos as Nigeria's technology and innovation hub. With over two decades of experience in technology, business development, and public administration, Commissioner Alake brings a unique blend of technical expertise and strategic leadership to his role.

A graduate of Computer Science from the University of Lagos, Commissioner Alake holds advanced degrees in Information Technology Management and has completed executive programs at leading international institutions. His academic background, combined with extensive industry experience, has equipped him with the knowledge and skills necessary to drive technological advancement in Lagos State.

Before his appointment as Commissioner, Alake held senior positions in various technology companies, where he led digital transformation initiatives and managed large-scale technology projects. His private sector experience includes roles in software development, systems integration, and technology consulting, giving him practical insights into the challenges and opportunities in the technology sector.

As Commissioner, Alake has spearheaded numerous initiatives aimed at making Lagos a smart city. Under his leadership, the Ministry has launched several programs including the Lagos State Resident Registration Agency (LASRRA) digital platform, e-governance initiatives, and technology incubation programs for startups and entrepreneurs.

Commissioner Alake is passionate about using technology to solve societal problems and improve the quality of life for Lagos residents. He has been a strong advocate for digital inclusion, ensuring that technology benefits reach all segments of society. His work has contributed significantly to Lagos State's recognition as a leading technology destination in Africa.

His vision for Lagos includes creating a robust digital ecosystem that supports innovation, entrepreneurship, and economic growth. Through partnerships with local and international technology companies, educational institutions, and development organizations, he continues to drive initiatives that position Lagos at the forefront of Africa's digital revolution.`,
    achievements: [
      "Launched Lagos State digital identity platform",
      "Established technology incubation centers across Lagos",
      "Led smart city transformation initiatives",
      "Developed comprehensive e-governance framework",
      "Promoted digital literacy programs statewide",
      "Attracted major tech investments to Lagos",
    ],
    sessions: [
      {
        title: "Economic Advancement Through Technology",
        time: "Saturday, Sept 20 | 2:00 PM - 3:30 PM",
        description: "Exploring how technology and innovation drive economic growth and development",
      },
      {
        title: "Building Smart Cities in Africa",
        time: "Sunday, Sept 21 | 11:00 AM - 12:00 PM",
        description: "Panel discussion on urban technology solutions and digital transformation",
      },
    ],
  },
]

const featuredSpeakers = [
  {
    id: "adebayo",
    name: "Dr. Folake Adebayo",
    title: "Director, African Development Institute",
    image: "/placeholder.svg?height=300&width=300",
    shortBio: "Leading expert in sustainable development and community empowerment across Africa.",
    sessions: [
      {
        title: "Community Empowerment Strategies",
        time: "Friday, Sept 19 | 2:00 PM - 3:00 PM",
      },
    ],
    expertise: ["Sustainable Development", "Community Building", "Social Innovation"],
  },
  {
    id: "johnson",
    name: "Prof. Michael Johnson",
    title: "Cultural Heritage Specialist, UNESCO",
    image: "/placeholder.svg?height=300&width=300",
    shortBio: "Internationally recognized expert in cultural preservation and heritage management.",
    sessions: [
      {
        title: "Preserving Cultural Heritage in Modern Times",
        time: "Saturday, Sept 20 | 10:00 AM - 11:00 AM",
      },
    ],
    expertise: ["Cultural Preservation", "Heritage Management", "International Relations"],
  },
  {
    id: "williams",
    name: "Mrs. Aisha Williams",
    title: "CEO, Global Youth Leadership Foundation",
    image: "/placeholder.svg?height=300&width=300",
    shortBio: "Passionate advocate for youth development and leadership training worldwide.",
    sessions: [
      {
        title: "Bridging Generations: Youth Leadership",
        time: "Saturday, Sept 20 | 4:00 PM - 5:00 PM",
      },
    ],
    expertise: ["Youth Development", "Leadership Training", "Mentorship"],
  },
  {
    id: "okafor",
    name: "Dr. Chinedu Okafor",
    title: "Senior Partner, Okafor & Associates",
    image: "/placeholder.svg?height=300&width=300",
    shortBio: "Distinguished legal practitioner specializing in international law and governance.",
    sessions: [
      {
        title: "Legal Frameworks for Community Organizations",
        time: "Sunday, Sept 21 | 9:00 AM - 10:00 AM",
      },
    ],
    expertise: ["International Law", "Corporate Governance", "Legal Consulting"],
  },
  {
    id: "thompson",
    name: "Ms. Grace Thompson",
    title: "Director of Operations, Diaspora Connect",
    image: "/placeholder.svg?height=300&width=300",
    shortBio: "Expert in diaspora engagement and international community building.",
    sessions: [
      {
        title: "Strengthening Diaspora Networks",
        time: "Sunday, Sept 21 | 3:00 PM - 4:00 PM",
      },
    ],
    expertise: ["Diaspora Relations", "International Networks", "Community Engagement"],
  },
  {
    id: "ibrahim",
    name: "Dr. Amina Ibrahim",
    title: "Health Policy Advisor, WHO Africa",
    image: "/placeholder.svg?height=300&width=300",
    shortBio: "Leading public health expert focused on community health and wellness programs.",
    sessions: [
      {
        title: "Community Health and Wellness",
        time: "Friday, Sept 19 | 4:00 PM - 5:00 PM",
      },
    ],
    expertise: ["Public Health", "Health Policy", "Community Wellness"],
  },
]

export default function SpeakersPage() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <TopBar isScrolled={isScrolled} />
      <Header isScrolled={isScrolled} />

      {/* Hero/Banner Section */}
      <section
        className="relative text-white py-8 sm:py-12 md:py-16 lg:py-20"
        style={{
          backgroundImage: "url('/images/speakers-banner.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/80 via-blue-600/70 to-teal-500/80"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-[190px] sm:pt-[130px] md:pt-[140px] lg:pt-[150px]">
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
              Meet our distinguished guests
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 text-white drop-shadow-lg leading-tight"
            >
              Featured Speakers
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 leading-relaxed max-w-3xl"
            >
              Join us for inspiring presentations from visionary leaders, innovators, and change-makers who are shaping
              the future of our communities and the world.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Keynote Speakers Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold pb-4 sm:mb-6 bg-gradient-to-r from-purple-600 to-teal-600 bg-clip-text text-transparent">
              Keynote Speakers
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed px-4">
              Our distinguished keynote speakers bring decades of leadership experience and visionary insights to
              ECI@25.
            </p>
          </motion.div>

          <div className="space-y-16 sm:space-y-20">
            {keynoteSpeakers.map((speaker, index) => (
              <motion.div
                key={speaker.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-start ${
                  index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
                }`}
              >
                {/* Speaker Image */}
                <div className={`${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
                  <div className="relative">
                    <img
                      src={speaker.image || "/placeholder.svg"}
                      alt={speaker.name}
                      className="w-full h-64 sm:h-80 md:h-96 object-cover rounded-lg shadow-lg"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg"></div>
                    <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1 sm:mb-2 leading-tight">
                        {speaker.name}
                      </h3>
                      <p className="text-white/90 text-sm sm:text-base md:text-lg leading-tight">{speaker.title}</p>
                    </div>
                  </div>
                </div>

                {/* Speaker Content */}
                <div className={`${index % 2 === 1 ? "lg:col-start-1" : ""}`}>
                  <div className="space-y-4 sm:space-y-6">
                    <div>
                      <h4 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">Biography</h4>
                      <div className="text-sm sm:text-base text-gray-600 leading-relaxed space-y-3 sm:space-y-4">
                        {speaker.fullBio
                          .split("\n\n")
                          .slice(0, 2)
                          .map((paragraph, pIndex) => (
                            <p key={pIndex}>{paragraph}</p>
                          ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">Key Achievements</h4>
                      <ul className="space-y-2 sm:space-y-3">
                        {speaker.achievements.map((achievement, aIndex) => (
                          <li key={aIndex} className="flex items-start space-x-2 sm:space-x-3">
                            <Award className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm sm:text-base text-gray-600 leading-relaxed">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">Speaking Sessions</h4>
                      <div className="space-y-3 sm:space-y-4">
                        {speaker.sessions.map((session, sIndex) => (
                          <div
                            key={sIndex}
                            className="bg-gradient-to-r from-purple-50 to-teal-50 p-4 sm:p-6 rounded-lg"
                          >
                            <h5 className="text-base sm:text-lg font-bold text-gray-800 mb-2">{session.title}</h5>
                            <div className="flex items-center space-x-2 sm:space-x-4 text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">
                              <div className="flex items-center space-x-1">
                                <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                                <span>{session.time}</span>
                              </div>
                            </div>
                            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{session.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section
        style={{
          backgroundImage: "url('/images/circle-scatter-haikei.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        className="py-12 sm:py-16 md:py-20 text-white"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
              Don't Miss These Inspiring Sessions
            </h2>
            <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-purple-100 max-w-3xl mx-auto leading-relaxed px-4">
              Join us for three days of transformative discussions, networking, and learning from some of the most
              influential leaders of our time.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center max-w-md sm:max-w-none mx-auto">
              <Button
                size="lg"
                className="bg-pink-500 hover:bg-pink-600 text-white px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg w-full sm:w-auto"
              >
                <Link href={"/register"}>Register Now</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-purple-600 px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg bg-white/10 backdrop-blur-sm w-full sm:w-auto"
              >
                <Link href={"/agenda"}>View Full Agenda</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
