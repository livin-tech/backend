import { Router } from "express";
import { TaskController } from "../controllers/task.controller";

const router = Router();
const taskController = new TaskController();

router.post("/", taskController.createTask.bind(taskController));
router.get("/:id", taskController.getTasksByProperty.bind(taskController));
router.put("/:id", taskController.updateTask.bind(taskController));
router.delete("/:id", taskController.deleteTask.bind(taskController));

export default router;
