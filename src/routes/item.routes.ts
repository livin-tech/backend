import { Router } from "express";
import { createItem, deleteItem, getAllItems, getItemById, updateItem } from "../controllers/item.controller";

const router = Router();

router.post("/", createItem);
router.get("/", getAllItems);
router.get("/:id", getItemById);
router.put("/:id", updateItem);
router.delete("/:id", deleteItem);

export default router;
