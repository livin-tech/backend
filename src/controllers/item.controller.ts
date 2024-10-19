import type { Request, Response } from "express";
import { z } from "zod";
import { Material } from "../models/material.model";
import { ItemRepository } from "../repository/item.repository";

// Initialize Item repository
const itemRepository = new ItemRepository();

// Zod schema for item validation
const createItemSchema = z.object({
  name: z.string().min(1, { message: "Item name is required" }),
  category: z.enum(["CLEANING", "MAINTENANCE"]),
  materials: z.array(z.string()).optional(),
});

// Controller: Create an Item
export const createItem = async (req: Request, res: Response) => {
  try {
    const validatedData = createItemSchema.parse(req.body);
    const newItem = await itemRepository.createItem(validatedData);
    return res.status(201).json(newItem);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Controller: Update an Item
export const updateItem = async (req: Request, res: Response) => {
  try {
    const updateItemSchema = z.object({
      name: z.string().optional(),
      category: z.enum(["CLEANING", "MAINTENANCE"]).optional(),
      materials: z.array(z.string()).optional(),
    });

    const validatedData = updateItemSchema.parse(req.body);
    const updatedItem = await itemRepository.updateItem(req.params.id, validatedData);
    if (!updatedItem) {
      return res.status(404).json({ error: "Item not found" });
    }

    return res.status(200).json(updatedItem);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Controller: Get all items
export const getAllItems = async (_req: Request, res: Response) => {
  try {
    const items = await itemRepository.getAllItems();
    return res.status(200).json(items);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllItemsByCategory = async (_req: Request, res: Response) => {
  try {
    const items = await itemRepository.getAllItemsByCategory(_req.params.category);
    return res.status(200).json(items);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Controller: Delete an Item
export const deleteItem = async (req: Request, res: Response) => {
  try {
    const deletedItem = await itemRepository.deleteItem(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ error: "Item not found" });
    }
    return res.status(200).json(deletedItem);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
