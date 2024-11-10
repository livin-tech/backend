import type { Request, Response } from "express";
import { z } from "zod";
import { CATEGORY, type IReminder } from "../models/reminder.model"; // Import the CATEGORY enum
import { ReminderRepository } from "../repository/reminder.repository"; // Import the ReminderRepository

// Zod schema for creating a reminder
const createReminderSchema = z.object({
  property: z.string().length(24, "Property ID must be a valid ObjectId"),
  category: z.enum([CATEGORY.CLEANING, CATEGORY.MAINTENANCE], "Invalid category"),
  item: z.string().length(24, "Item ID must be a valid ObjectId"),
  material: z.string().length(24, "Material ID must be a valid ObjectId"),
  itemQuantity: z.number().min(1, "Item quantity must be at least 1"),
  selectedFrequency: z.number().min(1, "Selected frequency must be at least 1"),
  lastMaintenance: z.date().nullable(),
  startDate: z.string(),
});

// Controller to create a reminder
export const createReminder = async (req: Request, res: Response) => {
  try {
    const validatedData = createReminderSchema.parse(req.body) as IReminder;

    // Use the ReminderRepository to create a reminder
    const newReminder = await ReminderRepository.createReminder(validatedData);
    return res.status(201).json(newReminder);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Controller to get all reminders
export const getAllReminders = async (_req: Request, res: Response) => {
  try {
    const reminders = await ReminderRepository.getAllReminders();
    return res.status(200).json(reminders);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Controller to get a reminder by ID
export const getReminderById = async (req: Request, res: Response) => {
  try {
    const reminder = await ReminderRepository.getReminderById(req.params.id);
    if (!reminder) {
      return res.status(404).json({ error: "Reminder not found" });
    }
    return res.status(200).json(reminder);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Controller to update a reminder
export const updateReminder = async (req: Request, res: Response) => {
  try {
    const validatedData = createReminderSchema.parse(req.body) as IReminder;
    const updatedReminder = await ReminderRepository.updateReminder(req.params.id, validatedData);

    if (!updatedReminder) {
      return res.status(404).json({ error: "Reminder not found" });
    }

    return res.status(200).json(updatedReminder);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Controller to delete a reminder
export const deleteReminder = async (req: Request, res: Response) => {
  try {
    const success = await ReminderRepository.deleteReminder(req.params.id);
    if (!success) {
      return res.status(404).json({ error: "Reminder not found" });
    }
    return res.status(200).json({ message: "Reminder deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
