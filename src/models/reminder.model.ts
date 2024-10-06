import mongoose, { type Document, type Schema } from "mongoose";

export interface IReminder extends Document {
  category: string;
  selectedMaterial: string;
  selectedFrequency: "daily" | "weekly" | "monthly" | "yearly";
  lastMaintenance: Date;
  date: Date;
}

const reminderSchema: Schema<IReminder> = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  selectedMaterial: {
    type: String,
    required: true,
  },
  selectedFrequency: {
    type: String,
    required: true,
    enum: ["daily", "weekly", "monthly", "yearly"],
  },
  lastMaintenance: {
    type: Date,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

export const ReminderModel = mongoose.model<IReminder>("Reminder", reminderSchema);
