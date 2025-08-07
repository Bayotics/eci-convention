import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import Sponsor from "@/models/sponsor"

export async function GET() {
  try {
    await connectDB()

    const sponsors = await Sponsor.find({}).sort({ createdAt: 1 }).lean()

    // Transform the data for frontend consumption
    const transformedSponsors = sponsors.map((sponsor) => ({
      _id: (sponsor._id as any).toString(),
      name: sponsor.name,
      description: sponsor.description || "",
      pic: sponsor.pic || "",
      sponsorshipType: sponsor.sponsorshipType,
      contribution: sponsor.contribution || {
        type: "in-kind",
        inKindDescription: "Support provided",
      },
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

    // Validate required fields
    if (!body.name || !body.sponsorshipType) {
      return NextResponse.json(
        {
          success: false,
          error: "Name and sponsorship type are required",
        },
        { status: 400 },
      )
    }

    // Validate sponsorship type
    if (!["regular", "corporate"].includes(body.sponsorshipType)) {
      return NextResponse.json(
        {
          success: false,
          error: "Sponsorship type must be either 'regular' or 'corporate'",
        },
        { status: 400 },
      )
    }

    // Validate contribution if provided
    if (body.contribution) {
      if (!["monetary", "in-kind", "both"].includes(body.contribution.type)) {
        return NextResponse.json(
          {
            success: false,
            error: "Contribution type must be 'monetary', 'in-kind', or 'both'",
          },
          { status: 400 },
        )
      }

      // Validate monetary contribution
      if (
        (body.contribution.type === "monetary" || body.contribution.type === "both") &&
        (!body.contribution.monetaryAmount || body.contribution.monetaryAmount <= 0)
      ) {
        return NextResponse.json(
          {
            success: false,
            error: "Monetary amount is required and must be greater than 0 for monetary contributions",
          },
          { status: 400 },
        )
      }

      // Validate in-kind contribution
      if (
        (body.contribution.type === "in-kind" || body.contribution.type === "both") &&
        (!body.contribution.inKindDescription || body.contribution.inKindDescription.trim().length === 0)
      ) {
        return NextResponse.json(
          {
            success: false,
            error: "In-kind description is required for in-kind contributions",
          },
          { status: 400 },
        )
      }
    }

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

export async function PUT(request: Request) {
  try {
    await connectDB()

    const body = await request.json()
    const { _id, ...updateData } = body

    if (!_id) {
      return NextResponse.json(
        {
          success: false,
          error: "Sponsor ID is required",
        },
        { status: 400 },
      )
    }

    // Validate sponsorship type if provided
    if (updateData.sponsorshipType && !["regular", "corporate"].includes(updateData.sponsorshipType)) {
      return NextResponse.json(
        {
          success: false,
          error: "Sponsorship type must be either 'regular' or 'corporate'",
        },
        { status: 400 },
      )
    }

    // Validate contribution if provided
    if (updateData.contribution) {
      if (!["monetary", "in-kind", "both"].includes(updateData.contribution.type)) {
        return NextResponse.json(
          {
            success: false,
            error: "Contribution type must be 'monetary', 'in-kind', or 'both'",
          },
          { status: 400 },
        )
      }
    }

    const sponsor = await Sponsor.findByIdAndUpdate(_id, updateData, {
      new: true,
      runValidators: true,
    })

    if (!sponsor) {
      return NextResponse.json(
        {
          success: false,
          error: "Sponsor not found",
        },
        { status: 404 },
      )
    }

    return NextResponse.json({
      success: true,
      data: sponsor,
      message: "Sponsor updated successfully",
    })
  } catch (error: any) {
    console.error("Error updating sponsor:", error)
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to update sponsor",
      },
      { status: 400 },
    )
  }
}

export async function DELETE(request: Request) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: "Sponsor ID is required",
        },
        { status: 400 },
      )
    }

    const sponsor = await Sponsor.findByIdAndDelete(id)

    if (!sponsor) {
      return NextResponse.json(
        {
          success: false,
          error: "Sponsor not found",
        },
        { status: 404 },
      )
    }

    return NextResponse.json({
      success: true,
      message: "Sponsor deleted successfully",
    })
  } catch (error: any) {
    console.error("Error deleting sponsor:", error)
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to delete sponsor",
      },
      { status: 400 },
    )
  }
}
