import prisma from "../database/prismaClient.js";

async function listarPorUsuario(usuarioId) {
  return prisma.usuario_figurinhas.findMany({
    where: {
      id_usuario: usuarioId
    },
    include: {
      figurinhas: true
    }
  });
}

export default {
  listarPorUsuario
};
