import { Router } from "express";
import qrCodePdfController from "../controllers/qrCodePdfController.js";
import auth from "../middleware/auth.js";
import { permitir } from "../middleware/roles.js";

const router = Router();

router.post(
  "/pontos-turisticos/:id/gerar-arquivos",
  auth,
  permitir("adm"),
  qrCodePdfController.gerarArquivosQr
);

router.get(
  "/pontos-turisticos/:id/download-pdf",
  auth,
  permitir("adm"),
  qrCodePdfController.downloadPdf
);

router.get(
  "/pontos-turisticos/:id/download-qrcode",
  auth,
  permitir("adm"),
  qrCodePdfController.downloadQrCode
);

export default router;
