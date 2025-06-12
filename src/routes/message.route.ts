import { Router } from "express";
import { MessageController } from "../controllers/message.controller";

const router = Router();
const messageController = new MessageController();

router.post("/sms", messageController.sendSMS);
router.post("/whatsapp", messageController.sendWhatsApp);

export default router;
