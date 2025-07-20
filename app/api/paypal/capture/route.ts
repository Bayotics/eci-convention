import { type NextRequest, NextResponse } from "next/server"
import { sendRegistrationConfirmation, sendAdminNotification } from "@/lib/email"
import { saveRegistration } from "@/lib/registration"

const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET
const PAYPAL_BASE_URL =
  process.env.NODE_ENV === "production" ? "https://api-m.paypal.com" : "https://api-m.sandbox.paypal.com"

async function getPayPalAccessToken() {
  try {
    const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString("base64")

    const response = await fetch(`${PAYPAL_BASE_URL}/v1/oauth2/token`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
    })

    if (!response.ok) {
      throw new Error(`PayPal auth failed: ${response.status}`)
    }

    const data = await response.json()
    return data.access_token
  } catch (error) {
    console.error("PayPal authentication error:", error)
    throw error
  }
}

export async function POST(request: NextRequest) {
  try {
    const { orderID, captureDetails, registrationData } = await request.json()

    console.log("Processing PayPal capture for order:", orderID)
    console.log("Registration data received:", registrationData)

    // Verify that we have the capture details from the frontend
    if (captureDetails && captureDetails.status === "COMPLETED") {
      console.log("Payment already captured on frontend:", captureDetails)

      // Extract payment information from the already captured payment
      const paymentId = captureDetails.id
      const payer = captureDetails.payer

      // Generate a unique registration ID
      const registrationId = `ECI25-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`

      // Prepare complete registration data for email
      const completeRegistrationData = {
        firstName: registrationData.firstName,
        lastName: registrationData.lastName,
        email: registrationData.email,
        chapterName: registrationData.chapterName,
        registrationCategory: registrationData.registrationCategory,
        attendanceDays: registrationData.attendanceDays,
        ticketPrice: registrationData.ticketPrice,
        paymentId,
        registrationId,
        gender: registrationData.gender,
        shirtSize: registrationData.shirtSize,
        dietaryRestrictions: registrationData.dietaryRestrictions,
        payerInfo: payer,
        captureData: captureDetails,
        registrationDate: new Date().toISOString(),
      }

      console.log("Sending confirmation emails...")

      // Send confirmation email to attendee
      const emailResult = await sendRegistrationConfirmation(completeRegistrationData)
      console.log("Email result:", emailResult)

      // Send notification to admin
      const adminResult = await sendAdminNotification(completeRegistrationData)
      console.log("Admin notification result:", adminResult)

      // Log registration for debugging (in production, save to database)
      console.log("Registration completed:", {
        registrationId,
        email: registrationData.email,
        name: `${registrationData.firstName} ${registrationData.lastName}`,
        chapter: registrationData.chapterName,
        amount: registrationData.ticketPrice,
        paymentId,
        timestamp: new Date().toISOString(),
      })

      // Save registration to database
      const registrationDataToSave = {
        registrationId,
        firstName: registrationData.firstName,
        lastName: registrationData.lastName,
        email: registrationData.email,
        chapterName: registrationData.chapterName,
        gender: registrationData.gender,
        shirtSize: registrationData.shirtSize,
        attendanceDays: registrationData.attendanceDays,
        registrationCategory: registrationData.registrationCategory,
        dietaryRestrictions: registrationData.dietaryRestrictions,
        ticketPrice: registrationData.ticketPrice,
        paymentId,
        paymentStatus: "completed" as const,
        registrationDate: new Date(),
        emailSent: emailResult.success,
        adminNotified: adminResult.success,
      }

      // Save to database
      try {
        await saveRegistration(registrationDataToSave)
        console.log("Registration saved to database:", registrationId)
      } catch (dbError) {
        console.error("Database save error:", dbError)
        // Don't fail the registration if database save fails
      }

      return NextResponse.json({
        success: true,
        captureData: captureDetails,
        registrationId,
        emailSent: emailResult.success,
        adminNotified: adminResult.success,
        message: "Registration completed successfully",
      })
    } else {
      // If capture details not provided, try to capture the order ourselves
      console.log("Attempting to capture order via API...")

      const accessToken = await getPayPalAccessToken()

      const response = await fetch(`${PAYPAL_BASE_URL}/v2/checkout/orders/${orderID}/capture`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error("PayPal capture API error:", response.status, errorText)
        throw new Error(`PayPal capture failed: ${response.status}`)
      }

      const captureData = await response.json()
      console.log("PayPal capture response:", captureData)

      if (captureData.status === "COMPLETED") {
        // Process the same way as above
        const paymentId = captureData.id
        const payer = captureData.payer
        const registrationId = `ECI25-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`

        const completeRegistrationData = {
          firstName: registrationData.firstName,
          lastName: registrationData.lastName,
          email: registrationData.email,
          chapterName: registrationData.chapterName,
          registrationCategory: registrationData.registrationCategory,
          attendanceDays: registrationData.attendanceDays,
          ticketPrice: registrationData.ticketPrice,
          paymentId,
          registrationId,
          gender: registrationData.gender,
          shirtSize: registrationData.shirtSize,
          dietaryRestrictions: registrationData.dietaryRestrictions,
          payerInfo: payer,
          captureData,
          registrationDate: new Date().toISOString(),
        }

        const emailResult = await sendRegistrationConfirmation(completeRegistrationData)
        const adminResult = await sendAdminNotification(completeRegistrationData)

        // Save registration to database
        const registrationDataToSave = {
          registrationId,
          firstName: registrationData.firstName,
          lastName: registrationData.lastName,
          email: registrationData.email,
          chapterName: registrationData.chapterName,
          gender: registrationData.gender,
          shirtSize: registrationData.shirtSize,
          attendanceDays: registrationData.attendanceDays,
          registrationCategory: registrationData.registrationCategory,
          dietaryRestrictions: registrationData.dietaryRestrictions,
          ticketPrice: registrationData.ticketPrice,
          paymentId,
          paymentStatus: "completed" as const,
          registrationDate: new Date(),
          emailSent: emailResult.success,
          adminNotified: adminResult.success,
        }

        // Save to database
        try {
          await saveRegistration(registrationDataToSave)
          console.log("Registration saved to database:", registrationId)
        } catch (dbError) {
          console.error("Database save error:", dbError)
          // Don't fail the registration if database save fails
        }

        return NextResponse.json({
          success: true,
          captureData,
          registrationId,
          emailSent: emailResult.success,
          adminNotified: adminResult.success,
          message: "Registration completed successfully",
        })
      } else {
        console.error("PayPal capture failed:", captureData)
        return NextResponse.json(
          {
            success: false,
            error: "Payment capture failed",
            details: captureData,
          },
          { status: 400 },
        )
      }
    }
  } catch (error) {
    console.error("PayPal capture error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
