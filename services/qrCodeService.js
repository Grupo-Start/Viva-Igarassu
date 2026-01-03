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

  let token;
  let qrId;

  if (qrExistente) {
    token = qrExistente.token;
    qrId = qrExistente.id_qr_code;
  } else {
    token = crypto.randomBytes(16).toString("hex");
  }

  const url = `${process.env.FRONT_URL || process.env.API_URL}/visitas/qr?token=${token}`;

  const pastaQr = path.resolve("uploads/qrcodes");
  const pastaPdf = path.resolve("uploads/pdfs");

  fs.mkdirSync(pastaQr, { recursive: true });
  fs.mkdirSync(pastaPdf, { recursive: true });

  const nomeQr = `ponto-${idPonto}.png`;
  const caminhoQr = path.join(pastaQr, nomeQr);

  await QRCode.toFile(caminhoQr, url, {
    width: 400,
    margin: 2,
    errorCorrectionLevel: 'H'
  });

  const nomePdf = `qr-ponto-${idPonto}.pdf`;
  const caminhoPdf = path.join(pastaPdf, nomePdf);

  await new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: "A4", margin: 50 });
    const writeStream = fs.createWriteStream(caminhoPdf);
    doc.pipe(writeStream);

     doc.rect(0, 0, doc.page.width, 140).fill('#003d6b');
    
    
    const logoPath = path.resolve("uploads/logo-viva-igarassu.png");
    if (fs.existsSync(logoPath)) {
      try {
        const logoWidth = 200;
        const logoHeight = 90;
        const pageWidth = doc.page.width;
        doc.image(logoPath, (pageWidth - logoWidth) / 2, 25, {
          width: logoWidth,
          height: logoHeight
        });
      } catch (logoError) {
        console.error('Erro ao adicionar logo no header:', logoError);
        doc.fill('#ffffff').fontSize(20).font('Helvetica')
           .text("viva", 0, 35, { align: "center", width: doc.page.width });
        doc.fontSize(42).font('Helvetica-Bold')
           .text("IGARASSU", 0, 60, { align: "center", width: doc.page.width });
      }
    } else {
      doc.fill('#ffffff').fontSize(20).font('Helvetica')
         .text("viva", 0, 35, { align: "center", width: doc.page.width });
      doc.fontSize(42).font('Helvetica-Bold')
         .text("IGARASSU", 0, 60, { align: "center", width: doc.page.width });
    }
    doc.y = 160;
    doc.fill('#003d6b').fontSize(22).font('Helvetica-Bold')
       .text(ponto.nome, 50, doc.y, { 
         align: "center",
         width: doc.page.width - 100
       });
    doc.moveDown(1.5);

    doc.fill('#000000').fontSize(14).font('Helvetica')
       .text("Escaneie o QR Code abaixo para registrar sua visita", { align: "center" });
    doc.text("e ganhar sua figurinha exclusiva!", { align: "center" });
    doc.moveDown(2);

    const pageWidth = doc.page.width;
    const imageWidth = 280;
    const qrX = (pageWidth - imageWidth) / 2;
    const qrY = doc.y;
    
    doc.rect(qrX - 15, qrY - 15, imageWidth + 30, imageWidth + 30)
       .fill('#f0f0f0');
    doc.rect(qrX - 10, qrY - 10, imageWidth + 20, imageWidth + 20)
       .stroke('#003d6b');
    
    doc.image(caminhoQr, qrX, qrY, { width: imageWidth });
    
    doc.y = qrY + imageWidth + 40;

    doc.fontSize(11).fillColor('#666666')
       .text("Explore Igarassu e colecione todas as figurinhas!", { align: "center" });
    doc.moveDown(0.5);
    doc.fontSize(10)
       .text("© 2025 Viva Igarassu - Todos os direitos reservados", { align: "center" });

    doc.end();

    writeStream.on('finish', resolve);
    writeStream.on('error', reject);
  });

  let qr;
  if (qrId) {
    qr = await prisma.qr_codes_pontos.update({
      where: { id_qr_code: qrId },
      data: {
        imagem_path: `/uploads/qrcodes/${nomeQr}`,
        pdf_path: `/uploads/pdfs/${nomePdf}`
      }
    });
  } else {
    qr = await prisma.qr_codes_pontos.create({
      data: {
        token,
        id_ponto: idPonto,
        imagem_path: `/uploads/qrcodes/${nomeQr}`,
        pdf_path: `/uploads/pdfs/${nomePdf}`
      }
    });
  }

  return {
    id_qr_code: qr.id_qr_code,
    token,
    url,
    imagem: `${process.env.API_URL}${qr.imagem_path}`,
    pdf: `${process.env.API_URL}${qr.pdf_path}`,
    message: qrId ? "QR Code regenerado com sucesso" : "QR Code criado com sucesso"
  };
}

async function criarQrCodesParaTodosPontos() {
  const pontos = await prisma.pontos_turisticos.findMany({
    include: {
      qr_codes: true
    }
  });

  const resultados = [];
  const erros = [];

  for (const ponto of pontos) {
    try {
      const qrResult = await criarQrCode(ponto.id_ponto);
      resultados.push({
        id_ponto: ponto.id_ponto,
        nome: ponto.nome,
        ...qrResult
      });

    } catch (error) {
      erros.push({
        id_ponto: ponto.id_ponto,
        nome: ponto.nome,
        erro: error.message
      });
    }
  }

  return {
    message: `Processamento concluído. ${resultados.length} pontos processados, ${erros.length} erros.`,
    resultados,
    erros
  };
}

export default { criarQrCode, criarQrCodesParaTodosPontos };
