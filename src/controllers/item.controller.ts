import type { Request, Response } from "express";
import { z } from "zod";
import { ItemModel } from "../models/item.model"; // Import your Item model

// Zod schema for item validation
const createItemSchema = z.object({
  name: z.string().min(1, "Item name is required"),
  material: z.array(z.string().length(24, "Each material ID must be a valid ObjectId")).optional(),
});

// Zod schema for item update validation
const updateItemSchema = z.object({
  name: z.string().optional(),
  material: z.array(z.string().length(24, "Each material ID must be a valid ObjectId")).optional(),
});

// Controller: Create an Item
export const createItem = async (req: Request, res: Response) => {
  try {
    // Validate request body using Zod schema
    const validatedData = createItemSchema.parse(req.body);

    // Create a new Item in the database
    const newItem = new ItemModel(validatedData);
    await newItem.save();

    return res.status(201).json(newItem); // Return created item
  } catch (error) {
    if (error instanceof z.ZodError) {
      // If validation fails, return the error details
      return res.status(400).json({ error: error.errors });
    }
    // Handle any other errors
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Controller: Update an Item
export const updateItem = async (req: Request, res: Response) => {
  try {
    // Validate request body using Zod schema
    const validatedData = updateItemSchema.parse(req.body);

    // Find the Item by ID and update it
    const updatedItem = await ItemModel.findByIdAndUpdate(req.params.id, validatedData, { new: true });
    if (!updatedItem) {
      return res.status(404).json({ error: "Item not found" });
    }

    return res.status(200).json(updatedItem); // Return updated item
  } catch (error) {
    if (error instanceof z.ZodError) {
      // If validation fails, return the error details
      return res.status(400).json({ error: error.errors });
    }
    // Handle any other errors
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Controller: Get All Items
export const getAllItems = async (_req: Request, res: Response) => {
  try {
    // Get all items from the database
    const items = await ItemModel.find().populate("material"); // Populate materials field
    return res.status(200).json(items); // Return items
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Controller: Get Item by ID
export const getItemById = async (req: Request, res: Response) => {
  try {
    // Get item by ID and populate materials
    const item = await ItemModel.findById(req.params.id).populate("material");
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }
    return res.status(200).json(item);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Controller: Delete an Item
export const deleteItem = async (req: Request, res: Response) => {
  try {
    // Delete item by ID
    const deletedItem = await ItemModel.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ error: "Item not found" });
    }
    return res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
