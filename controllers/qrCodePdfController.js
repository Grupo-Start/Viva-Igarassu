import qrCodePdfService from "../services/qrCodePDFService.js";

async function gerarArquivosQr(req, res) {
  try {
    const { idPonto } = req.params;

    const result = await qrCodePdfService.gerarArquivosQr(idPonto);

    return res.status(201).json(result);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

export default {
  gerarArquivosQr
};
