import prisma from "../database/prismaClient.js";
import { buildImageUrl } from "../utils/imageUrl.js";

async function getDashboardUsuario(userId) {
  const usuario = await prisma.usuarios.findUnique({
    where: { id_usuario: userId },
    select: {
      nome_completo: true,
      saldo_moedas: true
    }
  });

  if (!usuario) {
    throw { status: 404, message: "Usuário não encontrado" };
  }

  const totalFigurinhas = await prisma.usuario_figurinhas.count({
    where: { id_usuario: userId }
  });

  const resgates = await prisma.resgates.findMany({
    where: { id_usuario: userId },
    include: {
      recompensas: {
        include: {
          empresa: true
        }
      }
    },
    orderBy: {
      data_resgate: "desc"
    }
  });

  const recompensasResgatadas = resgates.map((r) => ({
    id_resgate: r.id_resgates,
    nome: r.recompensas.nome,
    empresa: r.recompensas.empresa.nome_empresa,
    valor: r.valor_resgatado,
    codigo: r.id_resgates.slice(0, 6).toUpperCase(),
    data_resgate: r.data_resgate,
    imagem: buildImageUrl(r.recompensas.imagem_path)
  }));

  return {
    usuario: {
      nome: usuario.nome_completo,
      saldo: usuario.saldo_moedas ?? 0
    },
    figurinhas: {
      total_conquistadas: totalFigurinhas
    },
    recompensas_resgatadas: recompensasResgatadas
  };
}

export default { getDashboardUsuario };
