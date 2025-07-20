import { type NextRequest, NextResponse } from "next/server"
import { getRegistrationStats } from "@/lib/registration"
import { getDatabase } from "@/lib/mongodb"

export async function GET(request: NextRequest) {
  try {
    const db = await getDatabase()

    // Get registration stats
    const registrationStats = await getRegistrationStats()

    // Get admin count
    const users = db.collection("users")
    const adminCount = await users.countDocuments({ isActive: true })

    // Get recent registrations
    const registrations = db.collection("registrations")
    const recentRegistrations = await registrations.find({}).sort({ registrationDate: -1 }).limit(5).toArray()

    return NextResponse.json({
      success: true,
      data: {
        stats: {
          totalRegistrations: registrationStats.totalRegistrations,
          totalAdmins: adminCount,
          totalRevenue: registrationStats.totalRevenue,
          registrationsByCategory: {
            youth: registrationStats.youthRegistrations,
            adult: registrationStats.adultRegistrations,
            senior: registrationStats.seniorRegistrations,
          },
        },
        recentRegistrations: recentRegistrations.map((reg) => ({
          id: reg._id,
          name: `${reg.firstName} ${reg.lastName}`,
          email: reg.email,
          chapter: reg.chapterName,
          category: reg.registrationCategory,
          amount: reg.ticketPrice,
          date: reg.registrationDate,
        })),
      },
    })
  } catch (error) {
    console.error("Dashboard API error:", error)
    return NextResponse.json({ error: "Failed to fetch dashboard data" }, { status: 500 })
  }
}
