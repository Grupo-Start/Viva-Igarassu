import { Router } from "express";
import visitasPontoFigController from "../controllers/visitasPontoFigController.js";
import auth from "../middleware/auth.js";

const router = Router();

router.post("/qr", auth, visitasPontoFigController.visitarViaQr);

export default router;
