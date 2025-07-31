import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import User from "@/models/user"

export async function POST(request: NextRequest) {
  try {
    console.log("📱 Starting phone number check process...")

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
    const { phoneNumber } = body

    console.log("📱 Checking phone number:", phoneNumber)

    if (!phoneNumber) {
      console.log("❌ No phone number provided")
      return NextResponse.json({ error: "Phone number is required" }, { status: 400 })
    }

    // Normalize phone number (remove spaces, dashes, etc.)
    const normalizedPhone = phoneNumber.replace(/[\s\-$$$$]/g, "").trim()
    console.log("🔄 Normalized phone number:", normalizedPhone)

    // Check if phone number exists in User database
    console.log("🔍 Searching for user by phone number...")
    const user = await User.findOne({
      $or: [
        { phoneNumber: normalizedPhone },
        { phoneNumber: phoneNumber },
        { phone: normalizedPhone },
        { phone: phoneNumber },
      ],
    })

    if (user) {
      console.log("✅ User found with phone number:", { id: user._id, email: user.email })
      return NextResponse.json({
        email: user.email,
        message: "Phone number found in our records",
      })
    } else {
      console.log("❌ Phone number not found in database")

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

      return NextResponse.json(
        {
          error: "Phone number not found in our records. Please check your phone number or register as a guest.",
          debug:
            process.env.NODE_ENV === "development"
              ? {
                  searchedPhone: normalizedPhone,
                  userModelName: User.modelName,
                  collectionName: User.collection?.name,
                }
              : undefined,
        },
        { status: 404 },
      )
    }
  } catch (error) {
    console.error("💥 Phone number check error:", error)
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
