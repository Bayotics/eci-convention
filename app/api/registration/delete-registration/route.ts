import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import Registration from "@/models/registration"
import { sendCancelConfirmation } from "@/lib/email" // adjust path if needed

export async function DELETE(request: NextRequest) {
  try {
    await connectDB()

    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    // Find the registration first (to get user details for the email)
    const registration = await Registration.findOne({
      email: email.toLowerCase(),
      registrationStatus: { $in: ["confirmed", "pending"] },
    })

    if (!registration) {
      return NextResponse.json({ error: "Registration not found" }, { status: 404 })
    }

    // Delete the registration
    await Registration.deleteOne({ _id: registration._id })
    
    // Send cancellation confirmation email
    try {
      console.log("Registration cancelled successfully, now calling the sendCancelConfirmation function")
      console.log(registration.email)
      await sendCancelConfirmation({
        firstName: registration.firstName,
        lastName: registration.lastName,
        email: registration.email,
        registrationId: registration.registrationId,
        })
    } catch (mailError) {
      console.error("Failed to send cancellation email:", mailError)
      // You may choose to still return success, or return an error if email is critical
    }

    return NextResponse.json({
      success: true,
      message: "Registration deleted and confirmation email sent",
    })
  } catch (error) {
    console.error("Delete registration error:", error)
    return NextResponse.json({ error: "Failed to delete registration" }, { status: 500 })
  }
}