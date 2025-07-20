import { type NextRequest, NextResponse } from "next/server"
import { sendRegistrationConfirmation, sendAdminNotification } from "@/lib/email"

export async function POST(request: NextRequest) {
  try {
    const registrationData = await request.json()

    // Generate a unique registration ID
    const registrationId = `ECI25-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`

    const completeRegistrationData = {
      ...registrationData,
      registrationId,
    }

    // Send confirmation email to attendee
    const emailResult = await sendRegistrationConfirmation(completeRegistrationData)

    // Send notification to admin
    const adminResult = await sendAdminNotification(completeRegistrationData)

    if (!emailResult.success) {
      console.error("Failed to send confirmation email:", emailResult.error)
      // Don't fail the registration if email fails, but log it
    }

    if (!adminResult.success) {
      console.error("Failed to send admin notification:", adminResult.error)
    }

    // Here you would typically save to database
    // For now, we'll just return success

    return NextResponse.json({
      success: true,
      registrationId,
      emailSent: emailResult.success,
      message: "Registration completed successfully",
    })
  } catch (error) {
    console.error("Registration API error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Registration failed",
      },
      { status: 500 },
    )
  }
}
