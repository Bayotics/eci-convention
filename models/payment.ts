import mongoose from "mongoose"
import { Schema } from "mongoose"

const PaymentSchema = new Schema({
  email: {
    type: String,
    required: true,
    index: true,
  },
  membershipStatus: {
    type: String,
    enum: ["member", "non-member"],
    required: true,
  },
  ticketType: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  paymentId: {
    type: String,
    required: true,
    unique: true,
  },
  attendanceDays: [
    {
      type: String,
      enum: ["thursday", "friday", "saturday", "sunday", "economic-session"],
    },
  ],
  paymentStatus: {
    type: String,
    enum: ["pending", "completed", "failed", "refunded"],
    default: "pending",
  },
  paymentMethod: {
    type: String,
    enum: ["paypal", "stripe", "bank_transfer"],
    default: "paypal",
  },
  paymentDetails: {
    type: Schema.Types.Mixed,
    default: {},
  },
  refundId: {
    type: String,
    default: "",
  },
  refundAmount: {
    type: Number,
    default: 0,
  },
  refundReason: {
    type: String,
    default: "",
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
PaymentSchema.pre("save", function (next) {
  this.updatedAt = new Date()
  next()
})

export default mongoose.models.Payment || mongoose.model("Payment", PaymentSchema)
