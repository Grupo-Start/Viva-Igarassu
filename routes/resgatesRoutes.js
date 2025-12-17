import { Router } from "express";
import resgatesController from "../controllers/resgatesController.js";
import auth from "../middleware/auth.js";

const router = Router();

router.post("/:id", auth, resgatesController.resgatar);

router.get("/meus", auth, resgatesController.meusResgates);

export default router;
