import mongoose from "mongoose";
import slugify from "slugify";

const locationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Location name is required"],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: String,
      required: true,
      trim: true,
    },
    country: {
      type: String,
      default: "India",
      trim: true,
    },
    pincode: {
      type: String,
      trim: true,
    },
    coordinates: {
      lat: { type: Number },
      lng: { type: Number },
    },
    coverImage: {
      url: { type: String, default: null },
      publicId: { type: String, default: null },
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

locationSchema.index({ city: 1, state: 1 });

locationSchema.pre("validate", function generateSlug(next) {
  if (this.name && (!this.slug || this.isModified("name"))) {
    this.slug = slugify(`${this.name}-${this.city}`, { lower: true, strict: true });
  }
  next();
});

export const Location = mongoose.model("Location", locationSchema);
