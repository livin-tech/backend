import { Router } from "express";
import { PropertyController } from "../controllers/property.controller";

const router = Router();
const propertyController = new PropertyController();

router.post("/", propertyController.createProperty.bind(propertyController));
router.get("/", propertyController.getProperties.bind(propertyController));
router.get("/:id", propertyController.getPropertyById.bind(propertyController));
router.put("/:id", propertyController.updateProperty.bind(propertyController));
router.delete("/:id", propertyController.deleteProperty.bind(propertyController));

export default router;
