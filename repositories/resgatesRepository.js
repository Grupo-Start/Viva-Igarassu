import prisma from "../database/prismaClient.js";

async function create(data) {
  return prisma.resgates.create({
    data
  });
}

async function findByUsuario(id_usuario) {
  return prisma.resgates.findMany({
    where: { id_usuario },
    include: {
      recompensas: true
    },
    orderBy: {
      data_resgate: "desc"
    }
  });
}

export default {
  create,
  findByUsuario
};
