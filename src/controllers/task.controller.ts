import type { Request, Response } from "express";
import { z } from "zod";

import logger from "../config/logger";
import { TaskType } from "../models/task.model";
import { TaskRepository } from "../repository/task.repository";

// Define Zod schema for task validation
const taskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  dueDate: z.date().refine((date) => !Number.isNaN(date.getTime()), {
    message: "Due date must be a valid date",
  }),
  type: z.nativeEnum(TaskType, {
    errorMap: () => ({ message: "Type must be 'Cleaning' or 'Maintenance'" }),
  }),
  property: z.string().length(24, "Property ID must be a valid ObjectId"),
});

export class TaskController {
  constructor(private taskRepository = new TaskRepository()) {}

  async createTask(req: Request, res: Response) {
    try {
      const validatedData = taskSchema.parse(req.body);
      const task = await this.taskRepository.createTask(validatedData);
      logger.info(`Task created successfully: ${task._id}`);
      return res.status(201).json(task);
    } catch (error) {
      if (error instanceof z.ZodError) {
        logger.error("Validation error during task creation", { errors: error.errors });
        return res.status(400).json({ message: "Validation Error", errors: error.errors });
      }
      logger.error("Error creating task", { error });
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async getTasksByProperty(req: Request, res: Response) {
    try {
      const tasks = await this.taskRepository.getTasksByProperty(req.params.propertyId);
      logger.info(`Fetched tasks for property: ${req.params.propertyId}`);
      return res.json(tasks);
    } catch (error) {
      logger.error("Error fetching tasks by property", { error });
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async getTaskById(req: Request, res: Response) {
    try {
      const task = await this.taskRepository.findTaskById(req.params.id);
      if (!task) {
        logger.warn(`Task not found: ${req.params.id}`);
        return res.status(404).json({ message: "Task not found" });
      }
      logger.info(`Fetched task: ${task._id}`);
      return res.json(task);
    } catch (error) {
      logger.error("Error fetching task", { error });
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async updateTask(req: Request, res: Response) {
    try {
      const validatedData = taskSchema.partial().parse(req.body);
      const task = await this.taskRepository.updateTask(req.params.id, validatedData);
      if (!task) {
        logger.warn(`Task not found for update: ${req.params.id}`);
        return res.status(404).json({ message: "Task not found" });
      }
      logger.info(`Updated task: ${task._id}`);
      return res.json(task);
    } catch (error) {
      if (error instanceof z.ZodError) {
        logger.error("Validation error during task update", { errors: error.errors });
        return res.status(400).json({ message: "Validation Error", errors: error.errors });
      }
      logger.error("Error updating task", { error });
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async deleteTask(req: Request, res: Response) {
    try {
      const task = await this.taskRepository.deleteTask(req.params.id);
      if (!task) {
        logger.warn(`Task not found for deletion: ${req.params.id}`);
        return res.status(404).json({ message: "Task not found" });
      }
      logger.info(`Deleted task: ${task._id}`);
      return res.status(204).send();
    } catch (error) {
      logger.error("Error deleting task", { error });
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
