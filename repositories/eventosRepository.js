import prisma from "../database/prismaClient.js";

async function findAll() {
  return await prisma.eventos.findMany({
    include: {
      empresa: true,
      enderecos: true,
    },
  });
}

async function findByEmpresaId(id_empresa) {
  if (!id_empresa) {
    const error = new Error("Parâmetro 'id_empresa' é obrigatório para buscar eventos.");
    error.status = 400;
    throw error;
  }

  return await prisma.eventos.findMany({
    where: { id_empresa: String(id_empresa) },
    include: {
      empresa: true,
      enderecos: true,
    },
    orderBy: { data: 'desc' }
  });
}

async function findById(id) {
  if (!id) {
    const error = new Error("Parâmetro 'id' é obrigatório para buscar evento.");
    error.status = 400;
    throw error;
  }

  return await prisma.eventos.findUnique({
    where: { id_evento: String(id) },
    include: {
      empresa: true,
      enderecos: true,
    },
  });
}

async function create(data) {
  return await prisma.eventos.create({
    data,
  });
}

async function update(id, data) {
  if (!id) {
    const error = new Error("Parâmetro 'id' é obrigatório para atualizar evento.");
    error.status = 400;
    throw error;
  }

  return await prisma.eventos.update({
    where: { id_evento: String(id) },
    data,
  });
}

async function deleteEvento(id) {
  if (!id) {
    const error = new Error("Parâmetro 'id' é obrigatório para excluir evento.");
    error.status = 400;
    throw error;
  }

  return await prisma.eventos.delete({
    where: { id_evento: String(id) },
    include: {
      empresa: true,
      enderecos: true,
    },
  });
}

export default {
  findAll,
  findByEmpresaId,
  findById,
  create,
  update,
  delete: deleteEvento
};
