import prisma from "../database/prismaClient.js";
import userFigurinhaRepository from "../repositories/userFigurinhaRepository.js";

async function visitarViaQr({ token, usuarioId }) {

  const qr = await prisma.qr_codes_pontos.findUnique({
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
    throw new Error("QR Code inválido");
  }

  const ponto = qr.ponto;

  if (!ponto || !ponto.figurinhas) {
    return {
      message: "Ponto visitado com sucesso, mas não possui figurinha associada"
    };
  }

  const figurinha = ponto.figurinhas;

  const jaPossui = await userFigurinhaRepository.findByUsuarioEFigurinha(
    usuarioId,
    figurinha.id_figurinha
  );

  if (jaPossui) {
    return {
      message: "Usuário já possui essa figurinha"
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
    message: "Figurinha conquistada com sucesso!",
    figurinha
  };
}

export default {
  visitarViaQr
};
