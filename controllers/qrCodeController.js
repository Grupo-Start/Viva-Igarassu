import qrCodeService from "../services/qrCodeService.js";

async function gerarParaPonto(req, res) {

  try {
    const { id } = req.params;

    const resultado = await qrCodeService.criarQrCode(id);

    return res.status(201).json(resultado);

  } catch (error) {
    return res.status(400).json({
      message: error.message || "Erro ao gerar QR Code"
    });
  }
}

async function gerarParaTodosPontos(req, res) {
  try {
    const resultado = await qrCodeService.criarQrCodesParaTodosPontos();
    return res.status(201).json(resultado);
  } catch (error) {
    return res.status(400).json({
      message: error.message || "Erro ao gerar QR Codes"
    });
  }
}

export default {
  gerarParaPonto,
  gerarParaTodosPontos
}