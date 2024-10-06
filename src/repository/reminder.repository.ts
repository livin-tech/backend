import { type IReminder, ReminderModel } from "@/models/reminder.model";

export class ReminderRepository {
  // Create a new reminder
  async createReminder(reminderData: Partial<IReminder>): Promise<IReminder> {
    const reminder = new ReminderModel(reminderData);
    return await reminder.save();
  }

  // Find a reminder by ID
  async findReminderById(reminderId: string): Promise<IReminder | null> {
    return ReminderModel.findById(reminderId).exec();
  }

  // Get all reminders
  async getAllReminders(): Promise<IReminder[]> {
    return ReminderModel.find().exec();
  }

  // Update a reminder
  async updateReminder(reminderId: string, updateData: Partial<IReminder>): Promise<IReminder | null> {
    return ReminderModel.findByIdAndUpdate(reminderId, updateData, { new: true }).exec();
  }

  // Delete a reminder
  async deleteReminder(reminderId: string): Promise<IReminder | null> {
    return ReminderModel.findByIdAndDelete(reminderId).exec();
  }
}
