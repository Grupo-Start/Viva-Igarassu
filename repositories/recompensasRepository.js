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
  if (!id) {
    const error = new Error("Parâmetro 'id' é obrigatório para buscar recompensa.");
    error.status = 400;
    throw error;
  }

  return await prisma.recompensas.findUnique({
    where: { id_recompensas: String(id) },
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
  if (!id) {
    const error = new Error("Parâmetro 'id' é obrigatório para atualizar recompensa.");
    error.status = 400;
    throw error;
  }

  return await prisma.recompensas.update({
    where: { id_recompensas: String(id) },
    data
  });
}

async function deleteRecompensa(id) {
  if (!id) {
    const error = new Error("Parâmetro 'id' é obrigatório para excluir recompensa.");
    error.status = 400;
    throw error;
  }

  return await prisma.recompensas.delete({
    where: { id_recompensas: String(id) }
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
