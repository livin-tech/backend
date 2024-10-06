import { Router } from "express";

import { UserController } from "../controllers/user.controller";

const router = Router();
const userController = new UserController();

router.post("/", userController.createUser.bind(userController));
router.get("/", userController.getUsers.bind(userController));
router.get("/:id", userController.getUserById.bind(userController));
router.put("/:id", userController.updateUser.bind(userController));
router.delete("/:id", userController.deleteUser.bind(userController));

// Onboarding status
router.get("/:id/onboarded", userController.checkOnboardingStatus.bind(userController));
router.patch("/:id/onboarded", userController.updateOnboardingStatus.bind(userController));

export default router;
