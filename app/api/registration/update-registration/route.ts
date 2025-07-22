import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import Registration from "@/models/registration"

export async function PUT(request: NextRequest) {
  try {
    await connectDB()

    const updateData = await request.json()
    const { email, ...fieldsToUpdate } = updateData

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    // Find and update the registration
    const registration = await Registration.findOneAndUpdate(
      {
        email: email.toLowerCase(),
        registrationStatus: { $in: ["confirmed", "pending"] },
      },
      {
        ...fieldsToUpdate,
        updatedAt: new Date(),
      },
      { new: true },
    )

    if (!registration) {
      return NextResponse.json({ error: "Registration not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: "Registration updated successfully",
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
      },
    })
  } catch (error) {
    console.error("Update registration error:", error)
    return NextResponse.json({ error: "Failed to update registration" }, { status: 500 })
  }
}
