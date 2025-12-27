import { Router } from "express";
import userController from "../controllers/userController.js";
import auth from "../middleware/auth.js";
import { isAdm } from "../middleware/roles.js";

const router = Router();

router.post("/login", userController.login);
router.post("/cadastrar", userController.cadastrar);
router.post("/forgot-password", userController.forgotPassword);
router.post("/reset-password", userController.resetPassword);

router.get("/me", auth, userController.getMe);
router.put("/me", auth, userController.updateMe);
router.post("/logout", auth, userController.logout);

router.get("/", auth, isAdm, userController.getAllUsers);

export default router;
