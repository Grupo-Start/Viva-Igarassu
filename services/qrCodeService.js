import QRCode from "qrcode";
import crypto from "crypto";
import prisma from "../database/prismaClient.js";
import fs from "fs";
import path from "path";
import PDFDocument from "pdfkit";

async function criarQrCode(idPonto) {

  const ponto = await prisma.pontos_turisticos.findUnique({
    where: { id_ponto: idPonto }
  });

  if (!ponto) {
    throw new Error("Ponto turístico não encontrado");
  }

  const qrExistente = await prisma.qr_codes_pontos.findFirst({
    where: { id_ponto: idPonto }
  });

  if (qrExistente) {
    return {
      message: "Este ponto já possui QR Code",
      token: qrExistente.token,
      imagem: `${process.env.API_URL}${qrExistente.imagem_path}`,
      pdf: `${process.env.API_URL}${qrExistente.pdf_path}`
    };
  }

  const token = crypto.randomBytes(16).toString("hex");
  const url = `${process.env.API_URL}/visitas/qr?token=${token}`;

  const pastaQr = path.resolve("uploads/qrcodes");
  const pastaPdf = path.resolve("uploads/pdfs");

  fs.mkdirSync(pastaQr, { recursive: true });
  fs.mkdirSync(pastaPdf, { recursive: true });

  const nomeQr = `ponto-${idPonto}.png`;
  const caminhoQr = path.join(pastaQr, nomeQr);

  await QRCode.toFile(caminhoQr, url, {
    width: 400,
    margin: 2
  });

  const nomePdf = `qr-ponto-${idPonto}.pdf`;
  const caminhoPdf = path.join(pastaPdf, nomePdf);

  await new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: "A4", margin: 50 });
    const writeStream = fs.createWriteStream(caminhoPdf);
    doc.pipe(writeStream);

    doc.fontSize(22).text("Viva Igarassu", { align: "center" }).moveDown(1);
    doc.fontSize(18).text(ponto.nome, { align: "center" }).moveDown(2);

    const pageWidth = doc.page.width;
    const imageWidth = 300;

    doc.image(caminhoQr, (pageWidth - imageWidth) / 2, doc.y, {
      width: imageWidth
    });

    doc.moveDown(2);
    doc.fontSize(14).text(
      "Escaneie este QR Code para registrar sua visita\ne ganhar sua figurinha no Viva Igarassu",
      { align: "center" }
    );

    doc.end();

    writeStream.on('finish', resolve);
    writeStream.on('error', reject);
  });

  const qr = await prisma.qr_codes_pontos.create({
    data: {
      token,
      id_ponto: idPonto,
      imagem_path: `/uploads/qrcodes/${nomeQr}`,
      pdf_path: `/uploads/pdfs/${nomePdf}`
    }
  });

  return {
    id_qr_code: qr.id_qr_code,
    token,
    url,
    imagem: `${process.env.API_URL}${qr.imagem_path}`,
    pdf: `${process.env.API_URL}${qr.pdf_path}`
  };
}

export default { criarQrCode };
