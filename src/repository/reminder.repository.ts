import { Types } from "mongoose";
import Logger from "../config/logger";
import { type IReminder, ReminderModel } from "../models/reminder.model"; // Import the Reminder model

// Repository for managing Reminder data
export class ReminderRepository {
  logger = new Logger();
  // Create a new reminder
  public static async createReminder(data: IReminder): Promise<IReminder> {
    try {
      const newReminder = new ReminderModel(data);
      await newReminder.save();
      return newReminder;
    } catch (error) {
      throw new Error(`Error creating reminder: ${error}`);
    }
  }

  // Get all reminders with population of references (Property, Item, Material)
  public static async getAllReminders(): Promise<IReminder[]> {
    try {
      const reminders = await ReminderModel.find().populate("property").populate("item").populate("material");
      return reminders;
    } catch (error) {
      throw new Error(`Error fetching reminders: ${error}`);
    }
  }

  // Get a reminder by ID with population of references (Property, Item, Material)
  public static async getReminderById(id: string): Promise<IReminder | null> {
    try {
      const reminder = await ReminderModel.findById(id).populate("property").populate("item").populate("material");
      return reminder;
    } catch (error) {
      throw new Error(`Error fetching reminder by ID: ${error}`);
    }
  }

  // Update a reminder by ID
  public static async updateReminder(id: string, data: Partial<IReminder>): Promise<IReminder | null> {
    try {
      const updatedReminder = await ReminderModel.findByIdAndUpdate(id, data, { new: true });
      return updatedReminder;
    } catch (error) {
      throw new Error(`Error updating reminder: ${error}`);
    }
  }

  // Delete a reminder by ID
  public static async deleteReminder(id: string): Promise<boolean> {
    try {
      const result = await ReminderModel.findByIdAndDelete(id);
      return result !== null;
    } catch (error) {
      throw new Error(`Error deleting reminder: ${error}`);
    }
  }
}
