import { Router } from "express";
import { createItem, deleteItem, getAllItems, getAllItemsByCategory, updateItem } from "../controllers/item.controller";

const router = Router();

router.post("/", createItem);
router.get("/", getAllItems);
router.get("/:id", getAllItems); // Update this if you want to get a single item by ID
router.get("/category/:category", getAllItemsByCategory);
router.put("/:id", updateItem);
router.delete("/:id", deleteItem);

export default router;
