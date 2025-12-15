import { Router } from "express";
import visitasController from "../controllers/visitasPontoFigController.js";
import auth from "../middleware/auth.js";

const router = Router();

router.post(
  "/qr",
  auth,
  visitasController.visitarViaQr 
);

export default router;
