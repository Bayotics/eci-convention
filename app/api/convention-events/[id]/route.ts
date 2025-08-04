import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import ConventionEvent from "@/models/conventionEvent"

interface RouteParams {
  params: {
    id: string
  }
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    await connectDB()

    const event = await ConventionEvent.findById(params.id).lean()

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 })
    }

    return NextResponse.json(event)
  } catch (error) {
    console.error("Error fetching convention event:", error)
    return NextResponse.json({ error: "Failed to fetch convention event" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: RouteParams) {
  try {
    await connectDB()

    const body = await request.json()
    const event = await ConventionEvent.findByIdAndUpdate(params.id, body, { new: true }).lean()

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 })
    }

    return NextResponse.json(event)
  } catch (error) {
    console.error("Error updating convention event:", error)
    return NextResponse.json({ error: "Failed to update convention event" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    await connectDB()

    const event = await ConventionEvent.findByIdAndDelete(params.id).lean()

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Event deleted successfully" })
  } catch (error) {
    console.error("Error deleting convention event:", error)
    return NextResponse.json({ error: "Failed to delete convention event" }, { status: 500 })
  }
}
