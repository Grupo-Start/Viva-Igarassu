import { Router } from "express";
import visitaPontoController from "../controllers/userFigurinhaController.js";
import { permitir } from "../middleware/roles.js";

const router = Router();

router.post(
  "/ponto",
  permitir("comum"),
  visitaPontoController.visitar
);

export default router;
