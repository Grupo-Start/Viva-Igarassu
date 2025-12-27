import prisma from "../database/prismaClient.js";

async function findAll() {
  return await prisma.eventos.findMany({
    include: {
      empresa: true,
      enderecos: true,
    },
  });
}

async function findById(id) {
  return await prisma.eventos.findUnique({
    where: { id_evento: Number(id) },
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
  return await prisma.eventos.update({
    where: { id_evento: Number(id) },
    data,
  });
}

async function deleteEvento(id) {
  return await prisma.eventos.delete({
    where: { id_evento: Number(id) },
    include: {
      empresa: true,
      enderecos: true,
    },
  });
}

export default {
  findAll,
  findById,
  create,
  update,
  delete: deleteEvento
};
