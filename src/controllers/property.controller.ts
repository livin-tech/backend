import type { Request, Response } from "express";
import { z } from "zod";

import logger from "../config/logger";
// Adjust the path as needed
import { PropertyRepository } from "../repository/property.repository";

// Define Zod schema for property validation
const propertySchema = z.object({
  type: z.string().min(1, "Type is required"),
  rooms: z.number().min(0, "Rooms must be a non-negative number"),
  bathrooms: z.number().min(0, "Bathrooms must be a non-negative number"),
  hasLivingRoom: z.boolean(),
  hasDiningRoom: z.boolean(),
  hasFamilyRoom: z.boolean(),
  hasHallRoom: z.boolean(),
  hasKitchen: z.boolean(),
  hasServiceRoom: z.boolean(),
  hasLaundryRoom: z.boolean(),
  hasBalcony: z.boolean(),
  hasGarden: z.boolean(),
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  size: z.number().optional(),
  sizeUnit: z.enum(["MT²", "FT²"]).optional(),
  price: z.number().optional(),
  location: z.string().optional(),
  owner: z.string().length(24, "Owner ID must be a valid ObjectId"),
  managerName: z.string().optional(),
  managerPhone: z.string().optional(),
});

export class PropertyController {
  constructor(private propertyRepository = new PropertyRepository()) {}

  // Create a new property
  async createProperty(req: Request, res: Response) {
    try {
      const validatedData = propertySchema.parse(req.body);
      const property = await this.propertyRepository.createProperty(validatedData);
      logger.info(`Property created successfully: ${property._id}`);
      return res.status(201).json(property);
    } catch (error) {
      if (error instanceof z.ZodError) {
        logger.error("Validation error during property creation", {
          errors: error.errors,
        });
        return res.status(400).json({ message: "Validation Error", errors: error.errors });
      }
      logger.error("Error creating property", { error });
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  // Get all properties
  async getProperties(req: Request, res: Response) {
    try {
      const properties = await this.propertyRepository.getAllProperties();
      logger.info("Fetched all properties");
      return res.json(properties);
    } catch (error) {
      logger.error("Error fetching properties", { error });
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  // Get property by ID
  async getPropertyById(req: Request, res: Response) {
    try {
      const property = await this.propertyRepository.findPropertyById(req.params.id);
      if (!property) {
        logger.warn(`Property not found: ${req.params.id}`);
        return res.status(404).json({ message: "Property not found" });
      }
      logger.info(`Fetched property: ${property._id}`);
      return res.json(property);
    } catch (error) {
      logger.error("Error fetching property", { error });
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  // Update a property
  async updateProperty(req: Request, res: Response) {
    try {
      const validatedData = propertySchema.partial().parse(req.body); // Use .partial() for updates
      const property = await this.propertyRepository.updateProperty(req.params.id, validatedData);
      if (!property) {
        logger.warn(`Property not found for update: ${req.params.id}`);
        return res.status(404).json({ message: "Property not found" });
      }
      logger.info(`Updated property: ${property._id}`);
      return res.json(property);
    } catch (error) {
      if (error instanceof z.ZodError) {
        logger.error("Validation error during property update", {
          errors: error.errors,
        });
        return res.status(400).json({ message: "Validation Error", errors: error.errors });
      }
      logger.error("Error updating property", { error });
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  // Delete a property
  async deleteProperty(req: Request, res: Response) {
    try {
      const property = await this.propertyRepository.deleteProperty(req.params.id);
      if (!property) {
        logger.warn(`Property not found for deletion: ${req.params.id}`);
        return res.status(404).json({ message: "Property not found" });
      }
      logger.info(`Deleted property: ${property._id}`);
      return res.status(204).send();
    } catch (error) {
      logger.error("Error deleting property", { error });
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
