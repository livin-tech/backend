import { Router } from "express";
import { createMaterial, deleteMaterial, getAllMaterials, updateMaterial } from "../controllers/material.controller";

const router = Router();

router.post("/", createMaterial);
router.get("/", getAllMaterials);
router.get("/:id", getAllMaterials);
router.put("/:id", updateMaterial);
router.delete("/:id", deleteMaterial);

export default router;
