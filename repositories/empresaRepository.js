import prisma from "../database/prismaClient.js";


async function findAll() {
  return await prisma.empresa.findMany({
    include: {
      usuarios: true,
    },
  });
}

async function findById(id) {
  return await prisma.empresa.findUnique({
    where: { id_empresa: String(id) },
    include: {
      usuarios: true,
    },
  });
}

async function create(data) {
  return await prisma.empresa.create({
    data,
  });
}

async function update(id, data) {
  return await prisma.empresa.update({
    where: { id_empresa: String(id) },
    data,
  });
}

async function deleteEmpresa(id) {
  return await prisma.empresa.delete({
    where: { id_empresa: String(id) },
  });
}

export default {
  findAll,
  findById,
  create,
  update,
  delete: deleteEmpresa
};
