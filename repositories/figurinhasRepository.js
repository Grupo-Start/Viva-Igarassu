import prisma from "../database/prismaClient.js";

async function createFigurinha(data) {
  return prisma.figurinhas.create({
    data
  });
}

async function findAllFigurinha() {
  return prisma.figurinhas.findMany({
    orderBy: {
      data_cadastro: "desc"
    }
  });
}

async function findById(id) {
  return prisma.figurinhas.findUnique({
    where: {
      id_figurinha: id
    }
  });
}

async function updateFigurinha(id, dados) {
  return prisma.figurinhas.update({
    where: {
      id_figurinha: id
    },
    data: dados
  });
}

async function removeFigurinha(id) {
  return prisma.figurinhas.delete({
    where: {
      id_figurinha: id
    }
  });
}

export default {
  createFigurinha,
  findAllFigurinha,
  findById,
  updateFigurinha,
  removeFigurinha
};
