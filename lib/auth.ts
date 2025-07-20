import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { getDatabase } from "./mongodb"

const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-jwt-key-change-this-in-production"

export interface User {
  _id?: string
  email: string
  password: string
  firstName: string
  lastName: string
  role: "admin" | "super_admin"
  createdAt: Date
  lastLogin?: Date
  isActive: boolean
}

export interface AuthUser {
  id: string
  email: string
  firstName: string
  lastName: string
  role: "admin" | "super_admin"
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

export function generateToken(user: AuthUser): string {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: "7d" },
  )
}

export function verifyToken(token: string): AuthUser | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AuthUser
    return decoded
  } catch (error) {
    return null
  }
}

export async function createUser(userData: Omit<User, "_id" | "createdAt">): Promise<User> {
  const db = await getDatabase()
  const users = db.collection<User>("users")

  // Check if user already exists
  const existingUser = await users.findOne({ email: userData.email })
  if (existingUser) {
    throw new Error("User already exists")
  }

  // Hash password
  const hashedPassword = await hashPassword(userData.password)

  const newUser: Omit<User, "_id"> = {
    ...userData,
    password: hashedPassword,
    createdAt: new Date(),
    isActive: true,
  }

  const result = await users.insertOne(newUser)
  return { ...newUser, _id: result.insertedId.toString() }
}

export async function authenticateUser(email: string, password: string): Promise<AuthUser | null> {
  const db = await getDatabase()
  const users = db.collection<User>("users")

  const user = await users.findOne({ email, isActive: true })
  if (!user) {
    return null
  }

  const isValidPassword = await verifyPassword(password, user.password)
  if (!isValidPassword) {
    return null
  }

  // Update last login
  await users.updateOne({ _id: user._id }, { $set: { lastLogin: new Date() } })

  return {
    id: user._id!.toString(),
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
  }
}

export async function getUserById(id: string): Promise<AuthUser | null> {
  const db = await getDatabase()
  const users = db.collection<User>("users")

  const user = await users.findOne({ _id: id as any, isActive: true })
  if (!user) {
    return null
  }

  return {
    id: user._id!.toString(),
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
  }
}
