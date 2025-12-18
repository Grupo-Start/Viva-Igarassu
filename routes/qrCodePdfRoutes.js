import { Router } from "express";
import qrCodePdfController from "../controllers/qrCodePdfController.js";
import auth from "../middleware/auth.js";
import { permitir } from "../middleware/roles.js";

const router = Router();

router.post(
  "/:idPonto/gerar-arquivos",
  auth,
  permitir("adm"),
  qrCodePdfController.gerarArquivosQr
);

export default router;
