import { Router } from "express";

import { ReminderController } from "../controllers/reminder.controller";

const router = Router();
const reminderController = new ReminderController();

router.post("/", reminderController.createReminder.bind(reminderController));
router.get("/", reminderController.getReminders.bind(reminderController));
router.get("/:id", reminderController.getReminderById.bind(reminderController));
router.put("/:id", reminderController.updateReminder.bind(reminderController));
router.delete("/:id", reminderController.deleteReminder.bind(reminderController));

export default router;
