import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import User from "@/models/user"
import Payment from "@/models/payment"
import Registration from "@/models/registration"

export async function POST(request: NextRequest) {
  try {
    console.log("🔍 Starting member check process...")

    // Connect to database with error handling
    try {
      await connectDB()
      console.log("✅ Database connected successfully")
    } catch (dbError) {
      console.error("❌ Database connection failed:", dbError)
      return NextResponse.json(
        {
          error: "Database connection failed. Please try again later.",
          details: process.env.NODE_ENV === "development" ? dbError.message : undefined,
        },
        { status: 500 },
      )
    }

    const body = await request.json()
    const { email, membershipId } = body

    console.log("📧 Checking email:", email)
    console.log("🆔 Membership ID:", membershipId)

    if (!email) {
      console.log("❌ No email provided")
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    // Normalize email
    const normalizedEmail = email.toLowerCase().trim()
    console.log("🔄 Normalized email:", normalizedEmail)

    // Check if email exists in User database with detailed logging
    console.log("🔍 Searching for user in database...")
    const user = await User.findOne({ email: normalizedEmail })

    if (user) {
      console.log("✅ User found:", { id: user._id, email: user.email })
    } else {
      console.log("❌ User not found in database")

      // Additional debugging: Check if User model is properly loaded
      console.log("🔍 User model info:", {
        modelName: User.modelName,
        collection: User.collection?.name,
        db: User.db?.name,
      })

      // Try to count total users for debugging
      try {
        const userCount = await User.countDocuments()
        console.log("📊 Total users in collection:", userCount)
      } catch (countError) {
        console.error("❌ Error counting users:", countError)
      }
    }

    if (!user) {
      return NextResponse.json(
        {
          error:
            "You are not a registered member. Please go to the membership page to register or register for the event as a guest.",
          debug:
            process.env.NODE_ENV === "development"
              ? {
                  searchedEmail: normalizedEmail,
                  userModelName: User.modelName,
                  collectionName: User.collection?.name,
                }
              : undefined,
        },
        { status: 404 },
      )
    }

    // Check payment status
    console.log("💳 Checking payment status...")
    const payment = await Payment.findOne({
      email: normalizedEmail,
      paymentStatus: "completed",
    })

    if (payment) {
      console.log("✅ Payment found:", { id: payment._id, status: payment.paymentStatus })
    } else {
      console.log("❌ No completed payment found")
    }

    // Check registration status
    console.log("📝 Checking registration status...")
    const registration = await Registration.findOne({
      email: normalizedEmail,
      registrationStatus: { $in: ["confirmed", "pending"] },
    })

    if (registration) {
      console.log("✅ Registration found:", { id: registration._id, status: registration.registrationStatus })
    } else {
      console.log("❌ No active registration found")
    }

    // Determine redirect path based on status
    let redirectInfo
    if (payment && registration) {
      // Paid and registered - go to preview page
      redirectInfo = {
        redirect: `/register/preview?email=${encodeURIComponent(email)}`,
        status: "paid_and_registered",
      }
      console.log("🎯 Redirecting to preview page")
    } else if (payment && !registration) {
      // Paid but not registered - go to member registration form
      redirectInfo = {
        redirect: `/register/member/form?email=${encodeURIComponent(email)}`,
        status: "paid_not_registered",
      }
      console.log("🎯 Redirecting to member registration form")
    } else {
      // Not paid - go to payment page
      redirectInfo = {
        redirect: `/register/payment?type=member&email=${encodeURIComponent(email)}`,
        status: "not_paid",
      }
      console.log("🎯 Redirecting to payment page")
    }

    console.log("✅ Member check completed successfully")
    return NextResponse.json(redirectInfo)
  } catch (error) {
    console.error("💥 Member check error:", error)
    console.error("Error stack:", error.stack)

    return NextResponse.json(
      {
        error: "Internal server error",
        details:
          process.env.NODE_ENV === "development"
            ? {
                message: error.message,
                stack: error.stack,
              }
            : undefined,
      },
      { status: 500 },
    )
  }
}
