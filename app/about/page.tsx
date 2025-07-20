"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { TopBar } from "@/components/sections/top-bar"
import { Header } from "@/components/sections/header"
import { Footer } from "@/components/sections/footer"
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
  X,
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

// IBILE Division Data
const ibileDivisions = {
  ikeja: {
    name: "Ikeja",
    icon: Building,
    color: "orange",
    brief:
      "The capital of Lagos State and a major commercial and residential hub. Ikeja's history is intertwined with the development of Lagos as a modern city, serving as the administrative center of the state.",
    image: "/placeholder.svg?height=400&width=600",
    fullHistory: `Ikeja, the capital of Lagos State, stands as a testament to Nigeria's rapid urbanization and modernization. Originally a small Yoruba settlement, Ikeja has transformed into one of West Africa's most important commercial and administrative centers.

The area's name "Ikeja" is derived from the Yoruba phrase "Ike ja," which means "the place where we fought," referencing historical battles that took place in the region. The transformation of Ikeja began in earnest during the colonial period when the British recognized its strategic importance due to its elevated position and accessibility.

In 1976, when Lagos State was created, Ikeja was chosen as the state capital, marking the beginning of its rapid development. This decision was strategic, as Ikeja offered more space for expansion compared to the congested Lagos Island. The establishment of the Murtala Muhammed International Airport in Ikeja further cemented its importance as a gateway to Nigeria.

Today, Ikeja is home to numerous multinational corporations, banks, and government institutions. The Ikeja City Mall, one of Nigeria's largest shopping centers, symbolizes the area's commercial significance. The Computer Village in Ikeja is West Africa's largest technology market, earning the area recognition as a tech hub.

The residential areas of Ikeja, including GRA (Government Reserved Area), Allen Avenue, and Omole Estate, house many of Lagos State's elite and middle class. These neighborhoods showcase modern urban planning with well-laid roads, recreational facilities, and modern amenities.

Ikeja's educational institutions, including the University of Lagos (UNILAG) campus and numerous private schools, have made it an educational center. The area continues to evolve with ongoing infrastructure projects, including the Lagos Light Rail system, which will further enhance connectivity and economic opportunities.`,
  },
  badagry: {
    name: "Badagry",
    icon: Palmtree,
    color: "blue",
    brief:
      "A coastal town with rich history as a major trading post and significant site in the transatlantic slave trade. Badagry holds immense cultural and historical importance with remnants of slave routes and historical buildings.",
    image: "/placeholder.svg?height=400&width=600",
    fullHistory: `Badagry, located on the coast of Lagos State, holds one of the most significant and somber places in African and world history. This ancient town served as one of the major departure points for enslaved Africans during the transatlantic slave trade, making it a site of immense historical importance.

The town's history dates back several centuries, with the name "Badagry" believed to be derived from "Agbadarigi," meaning "Agbada's settlement," named after a local chief. The Portuguese were among the first Europeans to establish contact with Badagry in the 15th century, followed by other European traders who recognized the town's strategic coastal location.

During the height of the slave trade (16th-19th centuries), Badagry became a major slave port. The infamous "Point of No Return" at Gberefu Island marks the spot where countless Africans took their last steps on African soil before being shipped to the Americas. The town's slave routes, including the route from Seme to the coast, are now preserved as historical monuments.

The arrival of Christianity in Nigeria is also closely tied to Badagry. In 1842, Reverend Thomas Birch Freeman established the first Christian mission in Nigeria here. The First Storey Building in Nigeria, built in 1845, still stands in Badagry as a testament to early colonial architecture and Christian missionary activities.

Badagry is home to several historical sites including the Slave Museum, the First Storey Building Museum, Seriki Faremi Tomb, and the Badagry Heritage Museum. These sites preserve the town's complex history and serve as important educational resources about the slave trade and early colonial period.

Today, Badagry is experiencing renewed development with improved road networks connecting it to Lagos metropolis. The town's fishing industry remains vital to the local economy, while its historical significance attracts tourists and researchers from around the world. The annual Badagry Festival celebrates the town's cultural heritage while acknowledging its historical significance.

The Seme-Badagry Expressway has improved connectivity, and there are ongoing efforts to develop Badagry as a major tourist destination, balancing historical preservation with modern development needs.`,
  },
  ikorodu: {
    name: "Ikorodu",
    icon: Mountain,
    color: "green",
    brief:
      "A rapidly developing area with a dynamic mix of residential, industrial, and commercial zones. Ikorodu is one of the fastest-growing divisions in Lagos State, representing modern urban development.",
    image: "/placeholder.svg?height=400&width=600",
    fullHistory: `Ikorodu, one of Lagos State's fastest-growing divisions, represents the perfect blend of traditional Yoruba heritage and modern urban development. Located in the northeastern part of Lagos State, Ikorodu has transformed from a quiet traditional town into a bustling urban center.

The name "Ikorodu" is derived from the Yoruba phrase "Oko-odu," meaning "Odu's farm," named after a legendary hunter and farmer who first settled in the area. The town's history is deeply rooted in agriculture, with fertile lands that supported farming communities for centuries.

Traditionally, Ikorodu was known for its agricultural produce, particularly rice, cassava, and various vegetables that supplied Lagos markets. The town's location along the Lagos Lagoon made it an important inland port for transporting goods to Lagos Island and other coastal areas.

The modern transformation of Ikorodu began in the 1990s when Lagos State government identified it as a key area for urban expansion. The construction of the Ikorodu-Sagamu Road and later the Lagos-Ibadan Expressway significantly improved accessibility, triggering rapid development.

Today, Ikorodu hosts numerous residential estates including Magodo, Omole Phase 2, and several gated communities that attract middle and upper-class residents seeking affordable housing outside central Lagos. The area has become a preferred location for young families and professionals working in Lagos but seeking more spacious and affordable accommodation.

The division is home to Lagos State University (LASU), one of Nigeria's prominent state universities, which has contributed to the area's educational and intellectual development. The university attracts students from across Nigeria and has spurred the growth of student accommodation and related businesses.

Ikorodu's industrial development includes manufacturing plants, warehouses, and logistics centers that take advantage of the area's strategic location and relatively lower land costs. The proposed Fourth Mainland Bridge, which will connect Ikorodu to Lagos Island, promises to further accelerate development.

The area maintains its cultural heritage through traditional festivals and the preservation of historical sites, while embracing modern development. Markets like Ikorodu Market continue to serve as important commercial centers, blending traditional trading practices with modern commerce.

Infrastructure development continues with improved road networks, healthcare facilities, and educational institutions, making Ikorodu one of Lagos State's most promising areas for future growth.`,
  },
  lagosIsland: {
    name: "Lagos Island",
    icon: Crown,
    color: "purple",
    brief:
      "Historically known as Eko, Lagos Island is one of the oldest parts of Lagos where the first settlements were established. It has been a significant commercial and political center for centuries, with its name originating from the Benin Kingdom.",
    image: "/placeholder.svg?height=400&width=600",
    fullHistory: `Lagos Island, historically known as "Eko," stands as the birthplace of modern Lagos and the heart of Yoruba civilization in the region. This small island, measuring approximately 8.7 square kilometers, has been the center of political, commercial, and cultural activities for over 500 years.

The island's original name "Eko" is believed to have originated from the Benin Kingdom. According to historical accounts, Benin warriors who settled on the island called it "Eko," meaning "war camp" in the Bini language. The Portuguese later renamed it "Lagos" after the coastal town of Lagos in Portugal, due to its similar lagoon setting.

The establishment of Lagos Island as a major settlement began in the 15th century when Yoruba migrants, led by Ogunfunminire, settled on the island. The area became the seat of the Oba (king) of Lagos, establishing a royal dynasty that continues to this day. The Iga Idunganran (Palace of the Oba of Lagos) remains the traditional seat of power.

During the pre-colonial period, Lagos Island served as a major trading center. The island's strategic location made it a crucial link between the hinterland and the Atlantic Ocean. Trade in palm oil, ivory, and unfortunately, enslaved people, brought wealth and international attention to the island.

The British colonial period marked significant changes for Lagos Island. In 1861, Lagos was ceded to the British Crown, making it a British colony. The island became the administrative center of the Colony and Protectorate of Southern Nigeria. Colonial architecture from this period, including the old Secretariat building and various churches, still dot the landscape.

Lagos Island is home to numerous historical and cultural landmarks. The National Museum Lagos, housed in a colonial building, preserves Nigeria's cultural heritage. The Central Mosque on Lagos Island is one of Nigeria's oldest mosques, while the Cathedral Church of Christ is among the oldest Anglican churches in Nigeria.

The commercial significance of Lagos Island cannot be overstated. The famous Balogun Market, one of West Africa's largest markets, has been a commercial hub for centuries. The island also houses the Nigerian Stock Exchange, Central Bank of Nigeria Lagos branch, and numerous financial institutions.

Traditional festivals like the Eyo Festival, unique to Lagos Island, showcase the area's rich cultural heritage. The colorful masquerades and traditional ceremonies attract visitors from around the world and maintain the island's connection to its ancestral roots.

Despite modern challenges including congestion and infrastructure strain, Lagos Island remains the symbolic heart of Lagos State, balancing its role as a modern commercial center with its responsibilities as the keeper of Lagos's traditional heritage.`,
  },
  epe: {
    name: "Epe",
    icon: Network,
    color: "teal",
    brief:
      "A coastal town with strong fishing and agricultural traditions. Epe is known for its historical connections to the Epe kingdom and its vital role in the region's economy through maritime and agricultural activities.",
    image: "/placeholder.svg?height=400&width=600",
    fullHistory: `Epe, located in the eastern part of Lagos State along the Lagos Lagoon, is a historic coastal town that has maintained its traditional character while adapting to modern developments. Known for its rich fishing and agricultural heritage, Epe represents the traditional economic backbone of Lagos State.

The town's history dates back several centuries, with the name "Epe" believed to be derived from the Yoruba word "Epe," meaning "to curse" or "to invoke," possibly relating to traditional spiritual practices or historical events. The area was originally settled by Yoruba fishermen and farmers who recognized the fertile lands and abundant water resources.

Epe's traditional economy has always been centered around fishing and agriculture. The town's location along the Lagos Lagoon and its proximity to the Atlantic Ocean made it a natural fishing center. Generations of families have passed down fishing techniques and boat-building skills, creating a strong maritime culture that persists today.

The agricultural tradition of Epe is equally significant. The town's fertile lands support the cultivation of various crops including cassava, maize, vegetables, and fruits. Epe is particularly famous for its fish farming, with numerous fish ponds and aquaculture projects that supply fresh fish to Lagos markets.

The Epe Kingdom, with its traditional ruler (the Alara of Epe), has maintained its cultural and political significance throughout history. The palace serves as a center for traditional governance and cultural preservation, maintaining customs and traditions that date back centuries.

During the colonial period, Epe served as an important administrative center for the eastern part of Lagos Colony. The town's strategic location made it a crucial link between Lagos and the eastern regions, facilitating trade and administrative control.

Modern Epe has experienced significant development while maintaining its traditional character. The construction of the Lekki-Epe Expressway has improved connectivity to Lagos metropolis, leading to increased residential and commercial development. New housing estates and modern facilities have been established while respecting the town's traditional layout.

The Epe Resort and Spa, along with other tourism facilities, has positioned Epe as a destination for eco-tourism and cultural tourism. Visitors come to experience traditional fishing, boat rides on the lagoon, and authentic Yoruba cultural experiences.

Educational development in Epe includes several primary and secondary schools, as well as vocational training centers focused on fishing, agriculture, and related skills. These institutions help preserve traditional knowledge while providing modern education.

The annual Epe Day celebration brings together indigenes from around the world to celebrate their heritage and contribute to the town's development. This event showcases traditional music, dance, food, and crafts, maintaining cultural connections across generations.

Today, Epe continues to balance tradition with modernity, serving as a vital source of food for Lagos State while developing its potential as a tourist destination and residential area for those seeking a quieter lifestyle within Lagos State.`,
  },
}

export default function AboutPage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [selectedDivision, setSelectedDivision] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const openModal = (divisionKey: string) => {
    setSelectedDivision(divisionKey)
    document.body.style.overflow = "hidden" // Prevent background scrolling
  }

  const closeModal = () => {
    setSelectedDivision(null)
    document.body.style.overflow = "unset" // Restore scrolling
  }

  const currentDivision = selectedDivision ? ibileDivisions[selectedDivision as keyof typeof ibileDivisions] : null

  return (
    <div className="min-h-screen bg-white">
      <TopBar isScrolled={isScrolled} />
      <Header isScrolled={isScrolled} />

      {/* Hero/Banner Section */}
      <section
        className={`relative bg-gradient-to-br from-purple-600 via-blue-600 to-teal-500 text-white py-32 ${isScrolled ? "pt-44" : ""}`}
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
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
              className="text-lg md:text-xl italic text-white/90 mb-4"
            >
              Learn more about us
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white drop-shadow-lg leading-tight"
            >
              About the Convention
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg md:text-xl text-white/90 leading-relaxed max-w-3xl"
            >
              Discover the rich history, mission, and vision of Eko Club International as we celebrate 25 years of
              bridging generations and building communities worldwide.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ECI Legacy & Mission Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <motion.div variants={fadeInUp}>
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-teal-600 bg-clip-text text-transparent">
                Our Legacy & Mission
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-purple-100 p-3 rounded-full">
                    <Heart className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Our Mission</h3>
                    <p className="text-gray-600 leading-relaxed">
                      To foster unity, promote cultural heritage, and empower communities through service, leadership
                      development, and meaningful connections across generations.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-teal-100 p-3 rounded-full">
                    <Target className="h-6 w-6 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Our Vision</h3>
                    <p className="text-gray-600 leading-relaxed">
                      To be the leading global organization that bridges generations, preserves cultural identity, and
                      builds sustainable communities for future generations.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-orange-100 p-3 rounded-full">
                    <Users className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Our Values</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Unity, Excellence, Service, Cultural Pride, Leadership, Innovation, and Community Empowerment
                      guide everything we do.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <img
                src="/placeholder.svg?height=500&width=600"
                alt="ECI Community Celebration"
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Lagos State History Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-yellow-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
              The Rich Heritage of <span className="text-orange-600">Lagos State</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Discover the fascinating history of Lagos State and its five administrative divisions that form the IBILE
              acronym - the cultural and administrative foundation of our heritage.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
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
                <motion.div key={key} variants={fadeInUp} className="bg-white p-8 rounded-lg shadow-lg">
                  <div
                    className={`p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6 ${colorClasses[division.color as keyof typeof colorClasses]}`}
                  >
                    <IconComponent className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-800">{division.name}</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">{division.brief}</p>
                  <Button onClick={() => openModal(key)} className="bg-purple-600 hover:bg-purple-700 text-white">
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
            className="text-center mt-12"
          >
            <div className="bg-gradient-to-br from-orange-500 to-yellow-500 text-white p-8 rounded-lg">
              <h3 className="text-3xl font-bold mb-4 text-white">The IBILE Legacy</h3>
              <p className="text-xl text-orange-100 leading-relaxed">
                IBILE represents the five administrative divisions of Lagos State - <strong>I</strong>keja,{" "}
                <strong>B</strong>adagry, <strong>I</strong>korodu, <strong>L</strong>agos Island, and{" "}
                <strong>E</strong>pe. These divisions form the administrative and cultural backbone of Lagos State, each
                contributing unique historical significance, economic importance, and cultural heritage that continue to
                shape the identity of Lagos and its people worldwide. Our convention celebrates this rich legacy while
                building bridges to the future.
              </p>
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
            className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="relative">
                <img
                  src={currentDivision.image || "/placeholder.svg"}
                  alt={currentDivision.name}
                  className="w-full h-64 object-cover"
                />
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 bg-white/90 hover:bg-white p-2 rounded-full transition-colors"
                >
                  <X className="h-6 w-6 text-gray-800" />
                </button>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                  <h2 className="text-3xl font-bold text-white">{currentDivision.name}</h2>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 max-h-[calc(90vh-16rem)] overflow-y-auto">
                <div className="prose prose-lg max-w-none">
                  {currentDivision.fullHistory.split("\n\n").map((paragraph, index) => (
                    <p key={index} className="text-gray-700 leading-relaxed mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="border-t border-gray-200 p-6">
                <Button onClick={closeModal} className="bg-purple-600 hover:bg-purple-700 text-white">
                  Close
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Convention Theme Section */}
      <section className="py-20 bg-gradient-to-br from-purple-600 to-blue-600 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Convention Theme: <span className="text-yellow-300">"Bridging Generations, Building Communities"</span>
            </h2>
            <p className="text-xl text-purple-100 max-w-4xl mx-auto leading-relaxed">
              Our 25th anniversary theme reflects our commitment to connecting the wisdom of our elders with the energy
              of our youth, creating stronger, more unified communities for the future.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <motion.div variants={fadeInUp} className="bg-white/10 backdrop-blur-sm p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-4 text-yellow-300">Bridging Generations</h3>
              <p className="text-purple-100 leading-relaxed">
                We honor the wisdom and experience of our founding members while embracing the fresh perspectives and
                innovative ideas of our younger generation. This intergenerational dialogue creates a powerful synergy
                that drives our organization forward.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="bg-white/10 backdrop-blur-sm p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-4 text-yellow-300">Building Communities</h3>
              <p className="text-purple-100 leading-relaxed">
                Through service projects, cultural preservation, and leadership development, we create lasting positive
                impact in communities worldwide. Our work extends beyond our membership to benefit society as a whole.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* What to Expect Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
              What to <span className="text-purple-600">Expect</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
              ECI@25 promises an unforgettable experience filled with learning, networking, celebration, and community
              building.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <motion.div
              variants={fadeInUp}
              className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="bg-purple-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Mic className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">Engaging Panels & Workshops</h3>
              <p className="text-gray-600 leading-relaxed">
                Interactive sessions featuring industry leaders, thought-provoking discussions, and skill-building
                workshops designed to inspire and educate.
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="bg-pink-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Camera className="h-8 w-8 text-pink-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">Cultural Exhibitions</h3>
              <p className="text-gray-600 leading-relaxed">
                Vibrant displays of traditional arts, music, dance, and crafts celebrating our rich cultural heritage
                and diversity.
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="bg-teal-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Network className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">Networking Opportunities</h3>
              <p className="text-gray-600 leading-relaxed">
                Connect with fellow members from around the world, build lasting relationships, and expand your
                professional network.
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="bg-orange-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <PartyPopper className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">Gala Night & Awards</h3>
              <p className="text-gray-600 leading-relaxed">
                An elegant evening of celebration, recognition, and entertainment honoring outstanding achievements and
                contributions.
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="bg-green-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Building className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">Community Empowerment Projects</h3>
              <p className="text-gray-600 leading-relaxed">
                Hands-on service initiatives that make a tangible difference in local communities and demonstrate our
                commitment to giving back.
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="bg-yellow-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Award className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">25th Anniversary Ceremonies</h3>
              <p className="text-gray-600 leading-relaxed">
                Special commemorative events celebrating our 25-year journey, honoring founding members, and launching
                initiatives for the next 25 years.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Global Chapters Section */}
      <section className="py-20 bg-gradient-to-br from-teal-500 to-green-500 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              ECI Chapters <span className="text-yellow-300">Worldwide</span>
            </h2>
            <p className="text-xl text-teal-100 max-w-4xl mx-auto leading-relaxed">
              Our global network spans continents, connecting communities and fostering cultural exchange across the
              world.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            <motion.div variants={fadeInUp} className="text-center">
              <div className="bg-white/20 backdrop-blur-sm p-8 rounded-lg mb-4">
                <Globe className="h-12 w-12 mx-auto mb-4 text-yellow-300" />
                <h3 className="text-2xl font-bold mb-2">North America</h3>
                <p className="text-teal-100">15 Active Chapters</p>
              </div>
              <p className="text-sm text-teal-100">USA, Canada</p>
            </motion.div>

            <motion.div variants={fadeInUp} className="text-center">
              <div className="bg-white/20 backdrop-blur-sm p-8 rounded-lg mb-4">
                <Globe className="h-12 w-12 mx-auto mb-4 text-yellow-300" />
                <h3 className="text-2xl font-bold mb-2">Europe</h3>
                <p className="text-teal-100">12 Active Chapters</p>
              </div>
              <p className="text-sm text-teal-100">UK, Germany, Netherlands</p>
            </motion.div>

            <motion.div variants={fadeInUp} className="text-center">
              <div className="bg-white/20 backdrop-blur-sm p-8 rounded-lg mb-4">
                <Globe className="h-12 w-12 mx-auto mb-4 text-yellow-300" />
                <h3 className="text-2xl font-bold mb-2">Africa</h3>
                <p className="text-teal-100">25 Active Chapters</p>
              </div>
              <p className="text-sm text-teal-100">Nigeria, Ghana, South Africa</p>
            </motion.div>

            <motion.div variants={fadeInUp} className="text-center">
              <div className="bg-white/20 backdrop-blur-sm p-8 rounded-lg mb-4">
                <Globe className="h-12 w-12 mx-auto mb-4 text-yellow-300" />
                <h3 className="text-2xl font-bold mb-2">Asia & Others</h3>
                <p className="text-teal-100">8 Active Chapters</p>
              </div>
              <p className="text-sm text-teal-100">UAE, Australia, Asia</p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg">
              <h3 className="text-3xl font-bold mb-4 text-yellow-300">60+ Chapters Globally</h3>
              <p className="text-xl text-teal-100 leading-relaxed">
                From Lagos to London, New York to Nairobi, our chapters serve as beacons of cultural pride and community
                service, maintaining our traditions while adapting to local contexts and needs.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
