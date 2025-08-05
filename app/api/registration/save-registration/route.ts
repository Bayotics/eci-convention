"use server"

import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import Registration from "@/models/registration"
import { sendRegistrationConfirmation } from "@/lib/email"

// Verify reCAPTCHA token
async function verifyRecaptcha(token: string): Promise<boolean> {
  try {
    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
    })

    const data = await response.json()
    return data.success
  } catch (error) {
    console.error("reCAPTCHA verification error:", error)
    return false
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { recaptchaToken, ...registrationData } = body

    // Verify reCAPTCHA token
    if (!recaptchaToken) {
      return NextResponse.json({ success: false, error: "reCAPTCHA verification is required" }, { status: 400 })
    }

    const isRecaptchaValid = await verifyRecaptcha(recaptchaToken)
    if (!isRecaptchaValid) {
      return NextResponse.json(
        { success: false, error: "reCAPTCHA verification failed. Please try again." },
        { status: 400 },
      )
    }

    await connectDB()

    // Check if user already registered
    const existingRegistration = await Registration.findOne({ email: registrationData.email })

    if (existingRegistration) {
      // Special case: Allow upgrade from economic-session-only to paid registration
      if (
        existingRegistration.registrationType === "economic-session-only" &&
        registrationData.membershipStatus === "non-member" &&
        registrationData.registrationType === "full-convention"
      ) {
        console.log("Deleting existing economic session registration for upgrade:", registrationData.email)
        await Registration.deleteOne({ email: registrationData.email })
      } else {
        return NextResponse.json(
          { success: false, error: "You have already registered for this event" },
          { status: 400 },
        )
      }
    }

    // Generate unique registration ID
    const registrationId = `ECI25-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    // Create new registration
    const registration = new Registration({
      ...registrationData,
      registrationId,
      registrationDate: new Date(),
    })

    await registration.save()

    // Send confirmation email
    try {
      await sendRegistrationConfirmation({
        ...registrationData,
        registrationId,
        attendanceDays: registrationData.attendanceDays || [],
        registrationType: registrationData.registrationType || "full-convention",
      })
    } catch (emailError) {
      console.error("Failed to send confirmation email:", emailError)
      // Don't fail the registration if email fails
    }

    const successMessage =
      existingRegistration?.registrationType === "economic-session-only"
        ? "Successfully upgraded from economic session to full convention registration!"
        : "Registration completed successfully!"

    return NextResponse.json({
      success: true,
      message: successMessage,
      registrationId,
    })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ success: false, error: "Registration failed. Please try again." }, { status: 500 })
  }
}
