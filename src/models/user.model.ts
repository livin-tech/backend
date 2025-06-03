import mongoose, { type Document, type Schema } from "mongoose";
import type { ICountryCode } from "./property.model";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: string;
  firebaseID: string;
  address: string;
  subscriptionStatus: "essential" | "pro";
  hasOnboarded: boolean;
  userPhone?: string;
  userCountryCode?: string | ICountryCode;
}

const userSchema: Schema<IUser> = new mongoose.Schema({
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
  },
  phoneNumber: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  firebaseID: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: false,
  },
  subscriptionStatus: {
    type: String,
    enum: ["essential", "pro"],
    default: "essential",
  },
  hasOnboarded: {
    type: Boolean,
    default: false,
  },
  userPhone: {
    type: String,
    required: false,
  },
  userCountryCode: {
    type: mongoose.Schema.Types.Mixed, // Accepts any type (string or object)
    required: false,
  },
});

export const UserModel = mongoose.model<IUser>("User", userSchema);
