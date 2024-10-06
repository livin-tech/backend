import type { Request, Response } from "express";
import { z } from "zod";

// Adjust the path as needed
import { ReminderRepository } from "@/repository/reminder.repository";
import logger from "../config/logger";

// Define the reminder schema with specific types and validations
const reminderSchema = z.object({
  category: z.string().min(1, "Category is required"),
  selectedMaterial: z.string().min(1, "Selected material is required"),
  selectedFrequency: z.enum(["daily", "weekly", "monthly", "yearly"], {
    errorMap: () => ({ message: "Selected frequency must be one of: daily, weekly, monthly, yearly" }),
  }),
  lastMaintenance: z.date().refine((date) => !Number.isNaN(date.getTime()), {
    message: "Last maintenance must be a valid date",
  }),
  date: z.date().refine((date) => !Number.isNaN(date.getTime()), {
    message: "Date must be a valid date",
  }),
});

export class ReminderController {
  constructor(private reminderRepository = new ReminderRepository()) {}

  // Create a new reminder
  async createReminder(req: Request, res: Response) {
    try {
      const validatedData = reminderSchema.parse(req.body);
      const reminder = await this.reminderRepository.createReminder(validatedData);
      logger.info(`Reminder created successfully: ${reminder._id}`);
      return res.status(201).json(reminder);
    } catch (error) {
      if (error instanceof z.ZodError) {
        logger.error("Validation error during reminder creation", { errors: error.errors });
        return res.status(400).json({ message: "Validation Error", errors: error.errors });
      }
      logger.error("Error creating reminder", { error });
      return res.status(500).json({ message: "Internal Server Error", error });
    }
  }

  // Get all reminders
  async getReminders(req: Request, res: Response) {
    try {
      const reminders = await this.reminderRepository.getAllReminders();
      logger.info("Fetched all reminders");
      return res.json(reminders);
    } catch (error) {
      logger.error("Error fetching reminders", { error });
      return res.status(500).json({ message: "Internal Server Error", error });
    }
  }

  // Get reminder by ID
  async getReminderById(req: Request, res: Response) {
    try {
      const reminder = await this.reminderRepository.findReminderById(req.params.id);
      if (!reminder) {
        logger.warn(`Reminder not found: ${req.params.id}`);
        return res.status(404).json({ message: "Reminder not found" });
      }
      logger.info(`Fetched reminder: ${reminder._id}`);
      return res.json(reminder);
    } catch (error) {
      logger.error("Error fetching reminder", { error });
      return res.status(500).json({ message: "Internal Server Error", error });
    }
  }

  // Update a reminder
  async updateReminder(req: Request, res: Response) {
    try {
      const validatedData = reminderSchema.partial().parse(req.body);
      const reminder = await this.reminderRepository.updateReminder(req.params.id, validatedData);
      if (!reminder) {
        logger.warn(`Reminder not found for update: ${req.params.id}`);
        return res.status(404).json({ message: "Reminder not found" });
      }
      logger.info(`Updated reminder: ${reminder._id}`);
      return res.json(reminder);
    } catch (error) {
      if (error instanceof z.ZodError) {
        logger.error("Validation error during reminder update", { errors: error.errors });
        return res.status(400).json({ message: "Validation Error", errors: error.errors });
      }
      logger.error("Error updating reminder", { error });
      return res.status(500).json({ message: "Internal Server Error", error });
    }
  }

  // Delete a reminder
  async deleteReminder(req: Request, res: Response) {
    try {
      const reminder = await this.reminderRepository.deleteReminder(req.params.id);
      if (!reminder) {
        logger.warn(`Reminder not found for deletion: ${req.params.id}`);
        return res.status(404).json({ message: "Reminder not found" });
      }
      logger.info(`Deleted reminder: ${reminder._id}`);
      return res.status(204).send();
    } catch (error) {
      logger.error("Error deleting reminder", { error });
      return res.status(500).json({ message: "Internal Server Error", error });
    }
  }
}
