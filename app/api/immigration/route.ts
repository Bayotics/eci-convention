import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import ImmigrationService from "@/models/immigrationService"
import { sendImmigrationConfirmation } from "@/lib/email"

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    const body = await request.json()
    const {
      name,
      email,
      phone,
      residentialCountry, // fixed typo
      residentialState,
      citizenshipCountry,
      service,
    } = body

    // Basic validation
    if (
      !name ||
      !email ||
      !phone ||
      !residentialCountry ||
      !residentialState ||
      !citizenshipCountry ||
      !service
    ) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      )
    }
    await ImmigrationService.create({
      name,
      email,
      phone,
      residentialCountry,
      residentialState,
      citizenshipCountry,
      service,
      createdAt: new Date(),
    })

    // Send confirmation email with all data
    const immigrationData = {
      name,
      email,
      phone,
      residentialCountry,
      residentialState,
      citizenshipCountry,
      service,
    }
    try {
      await sendImmigrationConfirmation(immigrationData)
    } catch (mailError) {
      console.error("Failed to send confirmation email:", mailError)
      // Still return success if email fails
    }

    return NextResponse.json(
      { success: true, message: "Request submitted and confirmation email sent." },
      { status: 200 }
    )
  } catch (error) {
    console.error("Immigration POST error:", error)
    return NextResponse.json(
      { error: "Failed to submit request." },
      { status: 500 }
    )
  }
}