import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import Registration from "@/models/registration"
import { sendRegistrationConfirmation, sendAdminNotification } from "@/lib/email"

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const registrationData = await request.json()

    // Generate unique registration ID
    const registrationId = `ECI25-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`

    // Check if user already registered
    const existingRegistration = await Registration.findOne({
      email: registrationData.email.toLowerCase(),
      registrationStatus: { $in: ["confirmed", "pending"] },
    })

    if (existingRegistration) {
      // Special case: If existing registration is "economic-session-only" and new registration is paid guest
      if (
        existingRegistration.registrationType === "economic-session-only" &&
        registrationData.membershipStatus === "non-member" &&
        registrationData.registrationType === "full-convention"
      ) {
        // Delete the existing free economic session registration
        await Registration.findByIdAndDelete(existingRegistration._id)
        console.log(`Deleted existing economic-session registration for ${registrationData.email}`)
      } else {
        // For all other cases, prevent duplicate registration
        return NextResponse.json({ error: "You have already registered for this event" }, { status: 400 })
      }
    }

    // Create new registration (either first time or upgrading from economic-session)
    const registration = new Registration({
      ...registrationData,
      email: registrationData.email.toLowerCase(),
      registrationId,
      registrationStatus: "confirmed",
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    await registration.save()

    // Send confirmation emails
    const emailData = {
      firstName: registrationData.firstName,
      lastName: registrationData.lastName,
      email: registrationData.email,
      chapterName: registrationData.chapterName,
      registrationCategory: registrationData.registrationCategory,
      attendanceDays: registrationData.attendanceDays,
      ticketPrice: 0, // Will be fetched from payment if needed
      paymentId: registrationData.paymentId || "",
      registrationId,
    }

    const emailResult = await sendRegistrationConfirmation(emailData)
    const adminResult = await sendAdminNotification(emailData)

    return NextResponse.json({
      success: true,
      registrationId,
      emailSent: emailResult.success,
      message:
        existingRegistration?.registrationType === "economic-session-only"
          ? "Registration upgraded successfully from economic session to full convention"
          : "Registration completed successfully",
    })
  } catch (error) {
    console.error("Save registration error:", error)
    return NextResponse.json({ error: "Failed to save registration" }, { status: 500 })
  }
}
