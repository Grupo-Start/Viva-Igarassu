import prisma from "../database/prismaClient.js";

async function create(data) {
  return await prisma.enderecos.create({
    data,
  });
}

async function findById(id) {
  return await prisma.enderecos.findUnique({
    where: { id_endereco: String(id) },
  });
}

export default {
  create,
  findById,
};
