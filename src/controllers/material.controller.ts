import type { Request, Response } from "express";
import { z } from "zod";
import { ItemModel } from "../models/item.model";
import { MaterialRepository } from "../repository/material.repository";

// Initialize Material repository
const materialRepository = new MaterialRepository();

// Zod schema for material validation
const createMaterialSchema = z.object({
  name: z.string().min(1, { message: "Material name is required" }),
  item: z.string().min(1, { message: "Item ID is required" }),
  priority: z.number().min(1, { message: "Priority must be a positive number" }),
  frequency: z.string(),
  description: z.string().optional(),
});

// Controller: Create a Material
export const createMaterial = async (req: Request, res: Response) => {
  try {
    const validatedData = createMaterialSchema.parse(req.body);

    // Ensure the item exists
    const itemExists = await ItemModel.findById(validatedData.item);
    if (!itemExists) {
      return res.status(400).json({ error: "Invalid item ID" });
    }

    const newMaterial = await materialRepository.createMaterial(validatedData);
    return res.status(201).json(newMaterial);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Controller: Update a Material
export const updateMaterial = async (req: Request, res: Response) => {
  try {
    const updateMaterialSchema = z.object({
      name: z.string().optional(),
      priority: z.number().optional(),
      frequency: z.string().optional(),
      description: z.string().optional(),
      item: z.string().optional(),
    });

    const validatedData = updateMaterialSchema.parse(req.body);
    const updatedMaterial = await materialRepository.updateMaterial(req.params.id, validatedData);

    if (!updatedMaterial) {
      return res.status(404).json({ error: "Material not found" });
    }

    return res.status(200).json(updatedMaterial);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Controller: Get all materials
export const getAllMaterials = async (_req: Request, res: Response) => {
  try {
    const materials = await materialRepository.getAllMaterials();
    return res.status(200).json(materials);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Controller: Delete a Material
export const deleteMaterial = async (req: Request, res: Response) => {
  try {
    const deletedMaterial = await materialRepository.deleteMaterial(req.params.id);
    if (!deletedMaterial) {
      return res.status(404).json({ error: "Material not found" });
    }
    return res.status(200).json(deletedMaterial);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
