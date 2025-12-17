import prisma from "../database/prismaClient.js";

async function findAllByEmpresa(id_empresa) {
  return await prisma.recompensas.findMany({
    where: { id_empresa },
    include: {
      empresa: true
    }
  });
}

async function findById(id) {
  return await prisma.recompensas.findUnique({
    where: { id_recompensas: Number(id) },
    include: {
      empresa: true
    }
  });
}

async function create(data) {
  return await prisma.recompensas.create({
    data
  });
}

async function update(id, data) {
  return await prisma.recompensas.update({
    where: { id_recompensas: Number(id) },
    data
  });
}

async function deleteRecompensa(id) {
  return await prisma.recompensas.delete({
    where: { id_recompensas: Number(id) }
  });
}

async function updateImagem(id, imagemPath) {
  return await prisma.recompensas.update({
    where: { id_recompensas: String(id) },
    data: { imagem_path: imagemPath }
  });
}

export default {
  findAllByEmpresa,
  findById,
  create,
  update,
  delete: deleteRecompensa,
  updateImagem
};
