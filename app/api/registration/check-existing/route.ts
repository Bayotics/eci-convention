import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import Registration from "@/models/registration"

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    const existingRegistration = await Registration.findOne({
      email: email.toLowerCase(),
      registrationStatus: { $in: ["confirmed", "pending"] },
    })

    return NextResponse.json({
      exists: !!existingRegistration,
      registration: existingRegistration
        ? {
            registrationId: existingRegistration.registrationId,
            registrationType: existingRegistration.registrationType,
            membershipStatus: existingRegistration.membershipStatus,
          }
        : null,
    })
  } catch (error) {
    console.error("Check existing registration error:", error)
    return NextResponse.json({ error: "Failed to check registration" }, { status: 500 })
  }
}
