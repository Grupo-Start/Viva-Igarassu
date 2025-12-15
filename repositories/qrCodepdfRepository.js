import prisma from "../database/prismaClient.js";

async function findByPontoId(idPonto) {
  return prisma.qr_codes_pontos.findFirst({
    where: { id_ponto: idPonto },
    include: { ponto: true }
  });
}

async function updateArquivos(idQrCode, imagemPath, pdfPath) {
  return prisma.qr_codes_pontos.update({
    where: { id_qr_code: idQrCode },
    data: {
      imagem_path: imagemPath,
      pdf_path: pdfPath
    }
  });
}

export default {
  findByPontoId,
  updateArquivos
};
