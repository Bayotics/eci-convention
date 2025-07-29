"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, Calendar, CreditCard, UserPlus } from "lucide-react"
import { useRouter } from "next/navigation"

interface NonMemberRegistrationModalProps {
  isOpen: boolean
  onClose: () => void
}

export function NonMemberRegistrationModal({ isOpen, onClose }: NonMemberRegistrationModalProps) {
  const router = useRouter()

  const handleOptionClick = (option: string) => {
    switch (option) {
      case "economic-session":
        router.push("/register/guest/economic-session")
        break
      case "pay-as-guest":
        router.push("/register/payment?type=guest")
        break
      case "join-member":
        window.open("https://ekoclub.org/membership", "_blank")
        break
    }
    onClose()
  }

  const handleClose = () => {
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-lg max-w-md w-full p-6 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Guest Registration Options</h2>
              <button onClick={handleClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Options */}
            <div className="space-y-4">
              {/* Economic Session Only */}
              <button
                onClick={() => handleOptionClick("economic-session")}
                className="w-full p-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg hover:from-green-100 hover:to-emerald-100 transition-colors text-left"
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <Calendar className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-800 mb-1">Register for Free Economic Session</h3>
                    <p className="text-sm text-gray-600">Join our free economic development session on Thursday</p>
                    <div className="mt-2">
                      <span className="inline-block bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">
                        FREE
                      </span>
                    </div>
                  </div>
                </div>
              </button>

              {/* Pay as Guest */}
              <button
                onClick={() => handleOptionClick("pay-as-guest")}
                className="w-full p-6 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-lg hover:from-blue-100 hover:to-cyan-100 transition-colors text-left"
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <CreditCard className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-800 mb-1">Pay and Register as Guest</h3>
                    <p className="text-sm text-gray-600">Full convention access with guest pricing</p>
                    <div className="mt-2">
                      <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
                        GUEST RATES
                      </span>
                    </div>
                  </div>
                </div>
              </button>

              {/* Join as Member */}
              <button
                onClick={() => handleOptionClick("join-member")}
                className="w-full p-6 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg hover:from-purple-100 hover:to-pink-100 transition-colors text-left"
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-purple-100 p-3 rounded-full">
                    <UserPlus className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-800 mb-1">Join ECI as a Member</h3>
                    <p className="text-sm text-gray-600">Become an ECI member and enjoy member benefits</p>
                    <div className="mt-2">
                      <span className="inline-block bg-purple-100 text-purple-800 text-xs font-medium px-2 py-1 rounded">
                        MEMBER BENEFITS
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                Choose the option that best fits your needs. You can always upgrade your registration later.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
