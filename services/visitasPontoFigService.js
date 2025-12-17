import prisma from "../database/prismaClient.js";

async function visitarViaQr({ token, usuarioId, role }) {

  if (role !== "comum") {
    throw {
      status: 403,
      message: "Apenas usuários comuns podem ganhar figurinhas"
    };
  }

  const qr = await prisma.qr_codes_pontos.findFirst({
    where: { token },
    include: {
      ponto: {
        include: {
          figurinhas: true
        }
      }
    }
  });

  if (!qr) {
    throw { status: 404, message: "QR Code inválido" };
  }

  const figurinha = qr.ponto.figurinhas;

  if (!figurinha) {
    throw { status: 404, message: "Ponto sem figurinha vinculada" };
  }

  const jaPossui = await prisma.usuario_figurinhas.findFirst({
    where: {
      id_usuario: usuarioId,
      id_figurinha: figurinha.id_figurinha
    }
  });

  if (jaPossui) {
    throw {
      status: 409,
      message: "Você já possui essa figurinha"
    };
  }

  await prisma.usuario_figurinhas.create({
    data: {
      id_usuario: usuarioId,
      id_figurinha: figurinha.id_figurinha
    }
  });

  await prisma.usuarios.update({
    where: { id_usuario: usuarioId },
    data: {
      saldo_moedas: {
        increment: figurinha.valor_figurinha
      }
    }
  });

  return {
    message: "Parabéns! Figurinha conquistada 🎉",
    figurinha: {
      id: figurinha.id_figurinha,
      nome: figurinha.nome,
      valor: figurinha.valor_figurinha
    }
  };
}

export default {
  visitarViaQr
};
