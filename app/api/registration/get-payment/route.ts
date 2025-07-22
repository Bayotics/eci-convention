import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import Payment from "@/models/payment"

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const email = searchParams.get("email")

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    const payment = await Payment.findOne({
      email: email.toLowerCase(),
      paymentStatus: "completed",
    }).sort({ createdAt: -1 })

    if (!payment) {
      return NextResponse.json({ error: "Payment not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      payment: {
        paymentId: payment.paymentId,
        amount: payment.amount,
        ticketType: payment.ticketType,
        attendanceDays: payment.attendanceDays,
        membershipStatus: payment.membershipStatus,
      },
    })
  } catch (error) {
    console.error("Get payment error:", error)
    return NextResponse.json({ error: "Failed to get payment" }, { status: 500 })
  }
}
