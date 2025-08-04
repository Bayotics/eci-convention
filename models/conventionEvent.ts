import mongoose from "mongoose"

const SectionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    video: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: true },
)

const ConventionEventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    dateFrom: {
      type: Date,
      required: true,
    },
    dateTo: {
      type: Date,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      enum: ["Single", "Sectioned"],
      required: true,
    },
    // For Single type events
    title: {
      type: String,
      trim: true,
    },
    video: {
      type: String,
      trim: true,
    },
    // For Sectioned type events
    sections: [SectionSchema],
  },
  {
    timestamps: true,
  },
)



export default mongoose.models.ConventionEvent || mongoose.model("ConventionEvent", ConventionEventSchema)
