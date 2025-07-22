import mongoose from "mongoose"
import { Schema } from "mongoose"

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  membershipId: {
    type: String,
    unique: true,
    sparse: true,
  },
  chapterName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    default: "",
  },
  dateOfBirth: {
    type: Date,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other", "Prefer not to say"],
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
  },
  membershipStatus: {
    type: String,
    enum: ["active", "inactive", "suspended"],
    default: "active",
  },
  membershipType: {
    type: String,
    enum: ["regular", "student", "senior", "honorary"],
    default: "regular",
  },
  joinDate: {
    type: Date,
    default: Date.now,
  },
  lastPaymentDate: {
    type: Date,
  },
  emergencyContact: {
    name: String,
    relationship: String,
    phoneNumber: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

// Pre-save middleware to update the updatedAt field
UserSchema.pre("save", function (next) {
  this.updatedAt = new Date()
  next()
})

export default mongoose.models.User || mongoose.model("User", UserSchema)
