import { type NextRequest, NextResponse } from "next/server"

const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET
const PAYPAL_BASE_URL =
  process.env.NODE_ENV === "production" ? "https://api-m.paypal.com" : "https://api-m.sandbox.paypal.com"

async function getPayPalAccessToken() {
  const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString("base64")

  const response = await fetch(`${PAYPAL_BASE_URL}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${auth}`,
    },
    body: "grant_type=client_credentials",
  })

  const data = await response.json()
  return data.access_token
}

export async function POST(request: NextRequest) {
  try {
    const { orderID } = await request.json()

    if (!orderID) {
      return NextResponse.json({ error: "Order ID is required" }, { status: 400 })
    }

    const accessToken = await getPayPalAccessToken()

    const response = await fetch(`${PAYPAL_BASE_URL}/v2/checkout/orders/${orderID}/capture`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })

    const captureData = await response.json()

    if (response.ok) {
      return NextResponse.json({
        success: true,
        data: captureData,
      })
    } else {
      return NextResponse.json(
        {
          success: false,
          error: captureData.message || "Payment capture failed",
        },
        { status: 400 },
      )
    }
  } catch (error) {
    console.error("PayPal capture error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error during payment capture",
      },
      { status: 500 },
    )
  }
}
