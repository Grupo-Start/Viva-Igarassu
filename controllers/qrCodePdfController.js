import qrCodeService from "../services/qrCodeService.js";
import path from "path";
import fs from "fs";

async function gerarArquivosQr(req, res) {
  try {
    const { id } = req.params;

    const result = await qrCodeService.criarQrCode(id);

    return res.status(201).json(result);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

async function downloadPdf(req, res) {
  try {
    const { id } = req.params;
    const caminhoArquivo = path.resolve(`uploads/pdfs/qr-ponto-${id}.pdf`);

    if (!fs.existsSync(caminhoArquivo)) {
      return res.status(404).json({ message: "Arquivo PDF não encontrado" });
    }

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="qr-ponto-${id}.pdf"`);
    
    const fileStream = fs.createReadStream(caminhoArquivo);
    fileStream.pipe(res);
  } catch (error) {
    console.error('Erro ao baixar PDF:', error);
    return res.status(500).json({ message: "Erro ao baixar PDF" });
  }
}

async function downloadQrCode(req, res) {
  try {
    const { id } = req.params;
    const caminhoArquivo = path.resolve(`uploads/qrcodes/ponto-${id}.png`);

    if (!fs.existsSync(caminhoArquivo)) {
      return res.status(404).json({ message: "Arquivo QR Code não encontrado" });
    }

    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Content-Disposition', `attachment; filename="qrcode-ponto-${id}.png"`);
    
    const fileStream = fs.createReadStream(caminhoArquivo);
    fileStream.pipe(res);
  } catch (error) {
    console.error('Erro ao baixar QR Code:', error);
    return res.status(500).json({ message: "Erro ao baixar QR Code" });
  }
}

export default {
  gerarArquivosQr,
  downloadPdf,
  downloadQrCode
};
