import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import Sponsor from "@/models/sponsor"

export async function GET() {
  try {
    await connectDB()

    const sponsors = await Sponsor.find({}).sort({ createdAt: -1 }).lean()

    // Transform the data for frontend consumption
    const transformedSponsors = sponsors.map((sponsor) => ({
      _id: (sponsor._id as any).toString(),
      name: sponsor.name,
      description: sponsor.description || "",
      pic: sponsor.pic || "",
      sponsorshipType: sponsor.sponsorshipType,
      contribution: sponsor.contribution,
      websiteLink: sponsor.websiteLink || "",
      createdAt: sponsor.createdAt,
      updatedAt: sponsor.updatedAt,
    }))

    return NextResponse.json({
      success: true,
      data: transformedSponsors,
      count: transformedSponsors.length,
    })
  } catch (error) {
    console.error("Error fetching sponsors:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch sponsors",
      },
      { status: 500 },
    )
  }
}

export async function POST(request: Request) {
  try {
    await connectDB()

    const body = await request.json()
    const sponsor = new Sponsor(body)
    await sponsor.save()

    return NextResponse.json(
      {
        success: true,
        data: sponsor,
        message: "Sponsor created successfully",
      },
      { status: 201 },
    )
  } catch (error: any) {
    console.error("Error creating sponsor:", error)
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to create sponsor",
      },
      { status: 400 },
    )
  }
}
