import prisma from "../database/prismaClient.js";
import resgatesRepository from "../repositories/resgatesRepository.js";

async function resgatarRecompensa({ id_usuario, role, id_recompensa }) {

  if (role !== "comum") {
    throw {
      status: 403,
      message: "Apenas usuários comuns podem resgatar recompensas"
    };
  }

  const recompensa = await prisma.recompensas.findUnique({
    where: { id_recompensas: String(id_recompensa) }
  });

  if (!recompensa) {
    throw { status: 404, message: "Recompensa não encontrada" };
  }

  if (recompensa.quantidade_disponivel <= 0) {
    throw { status: 400, message: "Recompensa indisponível" };
  }

  const usuario = await prisma.usuarios.findUnique({
    where: { id_usuario }
  });

  if (!usuario) {
    throw { status: 404, message: "Usuário não encontrado" };
  }

  if (usuario.saldo_moedas < recompensa.preco_moedas) {
    throw { status: 400, message: "Saldo insuficiente" };
  }

  const resultado = await prisma.$transaction(async (tx) => {

    await tx.usuarios.update({
      where: { id_usuario },
      data: {
        saldo_moedas: usuario.saldo_moedas - recompensa.preco_moedas
      }
    });

    await tx.recompensas.update({
      where: { id_recompensas: Number(id_recompensa) },
      data: {
        quantidade_disponivel: recompensa.quantidade_disponivel - 1
      }
    });

    return await tx.resgates.create({
      data: {
        id_usuario,
        id_recompensa: String(id_recompensa)
      }
    });
  });

  return {
    message: "Recompensa resgatada com sucesso",
    resgate: resultado
  };
}

async function listarMeusResgates(id_usuario) {
  return resgatesRepository.findByUsuario(id_usuario);
}

export default {
  resgatarRecompensa,
  listarMeusResgates
};
