import { Router } from "express";
import minhasFigurinhasController from "../controllers/minhasFigurinhasController.js";
import { permitir } from "../middleware/roles.js";

const router = Router();

router.get(
  "/",
  permitir("comum"),
  minhasFigurinhasController.listar
);

export default router;
