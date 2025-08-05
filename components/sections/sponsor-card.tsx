"use client"

import { motion } from "framer-motion"
import { ExternalLink, Building, Users, DollarSign, Gift } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Sponsor {
  _id: string
  name: string
  description?: string
  pic?: string
  sponsorshipType: "regular" | "corporate"
  contribution?: {
    type: "monetary" | "in-kind" | "both"
    monetaryAmount?: number
    inKindDescription?: string
  }
  websiteLink?: string
  createdAt: string
  updatedAt: string
}

interface SponsorCardProps {
  sponsor: Sponsor
  onReadMore: () => void
}

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

export function SponsorCard({ sponsor, onReadMore }: SponsorCardProps) {
  const truncateDescription = (text: string, maxLength = 100) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + "..."
  }

  const getContributionIcon = () => {
    if (!sponsor.contribution) return <Gift className="h-4 w-4" />

    switch (sponsor.contribution.type) {
      case "monetary":
        return <DollarSign className="h-4 w-4" />
      case "in-kind":
        return <Gift className="h-4 w-4" />
      case "both":
        return <DollarSign className="h-4 w-4" />
      default:
        return <Gift className="h-4 w-4" />
    }
  }

  const getContributionText = () => {
    if (!sponsor.contribution) return "Support"

    const { type, monetaryAmount, inKindDescription } = sponsor.contribution

    switch (type) {
      case "monetary":
        return monetaryAmount ? `$${monetaryAmount.toLocaleString()}` : "Monetary Support"
      case "in-kind":
        return "In-Kind Support"
      case "both":
        return monetaryAmount ? `$${monetaryAmount.toLocaleString()} + In-Kind` : "Monetary + In-Kind"
      default:
        return "Support"
    }
  }

  return (
    <motion.div
      variants={fadeInUp}
      className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100"
    >
      {/* Sponsor Image */}
      <div className="relative h-48 bg-gray-100 overflow-hidden">
        {sponsor.pic ? (
          <img
            src={sponsor.pic || "/placeholder.svg"}
            alt={`${sponsor.name} logo`}
            className="w-full h-full object-contain p-4"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.style.display = "none"
              target.nextElementSibling?.classList.remove("hidden")
            }}
          />
        ) : null}
        <div
          className={`${sponsor.pic ? "hidden" : ""} absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-100 to-teal-100`}
        >
          {sponsor.sponsorshipType === "corporate" ? (
            <Building className="h-16 w-16 text-purple-400" />
          ) : (
            <Users className="h-16 w-16 text-teal-400" />
          )}
        </div>

        {/* Sponsorship Type Badge */}
        <div className="absolute top-3 right-3">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              sponsor.sponsorshipType === "corporate" ? "bg-purple-100 text-purple-800" : "bg-teal-100 text-teal-800"
            }`}
          >
            {sponsor.sponsorshipType === "corporate" ? "Corporate" : "Regular"}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">{sponsor.name}</h3>

        {/* Contribution Info */}
        <div className="flex items-center space-x-2 mb-3">
          <div className="flex items-center space-x-1 text-purple-600">
            {getContributionIcon()}
            <span className="text-sm font-medium">{getContributionText()}</span>
          </div>
        </div>

        {/* Description */}
        {sponsor.description && (
          <div className="mb-4">
            <p className="text-gray-600 text-sm leading-relaxed">{truncateDescription(sponsor.description)}</p>
            {sponsor.description.length > 100 && (
              <button
                onClick={onReadMore}
                className="text-purple-600 hover:text-purple-800 text-sm font-medium mt-2 transition-colors"
              >
                Read more
              </button>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 mt-4">
          <Button
            onClick={onReadMore}
            variant="outline"
            size="sm"
            className="flex-1 border-purple-200 text-purple-600 hover:bg-purple-50 bg-transparent"
          >
            View Details
          </Button>
          {sponsor.websiteLink && (
            <Button
              onClick={() => window.open(sponsor.websiteLink, "_blank")}
              variant="outline"
              size="sm"
              className="flex-1 border-gray-300 text-gray-600 hover:bg-gray-50"
            >
              <ExternalLink className="h-4 w-4 mr-1" />
              Website
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  )
}
