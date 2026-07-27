import mongoose from "mongoose";
import slugify from "slugify";

const builderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Builder name is required"],
      trim: true,
      unique: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    logo: {
      url: { type: String, default: null },
      publicId: { type: String, default: null },
    },
    description: {
      type: String,
      trim: true,
    },
    establishedYear: {
      type: Number,
    },
    headquarters: {
      type: String,
      trim: true,
    },
    website: {
      type: String,
      trim: true,
    },
    contactEmail: {
      type: String,
      trim: true,
      lowercase: true,
    },
    contactPhone: {
      type: String,
      trim: true,
    },
    totalProjectsCompleted: {
      type: Number,
      default: 0,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    // Reserved for future Builder Portal: link a User account that can manage this builder profile
    portalUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true }
);

builderSchema.pre("validate", function generateSlug(next) {
  if (this.name && (!this.slug || this.isModified("name"))) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

export const Builder = mongoose.model("Builder", builderSchema);
