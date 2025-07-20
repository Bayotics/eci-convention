import { getDatabase } from "./mongodb"

export interface Registration {
  _id?: string
  registrationId: string
  firstName: string
  lastName: string
  email: string
  chapterName: string
  gender: string
  shirtSize: string
  attendanceDays: string[]
  registrationCategory: string
  dietaryRestrictions?: string
  ticketPrice: number
  paymentId: string
  paymentStatus: "completed" | "pending" | "failed"
  registrationDate: Date
  emailSent: boolean
  adminNotified: boolean
}

export async function saveRegistration(registrationData: Omit<Registration, "_id">): Promise<Registration> {
  const db = await getDatabase()
  const registrations = db.collection<Registration>("registrations")

  const result = await registrations.insertOne(registrationData)
  return { ...registrationData, _id: result.insertedId.toString() }
}

export async function getRegistrations(page = 1, limit = 20) {
  const db = await getDatabase()
  const registrations = db.collection<Registration>("registrations")

  const skip = (page - 1) * limit

  const [data, total] = await Promise.all([
    registrations.find({}).sort({ registrationDate: -1 }).skip(skip).limit(limit).toArray(),
    registrations.countDocuments({}),
  ])

  return {
    registrations: data,
    total,
    page,
    totalPages: Math.ceil(total / limit),
    hasNext: page * limit < total,
    hasPrev: page > 1,
  }
}

export async function getRegistrationStats() {
  const db = await getDatabase()
  const registrations = db.collection<Registration>("registrations")

  const [totalRegistrations, youthRegistrations, adultRegistrations, seniorRegistrations, totalRevenue] =
    await Promise.all([
      registrations.countDocuments({}),
      registrations.countDocuments({ registrationCategory: "youth" }),
      registrations.countDocuments({ registrationCategory: "adult" }),
      registrations.countDocuments({ registrationCategory: "senior" }),
      registrations.aggregate([{ $group: { _id: null, total: { $sum: "$ticketPrice" } } }]).toArray(),
    ])

  return {
    totalRegistrations,
    youthRegistrations,
    adultRegistrations,
    seniorRegistrations,
    totalRevenue: totalRevenue[0]?.total || 0,
  }
}
