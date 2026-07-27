import mongoose from "mongoose";
import slugify from "slugify";
import { PROPERTY_STATUS, PROPERTY_TYPE, LISTING_TYPE } from "../constants/index.js";

const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Property title is required"],
      trim: true,
      maxlength: 150,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    description: {
      type: String,
      required: [true, "Property description is required"],
    },
    propertyType: {
      type: String,
      enum: Object.values(PROPERTY_TYPE),
      required: true,
    },
    listingType: {
      type: String,
      enum: Object.values(LISTING_TYPE),
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(PROPERTY_STATUS),
      default: PROPERTY_STATUS.AVAILABLE,
    },
    price: {
      amount: { type: Number, required: true, min: 0 },
      currency: { type: String, default: "INR" },
      priceOnRequest: { type: Boolean, default: false },
    },
    area: {
      value: { type: Number, required: true },
      unit: { type: String, enum: ["sqft", "sqm", "acres"], default: "sqft" },
    },
    bedrooms: { type: Number, default: 0 },
    bathrooms: { type: Number, default: 0 },
    parkingSpaces: { type: Number, default: 0 },
    floors: { type: Number, default: 1 },
    amenities: [{ type: String, trim: true }],

    location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Location",
      required: true,
    },
    builder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Builder",
      default: null,
    },
    address: {
      line1: { type: String, trim: true },
      landmark: { type: String, trim: true },
      coordinates: {
        lat: { type: Number },
        lng: { type: Number },
      },
    },

    images: [
      {
        url: { type: String, required: true },
        publicId: { type: String, required: true },
        isCover: { type: Boolean, default: false },
      },
    ],
    videoUrl: { type: String, default: null },
    brochure: {
      url: { type: String, default: null },
      publicId: { type: String, default: null },
    },

    isFeatured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    viewsCount: { type: Number, default: 0 },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

propertySchema.index({ title: "text", description: "text" });
propertySchema.index({ propertyType: 1, listingType: 1, status: 1 });
propertySchema.index({ location: 1 });
propertySchema.index({ "price.amount": 1 });
propertySchema.index({ isFeatured: 1, isActive: 1 });

propertySchema.pre("validate", function generateSlug(next) {
  if (this.title && (!this.slug || this.isModified("title"))) {
    this.slug = `${slugify(this.title, { lower: true, strict: true })}-${Date.now()
      .toString()
      .slice(-5)}`;
  }
  next();
});

export const Property = mongoose.model("Property", propertySchema);
