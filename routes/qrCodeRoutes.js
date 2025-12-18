import { Router } from "express";
import qrCodeController from "../controllers/qrCodeController.js";
import auth from "../middleware/auth.js";
import { permitir } from "../middleware/roles.js";

const router = Router();

router.post(
  "/pontos-turisticos/:id/qrcode",
  auth,
  permitir("adm"),
  qrCodeController.gerarParaPonto
);

router.post(
  "/gerar-todos",
  auth,
  permitir("adm"),
  qrCodeController.gerarParaTodosPontos
);

export default router;
