"use client"

import { useState } from "react"
import { ChevronDown, Search, Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const faqData = [
  {
    id: 1,
    category: "General",
    question: "When and where will the convention take place?",
    answer:
      "The 14th Biennial Convention will take place from September 17-21, 2025, in Newark, New Jersey, at the DoubleTree Hotel.",
  },
  {
    id: 2,
    category: "General",
    question: "What is the theme of the convention?",
    answer: '"Bridging Generations, Building Communities."',
  },
  {
    id: 3,
    category: "Registration",
    question: "How can I register for the convention?",
    answer:
      "Registration can be completed online via the official ECI Convention website, the main ECI webpage, or through your local ECI chapter. Once registered, you will receive an email confirmation. Upon arrival at the DoubleTree Hotel, confirmation will be done at the hotel lobby where registered attendees will be verified using their email confirmation and a valid government-issued ID. After successful validation, a badge will be issued along with your registration package. Please note that the badge must be worn at all times during the convention and is for registered members only. There is no return or refund policy after registration; however, you may edit your registered events prior to the convention. For free events, admittance will be granted without badge issuance.",
  },
  {
    id: 4,
    category: "Registration",
    question: "What are the age specifications for ticket prices?",
    answer:
      "Different ticket prices apply for children (ages 5-12), youth (ages 13-17), and adults (18+). Age verification will be conducted at the event doors. Attendees must present a valid government-issued ID matching their registered age. If discrepancies are found, additional fees will be charged before badge issuance and entry into the event.",
  },
  {
    id: 5,
    category: "Events",
    question: "What events are scheduled for youth participants?",
    answer:
      "Youth activities include a Welcome Party/Cultural Picnic, a Youth Dinner, and a guided tour of significant landmarks in New York and New Jersey.",
  },
  {
    id: 6,
    category: "Events",
    question: "Are there religious services available?",
    answer:
      "Yes, a Jumaat Prayer is scheduled on Friday, September 19, and an Interdenominational Church Service on Sunday, September 21.",
  },
  {
    id: 7,
    category: "Events",
    question: "Will there be networking opportunities?",
    answer: "Yes, multiple networking events include breakfasts, lunches, and dinners throughout the convention days.",
  },
  {
    id: 8,
    category: "Events",
    question: "What is the dress code for the banquet?",
    answer:
      "The Presidential/Fundraising/Award Night Banquet on Friday, September 19, requires either black-tie attire or traditional Ankara wear.",
  },
  {
    id: 9,
    category: "Events",
    question: "Are there any community engagement activities?",
    answer:
      "Yes, a Community Outreach session on Friday, September 19, involves service projects at local community centers.",
  },
  {
    id: 10,
    category: "Events",
    question: "Will there be discussions or panels about economic development?",
    answer:
      "Yes, an Economic Session is scheduled on Friday, September 19, featuring experts discussing opportunities for economic growth in Nigeria and the diaspora. This session is free to attend, and participants do not need to be ECI members. However, registration is required, and attendees must update their attendance confirmation as the event draws near to ensure accurate headcounts.",
  },
  {
    id: 11,
    category: "Events",
    question: "What health and wellness activities are planned?",
    answer: 'A community health and wellness "Walk For Life" is scheduled for Saturday morning, September 20.',
  },
  {
    id: 12,
    category: "Events",
    question: "What is the process for electing a new executive committee?",
    answer:
      "The election process involves candidate presentations and voting, taking place on Saturday, September 20, followed by an inauguration gala.",
  },
  {
    id: 13,
    category: "Logistics",
    question: "Is transportation provided for tours?",
    answer: "Yes, transportation will be arranged for the guided tours of landmarks around New York and New Jersey.",
  },
  {
    id: 14,
    category: "Contact",
    question: "Who can I contact for more information?",
    answer: "Convention Committee Chairman: Honorable Wallace\nPhone: +1 (610) 203-0370\nEmail: waletayo2000@yahoo.com",
  },
  {
    id: 15,
    category: "Logistics",
    question: "When should I check out of the hotel?",
    answer: "Check-out and departure arrangements begin at 11:00 AM on Sunday, September 21.",
  },
  {
    id: 16,
    category: "Registration",
    question: "Are meals included in the registration?",
    answer:
      "Yes, breakfast and lunch are included, and certain dinners like the Youth Dinner and Award Night Banquet are part of the convention package.",
  },
  {
    id: 17,
    category: "Registration",
    question: "Can non-members attend the convention?",
    answer:
      "Yes, non-members may attend selected events. Please check registration guidelines for specific details on non-member access.",
  },
  {
    id: 18,
    category: "General",
    question: "Are there sponsorship or donation opportunities available?",
    answer:
      "Yes, sponsorship and donation opportunities are welcomed. Please contact the ECI Executive Committee for details.",
  },
  {
    id: 19,
    category: "Logistics",
    question: "Is there an official convention hotel?",
    answer: "Yes, the official convention hotel is the DoubleTree Hotel in Newark, New Jersey.",
  },
  {
    id: 20,
    category: "Registration",
    question: "What identification is required at registration?",
    answer:
      "All attendees must bring a valid government-issued ID for verification and identification purposes. Age-based pricing and access will be strictly enforced based on this ID.",
  },
]

const categories = ["All", "General", "Registration", "Events", "Logistics", "Contact"]

export function FAQSection() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [openItems, setOpenItems] = useState<number[]>([])

  const filteredFAQs = faqData.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || faq.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const toggleItem = (id: number) => {
    setOpenItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Search and Filter */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 text-lg border-2 border-gray-200 focus:border-green-500"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={`${
                  selectedCategory === category
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : "border-green-600 text-green-600 hover:bg-green-50"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto">
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No FAQs found matching your search criteria.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredFAQs.map((faq) => (
                <div
                  key={faq.id}
                  className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <button
                    onClick={() => toggleItem(faq.id)}
                    className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="flex-1">
                      <span className="inline-block px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded-full mb-2">
                        {faq.category}
                      </span>
                      <h3 className="text-lg font-semibold text-gray-900 pr-4">{faq.question}</h3>
                    </div>
                    <ChevronDown
                      className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${
                        openItems.includes(faq.id) ? "transform rotate-180" : ""
                      }`}
                    />
                  </button>

                  {openItems.includes(faq.id) && (
                    <div className="px-6 pb-4">
                      <div className="pt-2 border-t border-gray-100">
                        <p className="text-gray-700 leading-relaxed whitespace-pre-line">{faq.answer}</p>
                        {faq.id === 14 && (
                          <div className="mt-4 flex flex-col sm:flex-row gap-3">
                            <a
                              href="tel:+16102030370"
                              className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium"
                            >
                              <Phone className="h-4 w-4" />
                              +1 (610) 203-0370
                            </a>
                            <a
                              href="mailto:waletayo2000@yahoo.com"
                              className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium"
                            >
                              <Mail className="h-4 w-4" />
                              waletayo2000@yahoo.com
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Contact Section */}
        <div className="max-w-2xl mx-auto mt-16 text-center">
          <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Still Have Questions?</h3>
            <p className="text-gray-600 mb-6">
              Can't find what you're looking for? Contact our Convention Committee Chairman directly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+16102030370"
                className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
              >
                <Phone className="h-5 w-5" />
                Call Now
              </a>
              <a
                href="mailto:waletayo2000@yahoo.com"
                className="inline-flex items-center justify-center gap-2 border-2 border-green-600 text-green-600 hover:bg-green-50 px-6 py-3 rounded-lg font-medium transition-colors duration-200"
              >
                <Mail className="h-5 w-5" />
                Send Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
