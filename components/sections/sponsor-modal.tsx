"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, ExternalLink, Building, Users, DollarSign, Gift, Calendar, Globe } from "lucide-react"
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

interface SponsorModalProps {
  sponsor: Sponsor
  isOpen: boolean
  onClose: () => void
}

export function SponsorModal({ sponsor, isOpen, onClose }: SponsorModalProps) {
  const getContributionIcon = () => {
    if (!sponsor.contribution) return <Gift className="h-5 w-5" />

    switch (sponsor.contribution.type) {
      case "monetary":
        return <DollarSign className="h-5 w-5" />
      case "in-kind":
        return <Gift className="h-5 w-5" />
      case "both":
        return <DollarSign className="h-5 w-5" />
      default:
        return <Gift className="h-5 w-5" />
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="relative">
                {/* Sponsor Image */}
                <div className="h-48 bg-gradient-to-br from-purple-100 to-teal-100 relative overflow-hidden">
                  {sponsor.pic ? (
                    <img
                      src={sponsor.pic || "/placeholder.svg"}
                      alt={`${sponsor.name} logo`}
                      className="w-full h-full object-contain p-6"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.style.display = "none"
                        target.nextElementSibling?.classList.remove("hidden")
                      }}
                    />
                  ) : null}
                  <div className={`${sponsor.pic ? "hidden" : ""} absolute inset-0 flex items-center justify-center`}>
                    {sponsor.sponsorshipType === "corporate" ? (
                      <Building className="h-20 w-20 text-purple-400" />
                    ) : (
                      <Users className="h-20 w-20 text-teal-400" />
                    )}
                  </div>

                  {/* Close Button */}
                  <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-colors"
                  >
                    <X className="h-5 w-5 text-gray-600" />
                  </button>

                  {/* Sponsorship Type Badge */}
                  {/* <div className="absolute top-4 left-4">
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-semibold ${
                        sponsor.sponsorshipType === "corporate"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-teal-100 text-teal-800"
                      }`}
                    >
                      {sponsor.sponsorshipType === "corporate" ? "Corporate Sponsor" : "Regular Sponsor"}
                    </span>
                  </div> */}
                </div>

                {/* Content */}
                <div className="p-8">
                  {/* Title */}
                  <h2 className="text-3xl font-bold text-gray-800 mb-6">{sponsor.name}</h2>

                  {/* Contribution Details */}
                  {sponsor.contribution && (
                    <div className="bg-gradient-to-r from-purple-50 to-teal-50 rounded-lg p-6 mb-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                        {getContributionIcon()}
                        <span className="ml-2">Contribution Details</span>
                      </h3>

                      <div className="space-y-3">
                        {/* <div className="flex items-center justify-between">
                          <span className="text-gray-600">Type:</span>
                          <span className="font-medium capitalize text-purple-600">
                            {sponsor.contribution.type.replace("-", " ")}
                          </span>
                        </div> */}

                        {sponsor.contribution.monetaryAmount && (
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Amount:</span>
                            <span className="font-bold text-green-600 text-lg">
                              ${sponsor.contribution.monetaryAmount.toLocaleString()}
                            </span>
                          </div>
                        )}

                        {sponsor.contribution.inKindDescription && (
                          <div>
                            {/* <span className="text-gray-600 block mb-2">Contribution:</span> */}
                            <p className="text-gray-800 bg-white p-3 rounded border-l-4 border-teal-400">
                              {sponsor.contribution.inKindDescription}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Description */}
                  {sponsor.description && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">About {sponsor.name}</h3>
                      <p className="text-gray-600 leading-relaxed">{sponsor.description}</p>
                    </div>
                  )}

                  {/* Additional Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {/* <div className="flex items-center space-x-3 text-gray-600">
                      <Calendar className="h-5 w-5" />
                      <div>
                        <p className="text-sm">Partnership Since</p>
                        <p className="font-medium">{formatDate(sponsor.createdAt)}</p>
                      </div>
                    </div> */}

                    {sponsor.websiteLink && (
                      <div className="flex items-center space-x-3 text-gray-600">
                        <Globe className="h-5 w-5" />
                        <div>
                          <p className="text-sm">Website</p>
                          <a
                            href={sponsor.websiteLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-purple-600 hover:text-purple-800 transition-colors"
                          >
                            Visit Website
                          </a>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
                    {sponsor.websiteLink && (
                      <Button
                        onClick={() => window.open(sponsor.websiteLink, "_blank")}
                        className="flex-1 bg-gradient-to-r from-purple-600 to-teal-600 hover:from-purple-700 hover:to-teal-700 text-white"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Visit Website
                      </Button>
                    )}
                    <Button
                      onClick={onClose}
                      variant="outline"
                      className="flex-1 border-gray-300 text-gray-600 hover:bg-gray-50 bg-transparent"
                    >
                      Close
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
