import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import ConventionEvent from "@/models/conventionEvent"

export async function GET() {
  try {
    await connectDB()

    // Fetch all convention events, sorted by year (newest first)
    const events = await ConventionEvent.find({}).sort({ year: -1, dateFrom: -1 }).lean()

    return NextResponse.json(events)
  } catch (error) {
    console.error("Error fetching convention events:", error)
    return NextResponse.json({ error: "Failed to fetch convention events" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    await connectDB()

    const body = await request.json()
    const event = new ConventionEvent(body)
    await event.save()

    return NextResponse.json(event, { status: 201 })
  } catch (error) {
    console.error("Error creating convention event:", error)
    return NextResponse.json({ error: "Failed to create convention event" }, { status: 500 })
  }
}
