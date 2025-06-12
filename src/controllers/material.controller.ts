import type { Request, Response } from "express";
import { z } from "zod";
import { MaterialRepository } from "../repository/material.repository";

// Initialize Material repository
const materialRepository = new MaterialRepository();

// Zod schema for material validation
const materialSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  nameEN: z.string().optional(),
  nameES: z.string().optional(),
});

// Controller: Create a Material
export const createMaterial = async (req: Request, res: Response) => {
  try {
    // Validate input using Zod
    const result = materialSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        error: "Invalid data",
        details: result.error.format(),
      });
    }

    const { name, nameEN, nameES } = result.data;

    // Create a new material using the repository
    const newMaterial = await materialRepository.createMaterial({ name, nameEN, nameES });
    return res.status(201).json(newMaterial);
  } catch (error) {
    console.error(error); // For debugging purposes
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Controller: Get all Materials
export const getAllMaterials = async (_req: Request, res: Response) => {
  try {
    const materials = await materialRepository.getAllMaterials();
    return res.status(200).json(materials);
  } catch (error) {
    console.error(error); // For debugging purposes
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Controller: Get Material by ID
export const getMaterialById = async (req: Request, res: Response) => {
  try {
    const material = await materialRepository.getMaterialById(req.params.id); // Get material by ID

    if (!material) {
      return res.status(404).json({ error: "Material not found" });
    }

    return res.status(200).json(material);
  } catch (error) {
    console.error(error); // For debugging purposes
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Controller: Update Material by ID
export const updateMaterial = async (req: Request, res: Response) => {
  try {
    // Validate input using Zod for update
    const result = materialSchema.partial().safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        error: "Invalid data",
        details: result.error.format(),
      });
    }

    const material = await materialRepository.updateMaterial(req.params.id, result.data);

    if (!material) {
      return res.status(404).json({ error: "Material not found" });
    }

    return res.status(200).json(material);
  } catch (error) {
    console.error(error); // For debugging purposes
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Controller: Delete Material by ID
export const deleteMaterial = async (req: Request, res: Response) => {
  try {
    const material = await materialRepository.deleteMaterial(req.params.id);

    if (!material) {
      return res.status(404).json({ error: "Material not found" });
    }

    return res.status(200).json({ message: "Material deleted successfully" });
  } catch (error) {
    console.error(error); // For debugging purposes
    return res.status(500).json({ error: "Internal server error" });
  }
};
