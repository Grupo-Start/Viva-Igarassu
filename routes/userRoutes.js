import { Router } from "express";
import userController from "../controllers/userController.js";
import auth from "../middleware/auth.js";

const router = Router();

router.post("/login", userController.login);
router.post("/cadastrar", userController.cadastrar);

router.get("/me", auth, userController.getMe);
router.put("/me", auth, userController.updateMe);

export default router;
