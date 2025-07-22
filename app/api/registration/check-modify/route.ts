import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import User from "@/models/user"
import Payment from "@/models/payment"
import Registration from "@/models/registration"

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    // Check if email exists in payments or registrations
    const payment = await Payment.findOne({
      email: email.toLowerCase(),
      paymentStatus: "completed",
    })

    const registration = await Registration.findOne({
      email: email.toLowerCase(),
      registrationStatus: { $in: ["confirmed", "pending"] },
    })

    if (!payment && !registration) {
      return NextResponse.json(
        {
          error: "You are yet to register for an event. No registration or payment found for this email address.",
        },
        { status: 404 },
      )
    }

    // Determine redirect path based on status
    if (payment && registration) {
      // Both paid and registered - go to preview page
      return NextResponse.json({
        redirect: `/register/preview?email=${encodeURIComponent(email)}`,
        status: "paid_and_registered",
      })
    } else if (registration && !payment) {
      // Registered but not paid (free session) - go to preview
      return NextResponse.json({
        redirect: `/register/preview?email=${encodeURIComponent(email)}`,
        status: "registered_not_paid",
      })
    } else if (payment && !registration) {
      // Paid but not registered - check if they're a member
      const user = await User.findOne({ email: email.toLowerCase() })

      if (user) {
        // Member - go to member registration form
        return NextResponse.json({
          redirect: `/register/member/form?email=${encodeURIComponent(email)}`,
          status: "paid_member_not_registered",
        })
      } else {
        // Non-member - go to guest registration form
        return NextResponse.json({
          redirect: `/register/guest/form?email=${encodeURIComponent(email)}`,
          status: "paid_guest_not_registered",
        })
      }
    }

    return NextResponse.json({ error: "Unexpected state" }, { status: 500 })
  } catch (error) {
    console.error("Check modify error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
