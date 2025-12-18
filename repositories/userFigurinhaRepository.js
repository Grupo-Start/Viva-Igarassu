import prisma from "../database/prismaClient.js";

async function create(idUsuario, idFigurinha) {
  return prisma.usuario_figurinhas.create({
    data: {
      usuarios: {
        connect: { id_usuario: idUsuario }
      },
      figurinhas: {
        connect: { id_figurinha: idFigurinha }
      }
    }
  });
}

async function findByUsuarioEFigurinha(idUsuario, idFigurinha) {
  return prisma.usuario_figurinhas.findFirst({
    where: {
      id_usuario: idUsuario,
      id_figurinha: idFigurinha
    }
  });
}

async function findAllByUsuario(usuarioId) {
  return prisma.usuario_figurinhas.findMany({
    where: {
      id_usuario: usuarioId
    },
    select: {
      id_figurinha: true,
      conquistada_em: true
    }
  });
}


export default {
  create,
  findByUsuarioEFigurinha,
  findAllByUsuario
};
