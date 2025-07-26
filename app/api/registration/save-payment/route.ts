import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import Payment from "@/models/payment"

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const { email, membershipStatus, ticketType, amount, paymentId, attendanceDays, paymentDetails } =
      await request.json()

    // Check if payment already exists
    const existingPayment = await Payment.findOne({ paymentId })
    if (existingPayment) {
      return NextResponse.json({ error: "Payment already processed" }, { status: 400 })
    }
      function generatePaymentId(length = 19) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }
    // Create new payment record
    const payment = new Payment({
      email: email.toLowerCase(),
      membershipStatus,
      ticketType,
      amount,
      paymentId,
      attendanceDays,
      paymentStatus: "completed",
      paymentMethod: "paypal",
      createdAt: new Date(),
      updatedAt: new Date(),
      transactionReference: generatePaymentId()
    })

    await payment.save()

    return NextResponse.json({
      success: true,
      paymentId: payment._id,
      message: "Payment saved successfully",
    })
  } catch (error) {
    console.error("Save payment error:", error)
    return NextResponse.json({ error: "Failed to save payment" }, { status: 500 })
  }
}
