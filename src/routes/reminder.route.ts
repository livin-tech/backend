import { Router } from "express";

import * as reminderController from "../controllers/reminder.controller";

const router = Router();

router.post("/", reminderController.createReminder.bind(reminderController));
router.get("/", reminderController.getAllReminders.bind(reminderController));
router.get("/:id", reminderController.getReminderById.bind(reminderController));
router.put("/:id", reminderController.updateReminder.bind(reminderController));
router.delete("/:id", reminderController.deleteReminder.bind(reminderController));

export default router;
