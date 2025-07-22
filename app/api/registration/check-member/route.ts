import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import User from "@/models/user"
import Payment from "@/models/payment"
import Registration from "@/models/registration"

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const { email, membershipId } = await request.json()

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    // Check if email exists in User database
    const user = await User.findOne({ email: email.toLowerCase() })

    if (!user) {
      return NextResponse.json(
        {
          error:
            "You are not a registered member. Please go to the membership page to register or register for the event as a guest.",
        },
        { status: 404 },
      )
    }

    // Check payment status
    const payment = await Payment.findOne({
      email: email.toLowerCase(),
      paymentStatus: "completed",
    })

    // Check registration status
    const registration = await Registration.findOne({
      email: email.toLowerCase(),
      registrationStatus: { $in: ["confirmed", "pending"] },
    })

    // Determine redirect path based on status
    if (payment && registration) {
      // Paid and registered - go to preview page
      return NextResponse.json({
        redirect: `/register/preview?email=${encodeURIComponent(email)}`,
        status: "paid_and_registered",
      })
    } else if (payment && !registration) {
      // Paid but not registered - go to member registration form
      return NextResponse.json({
        redirect: `/register/member/form?email=${encodeURIComponent(email)}`,
        status: "paid_not_registered",
      })
    } else {
      // Not paid - go to payment page
      return NextResponse.json({
        redirect: `/register/payment?type=member&email=${encodeURIComponent(email)}`,
        status: "not_paid",
      })
    }
  } catch (error) {
    console.error("Member check error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
