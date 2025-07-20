import { type NextRequest, NextResponse } from "next/server"
import { getRegistrations } from "@/lib/registration"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "20")

    const result = await getRegistrations(page, limit)

    return NextResponse.json({
      success: true,
      data: result,
    })
  } catch (error) {
    console.error("Registrations API error:", error)
    return NextResponse.json({ error: "Failed to fetch registrations" }, { status: 500 })
  }
}
