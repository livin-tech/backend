import { Router } from "express";
import {
  createItem,
  deleteItem,
  getAllItems,
  getCategoriesWithItems,
  getItemById,
  getItemsByCategory,
  getPaginatedItems,
  updateItem,
} from "../controllers/item.controller";

const router = Router();

// Route to create an item
router.post("/", createItem);

// Route to get all items
router.get("/", getAllItems);

// Route to get paginated items (with page and limit query parameters)
router.get("/paginated", getPaginatedItems);

// Route to get items by category (CLEANING or MAINTENANCE)
router.get("/category/:category", getItemsByCategory);

router.get("/groupByCategory", getCategoriesWithItems);

// Route to get an item by ID
router.get("/:id", getItemById);

// Route to update an item
router.put("/:id", updateItem);

// Route to delete an item
router.delete("/:id", deleteItem);

export default router;
