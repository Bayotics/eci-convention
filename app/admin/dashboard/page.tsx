"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Users, UserCheck, DollarSign, Calendar, TrendingUp, Activity, Clock, Mail } from "lucide-react"

interface DashboardStats {
  totalRegistrations: number
  totalAdmins: number
  totalRevenue: number
  registrationsByCategory: {
    youth: number
    adult: number
    senior: number
  }
}

interface RecentRegistration {
  id: string
  name: string
  email: string
  chapter: string
  category: string
  amount: number
  date: string
}

interface DashboardData {
  stats: DashboardStats
  recentRegistrations: RecentRegistration[]
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
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

export default function AdminDashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const response = await fetch("/api/admin/dashboard")
      const data = await response.json()

      if (data.success) {
        setDashboardData(data.data)
      } else {
        setError("Failed to load dashboard data")
      }
    } catch (error) {
      setError("Network error")
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
      </AdminLayout>
    )
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600">{error}</p>
        </div>
      </AdminLayout>
    )
  }

  const stats = dashboardData?.stats
  const recentRegistrations = dashboardData?.recentRegistrations || []

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome to the ECI@25 Convention Management System</p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <motion.div variants={fadeInUp} className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Registrations</p>
                <p className="text-3xl font-bold text-gray-800">{stats?.totalRegistrations || 0}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>Active registrations</span>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-3xl font-bold text-gray-800">${stats?.totalRevenue || 0}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>From registrations</span>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Admin Users</p>
                <p className="text-3xl font-bold text-gray-800">{stats?.totalAdmins || 0}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <UserCheck className="h-8 w-8 text-purple-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-purple-600">
              <Activity className="h-4 w-4 mr-1" />
              <span>Active admins</span>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Days to Event</p>
                <p className="text-3xl font-bold text-gray-800">
                  {Math.ceil((new Date("2025-09-18").getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))}
                </p>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <Calendar className="h-8 w-8 text-orange-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-orange-600">
              <Clock className="h-4 w-4 mr-1" />
              <span>Until ECI@25</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Registration Categories Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* Registration by Category */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Registrations by Category</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Youth (10-17 years)</span>
                <div className="flex items-center space-x-3">
                  <div className="bg-green-200 rounded-full h-2 w-32">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{
                        width: `${stats?.totalRegistrations ? (stats.registrationsByCategory.youth / stats.totalRegistrations) * 100 : 0}%`,
                      }}
                    ></div>
                  </div>
                  <span className="font-bold text-gray-800 w-8">{stats?.registrationsByCategory.youth || 0}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Adult (18-69 years)</span>
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-200 rounded-full h-2 w-32">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{
                        width: `${stats?.totalRegistrations ? (stats.registrationsByCategory.adult / stats.totalRegistrations) * 100 : 0}%`,
                      }}
                    ></div>
                  </div>
                  <span className="font-bold text-gray-800 w-8">{stats?.registrationsByCategory.adult || 0}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Senior (70+ years)</span>
                <div className="flex items-center space-x-3">
                  <div className="bg-purple-200 rounded-full h-2 w-32">
                    <div
                      className="bg-purple-500 h-2 rounded-full"
                      style={{
                        width: `${stats?.totalRegistrations ? (stats.registrationsByCategory.senior / stats.totalRegistrations) * 100 : 0}%`,
                      }}
                    ></div>
                  </div>
                  <span className="font-bold text-gray-800 w-8">{stats?.registrationsByCategory.senior || 0}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Registrations */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Recent Registrations</h3>
            <div className="space-y-4">
              {recentRegistrations.length > 0 ? (
                recentRegistrations.map((registration, index) => (
                  <div key={registration.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                    <div className="bg-purple-100 p-2 rounded-full">
                      <Mail className="h-4 w-4 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">{registration.name}</p>
                      <p className="text-sm text-gray-600">
                        {registration.chapter} • {registration.category}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">${registration.amount}</p>
                      <p className="text-xs text-gray-500">{new Date(registration.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-8">No recent registrations</p>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AdminLayout>
  )
}
