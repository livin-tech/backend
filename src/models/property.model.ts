import mongoose, { type Document, type Schema, type Types } from "mongoose";

export interface IProperty extends Document {
  type: string;
  rooms: number;
  bathrooms: number;
  hasLivingRoom: boolean;
  hasDiningRoom: boolean;
  hasFamilyRoom: boolean;
  hasHallRoom: boolean;
  hasKitchen: boolean;
  hasServiceRoom: boolean;
  hasLaundryRoom: boolean;
  hasBalcony: boolean;
  hasGarden: boolean;
  title: string;
  description: string;
  price: number;
  location: string;
  size: number;
  sizeUnit: "m2" | "ft2";
  owner: Types.ObjectId; // reference to the User model
}

const propertySchema: Schema<IProperty> = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  rooms: {
    type: Number,
    required: true,
  },
  bathrooms: {
    type: Number,
    required: true,
  },
  hasLivingRoom: {
    type: Boolean,
    required: true,
  },
  hasDiningRoom: {
    type: Boolean,
    required: true,
  },
  hasFamilyRoom: {
    type: Boolean,
    required: true,
  },
  hasHallRoom: {
    type: Boolean,
    required: true,
  },
  hasKitchen: {
    type: Boolean,
    required: true,
  },
  hasServiceRoom: {
    type: Boolean,
    required: true,
  },
  hasLaundryRoom: {
    type: Boolean,
    required: true,
  },
  hasBalcony: {
    type: Boolean,
    required: true,
  },
  hasGarden: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: false,
  },
  location: {
    type: String,
    required: false,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
  managerName: {
    type: String,
    required: false,
  },
  managerPhone: {
    type: String,
    required: false,
  },
  size: {
    type: Number,
    required: false,
  },
  sizeUnit: {
    type: String,
    enum: ["m2", "ft2"],
    required: false,
  },
});

export const PropertyModel = mongoose.model<IProperty>("Property", propertySchema);
