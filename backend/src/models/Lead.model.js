import mongoose from "mongoose";
import { LEAD_STATUS, LEAD_SOURCE } from "../constants/index.js";

const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    message: {
      type: String,
      trim: true,
    },
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      default: null,
    },
    source: {
      type: String,
      enum: Object.values(LEAD_SOURCE),
      default: LEAD_SOURCE.WEBSITE,
    },
    status: {
      type: String,
      enum: Object.values(LEAD_STATUS),
      default: LEAD_STATUS.NEW,
    },
    assignedTo: {
      // Reserved for future Broker Portal assignment workflow
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    notes: [
      {
        text: { type: String, trim: true },
        addedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        addedAt: { type: Date, default: Date.now },
      },
    ],
    isArchived: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

leadSchema.index({ status: 1, createdAt: -1 });
leadSchema.index({ property: 1 });
leadSchema.index({ email: 1, phone: 1 });

export const Lead = mongoose.model("Lead", leadSchema);
