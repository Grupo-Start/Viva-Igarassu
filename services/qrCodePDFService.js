import QRCode from "qrcode";
import fs from "fs";
import path from "path";
import PDFDocument from "pdfkit";
import prisma from "../database/prismaClient.js";
import qrCodeRepository from "../repositories/qrCodepdfRepository.js";

async function gerarArquivosQr(idPonto) {
  const qr = await qrCodeRepository.findByPontoId(idPonto);

  if (!qr) {
    throw new Error("QR Code não encontrado para este ponto");
  }

  const ponto = await prisma.pontos_turisticos.findUnique({
    where: { id_ponto: qr.id_ponto }
  });

  if (!ponto) {
    throw new Error("Ponto turístico associado não encontrado");
  }

  const url = `${process.env.API_URL}/visitas/qr?token=${qr.token}`;

  const pastaQr = path.resolve("uploads/qrcodes");
  const pastaPdf = path.resolve("uploads/pdfs");

  fs.mkdirSync(pastaQr, { recursive: true });
  fs.mkdirSync(pastaPdf, { recursive: true });

  const nomeQr = `ponto-${idPonto}.png`;
  const nomePdf = `qr-ponto-${idPonto}.pdf`;

  const caminhoQr = path.join(pastaQr, nomeQr);
  const caminhoPdf = path.join(pastaPdf, nomePdf);

  await QRCode.toFile(caminhoQr, url, { width: 400 });

  const doc = new PDFDocument({ size: "A4", margin: 50 });
  doc.pipe(fs.createWriteStream(caminhoPdf));

  // Header with background
  doc.rect(0, 0, doc.page.width, 80).fill('#007bff'); // Blue background
  doc.fill('#ffffff').fontSize(24).text("Viva Igarassu", 0, 25, { align: "center" });
  doc.y = 100; // Move below header

  // Point name
  doc.fill('#000000').fontSize(20).text(ponto.nome, { align: "center" });
  doc.moveDown(1);

  // Instructions
  doc.fontSize(14).text("Bem-vindo! Escaneie o QR Code abaixo para registrar sua visita", { align: "center" });
  doc.text("e ganhar sua figurinha exclusiva no Viva Igarassu.", { align: "center" });
  doc.moveDown(2);

  // QR Code with border
  const qrWidth = 250;
  const qrX = (doc.page.width - qrWidth) / 2;
  const qrY = doc.y;
  doc.rect(qrX - 10, qrY - 10, qrWidth + 20, qrWidth + 20).stroke('#007bff'); // Border
  doc.image(caminhoQr, qrX, qrY, { width: qrWidth });
  doc.y += qrWidth + 20; // Move below image and border
  doc.moveDown(2);

  // Footer
  doc.fontSize(12).text("Para mais informações, visite nosso site ou entre em contato.", { align: "center" });
  doc.text("© 2025 Viva Igarassu - Todos os direitos reservados.", { align: "center" });

  doc.end();

  await qrCodeRepository.updateArquivos(
    qr.id_qr_code,
    `/uploads/qrcodes/${nomeQr}`,
    `/uploads/pdfs/${nomePdf}`
  );

  return {
    imagem: `/uploads/qrcodes/${nomeQr}`,
    pdf: `/uploads/pdfs/${nomePdf}`
  };
}

export default { gerarArquivosQr };
