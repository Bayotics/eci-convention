import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import Registration from "@/models/registration"

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const email = searchParams.get("email")

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    const registration = await Registration.findOne({
      email: email.toLowerCase(),
      registrationStatus: { $in: ["confirmed", "pending"] },
    }).sort({ createdAt: -1 })

    if (!registration) {
      return NextResponse.json({ error: "Registration not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      registration: {
        registrationId: registration.registrationId,
        firstName: registration.firstName,
        lastName: registration.lastName,
        email: registration.email,
        chapterName: registration.chapterName,
        gender: registration.gender,
        shirtSize: registration.shirtSize,
        attendanceDays: registration.attendanceDays,
        registrationCategory: registration.registrationCategory,
        dietaryRestrictions: registration.dietaryRestrictions,
        membershipStatus: registration.membershipStatus,
        registrationType: registration.registrationType,
        registrationStatus: registration.registrationStatus,
        createdAt: registration.createdAt,
      },
    })
  } catch (error) {
    console.error("Get registration error:", error)
    return NextResponse.json({ error: "Failed to get registration" }, { status: 500 })
  }
}
