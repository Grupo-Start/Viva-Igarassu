import prisma from "../database/prismaClient.js";


async function findById(id) {
    return prisma.usuarios.findUnique({
        where: { id_usuario: id },
        select: {
            id_usuario: true,
            nome_completo: true,
            email: true,
            saldo_moedas: true,
            data_cadastro: true,
            preferencia: true,
            role: true
        }
    });
    };


async function updateMe(id, dados) {
  return await prisma.usuarios.update({
    where: { id_usuario: id },
    data: dados
  });
};

export default {
  findById,
  updateMe
};
