import { type Document, Schema, type Types, model } from "mongoose";

export enum CATEGORY {
  CLEANING = "CLEANING",
  MAINTENANCE = "MAINTENANCE",
}

export interface IReminder extends Document {
  property: Types.ObjectId;
  category: CATEGORY;
  item: Types.ObjectId;
  material: Types.ObjectId;
  itemQuantity: number;
  selectedFrequency: number;
  lastMaintenance?: string | null;
  startDate: string;
  description?: string;
}

const reminderSchema = new Schema<IReminder>(
  {
    property: {
      type: Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },
    category: {
      type: String,
      enum: CATEGORY,
      required: true,
    },
    item: {
      type: Schema.Types.ObjectId,
      ref: "Item",
      required: true,
    },
    material: {
      type: Schema.Types.ObjectId,
      ref: "Material",
      required: true,
    },
    itemQuantity: {
      type: Number,
      required: true,
      min: 1, // Assuming the quantity should always be at least 1
    },
    selectedFrequency: {
      type: Number,
      required: true,
      min: 1, // Example: frequency in days (e.g., every 30 days)
    },
    lastMaintenance: {
      type: String,
      required: false,
      default: null, // Can be null if no maintenance has been done
    },
    startDate: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
  },
  { timestamps: true },
);

export const ReminderModel = model("Reminder", reminderSchema);
