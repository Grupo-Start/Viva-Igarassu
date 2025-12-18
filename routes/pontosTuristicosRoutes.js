import express from "express";
import pontosController from "../controllers/pontosTuristicosController.js";
import qrCodeController from "../controllers/qrCodeController.js";
import auth from "../middleware/auth.js";
import { permitir } from "../middleware/roles.js";

const router = express.Router();

router.get("/", pontosController.listarPublico);

router.post(
  "/",
  auth,
  permitir("adm"),
  pontosController.criarPonto
);

router.put(
  "/:id",
  auth,
  permitir("adm"),
  pontosController.atualizarPonto
);

router.delete(
  "/:id",
  auth,
  permitir("adm"),
  pontosController.deletarPonto
);

router.post(
  "/:id/qrcode",
  auth,
  permitir("adm"),
  qrCodeController.gerarParaPonto
);

export default router;


