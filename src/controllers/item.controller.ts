import type { IItem } from "@/models/item.model";
import type { Request, Response } from "express";
import { z } from "zod";
import { ItemRepository } from "../repository/item.repository";

// Importing categories from mocks
// TODO: Move this to database
import { getCategories } from "../mocks";

const itemRepository = new ItemRepository();

// Zod schema for item creation
const createItemSchema = z.object({
  name: z.object({
    en: z.string().min(1, "Item name is required"),
    es: z.string().min(1, "Item name is required"),
  }),
  category: z.enum(["CLEANING", "MAINTENANCE"]),
  categoryEn: z.enum(["Cleaning", "Maintenance"]),
  categoryEs: z.enum(["Limpieza", "Mantenimiento"]),
  subCategory: z.string().optional(),
  subCategoryEn: z.string().optional(),
  subCategoryEs: z.string().optional(),
  image: z.string().url("Invalid image URL"),
  materials: z.array(z.string().length(24, "Each material ID must be a valid ObjectId")).optional(),
});

// Zod schema for item update
const updateItemSchema = z.object({
  name: z.object({
    en: z.string().optional(),
    es: z.string().optional(),
  }),
  category: z.enum(["CLEANING", "MAINTENANCE"]).optional(),
  categoryEn: z.enum(["Cleaning", "Maintenance"]).optional(),
  categoryEs: z.enum(["Limpieza", "Mantenimiento"]).optional(),
  subCategory: z.string().optional(),
  subCategoryEn: z.string().optional(),
  subCategoryEs: z.string().optional(),
  image: z.string().url().optional(),
  materials: z.array(z.string().length(24, "Each material ID must be a valid ObjectId")).optional(),
});

// Controller: Create an item
export const createItem = async (req: Request, res: Response) => {
  try {
    const validatedData = createItemSchema.parse(req.body) as IItem;
    const newItem = await itemRepository.createItem(validatedData);
    return res.status(201).json(newItem);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Controller: Update an item
export const updateItem = async (req: Request, res: Response) => {
  try {
    const validatedData = updateItemSchema.parse(req.body) as IItem;
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

// Controller: Get items by category
export const getItemsByCategory = async (req: Request, res: Response) => {
  try {
    const { category } = req.params;
    if (!["CLEANING", "MAINTENANCE"].includes(category)) {
      return res.status(400).json({ error: "Invalid category" });
    }
    const items = await itemRepository.getAllItemsByCategory(category as "CLEANING" | "MAINTENANCE");
    return res.status(200).json(items);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Controller: Get item by ID
export const getItemById = async (req: Request, res: Response) => {
  try {
    const item = await itemRepository.findItemById(req.params.id);
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }
    return res.status(200).json(item);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Controller: Delete an item
export const deleteItem = async (req: Request, res: Response) => {
  try {
    const deletedItem = await itemRepository.deleteItem(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ error: "Item not found" });
    }
    return res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Controller: Get paginated items
export const getPaginatedItems = async (req: Request, res: Response) => {
  try {
    const page = Number.parseInt(req.query.page as string) || 1;
    const limit = Number.parseInt(req.query.limit as string) || 10;
    const { items, total } = await itemRepository.getPaginatedItems(page, limit);

    return res.status(200).json({ items, total, page, totalPages: Math.ceil(total / limit) });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getCategoriesWithItems = async (req: Request, res: Response) => {
  try {
    const toReturn = [];
    let items = await itemRepository.getAllItems();
    const categories = getCategories(req);
    for (const category of categories) {
      if (items.length > 0) {
        const itemsToPush = items.filter((item) =>
          item.subCategory ? category.subCategory === item.subCategory : category.category === item.category,
        );
        itemsToPush.sort((a: any, b: any) => a.order - b.order);
        toReturn.push({
          ...category,
          items: itemsToPush.map((item: IItem) => ({
            id: item._id,
            name: item.name,
            order: item.order,
            category: item.category,
            materials: item.materials,
            categoryEn: item.categoryEn,
            categoryEs: item.categoryEs,
            subCategory: item.subCategory,
            subCategoryEn: item.subCategoryEn,
            subCategoryEs: item.subCategoryEs,
            image: `https://${req.get("host")}/assets/${item.image}`,
          })),
        });
        items = items.filter((item: any) => !itemsToPush.map((x: any) => x._id).includes(item._id));
      }
    }

    return res.status(200).json(toReturn);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
