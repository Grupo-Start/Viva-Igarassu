import prisma from "../database/prismaClient.js";

async function criar({ token, id_ponto }) {
  return prisma.qr_codes_pontos.create({
    data: {
      token,
      id_ponto
    }
  });
}

async function findByToken(token) {
  return prisma.qr_codes_pontos.findUnique({
    where: { token },
    include: {
      ponto: true
    }
  });
}

async function findByPontoId(id_ponto) {
  return prisma.qr_codes_pontos.findFirst({
    where: { id_ponto }
  });
}

export default {
  criar,
  findByToken,
  findByPontoId
};
