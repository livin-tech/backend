import type { Request, Response } from "express";
import { z } from "zod";

import logger from "../config/logger";
import { UserRepository } from "../repository/user.repository";

// Define Zod schema for user validation
const userSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  firebaseID: z.string(),
  phoneNumber: z.string().optional(),
  address: z.string().optional(),
  subscriptionStatus: z.enum(["essential", "pro"]).optional(),
  role: z.enum(["user", "admin"]).optional(),
});

export class UserController {
  constructor(private userRepository = new UserRepository()) {}

  async createUser(req: Request, res: Response) {
    try {
      // Validate the request body using the Zod schema
      const validatedData = userSchema.parse(req.body);

      // Check for existing user
      const existingUser = await this.userRepository.findUserByEmail(validatedData.email);
      if (existingUser) {
        logger.warn(`User creation failed. Email ${validatedData.email} already exists`);
        return res.status(400).json({ message: "Email already exists" });
      }

      const user = await this.userRepository.createUser({ ...validatedData });

      logger.info(`User created successfully with Firebase ID: ${validatedData?.firebaseID}`);
      return res.status(201).json(user);
    } catch (error) {
      if (error instanceof z.ZodError) {
        logger.error("Validation error during user creation", {
          errors: error.errors,
        });
        return res.status(400).json({ message: "Validation Error", errors: error.errors });
      }
      logger.error("Error creating user", { error });
      return res.status(500).json({ message: "Internal Server Error", error });
    }
  }

  async getUsers(req: Request, res: Response) {
    try {
      const users = await this.userRepository.getAllUsers();
      logger.info("Users fetched successfully");
      return res.json(users);
    } catch (error) {
      logger.error("Error fetching users", { error });
      return res.status(500).json({ message: "Internal Server Error", error });
    }
  }

  async getUserById(req: Request, res: Response) {
    try {
      const user = await this.userRepository.findUserByFirebaseID(req.params.id);
      if (!user) {
        logger.warn(`User with Firebase ID ${req.params.id} not found`);
        return res.status(404).json({ message: "User not found" });
      }
      logger.info(`User fetched successfully with Firebase ID: ${req.params.id}`);
      return res.json(user);
    } catch (error) {
      logger.error(`Error fetching user with Firebase ID ${req.params.id}`, {
        error,
      });
      return res.status(500).json({ message: "Internal Server Error", error });
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const validatedData = userSchema.partial().parse(req.body); // Use .partial() for optional fields in updates

      const user = await this.userRepository.findUserByFirebaseID(req.params.id);
      if (!user) {
        logger.warn(`User update failed. Firebase ID ${req.params.id} not found`);
        return res.status(404).json({ message: "User not found" });
      }

      const updatedUser = await this.userRepository.updateUser(user.firebaseID, validatedData);

      logger.info(`User updated successfully with Firebase ID: ${user.firebaseID}`);
      return res.json(updatedUser);
    } catch (error) {
      if (error instanceof z.ZodError) {
        logger.error("Validation error during user update", {
          errors: error.errors,
        });
        return res.status(400).json({ message: "Validation Error", errors: error.errors });
      }
      logger.error("Error updating user", { error });
      return res.status(500).json({ message: "Internal Server Error", error });
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const user = await this.userRepository.findUserByFirebaseID(req.params.id);
      if (!user) {
        logger.warn(`User deletion failed. Firebase ID ${req.params.id} not found`);
        return res.status(404).json({ message: "User not found" });
      }

      await this.userRepository.deleteUser(user.firebaseID);
      logger.info(`User deleted successfully with Firebase ID: ${user.firebaseID}`);
      return res.status(204).send();
    } catch (error) {
      logger.error(`Error deleting user with Firebase ID ${req.params.id}`, {
        error,
      });
      return res.status(500).json({ message: "Internal Server Error", error });
    }
  }

  // Check onboarding status
  async checkOnboardingStatus(req: Request, res: Response): Promise<Response> {
    try {
      const user = await this.userRepository.findUserByFirebaseID(req.params.id);
      if (!user) {
        logger.warn(`User with Firebase ID ${req.params.id} not found`);
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json({ hasOnboarded: user.hasOnboarded });
    } catch (error) {
      logger.error(`Error checking onboarding status for user with Firebase ID ${req.params.id}`, { error });
      return res.status(500).json({ message: "Server error", error });
    }
  }

  // Update onboarding status
  async updateOnboardingStatus(req: Request, res: Response): Promise<Response> {
    try {
      const user = await this.userRepository.updateUser(req.params.id, {
        hasOnboarded: true,
      });
      if (!user) {
        logger.warn(`User with Firebase ID ${req.params.id} not found`);
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json({ message: "Onboarding status updated", user });
    } catch (error) {
      logger.error(`Error updating onboarding status for user with Firebase ID ${req.params.id}`, { error });
      return res.status(500).json({ message: "Server error", error });
    }
  }
}
