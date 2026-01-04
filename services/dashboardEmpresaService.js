import prisma from "../database/prismaClient.js";
import { buildImageUrl } from "../utils/imageUrl.js";

async function getDashboardEmpresa(id_empresa) {
  const empresa = await prisma.empresa.findUnique({
    where: { id_empresa }
  });

  if (!empresa) {
    const error = new Error("Empresa não encontrada");
    error.status = 404;
    throw error;
  }

  const [
    totalEventos,
    totalRecompensas,
    totalResgates,
    sumResgates
  ] = await Promise.all([
    prisma.eventos.count({ where: { id_empresa } }),
    prisma.recompensas.count({ where: { id_empresa } }),
    prisma.resgates.count({ where: { recompensas: { is: { id_empresa } } } }),
    prisma.resgates.aggregate({
      _sum: { valor_resgatado: true },
      where: { recompensas: { is: { id_empresa } } }
    })
  ]);

  return {
    empresa: {
      id: empresa.id_empresa,
      nome: empresa.nome_empresa
    },
    eventos: totalEventos,
    recompensas_disponiveis: totalRecompensas,
    recompensas_resgatadas: totalResgates,
    total_moedas_resgatadas: (sumResgates && sumResgates._sum && sumResgates._sum.valor_resgatado) || 0
  };
}

async function getResgatesRecentes(id_empresa, limit = 10) {
  const resgates = await prisma.resgates.findMany({
    where: { recompensas: { is: { id_empresa } } },
    include: {
      recompensas: true,
      usuarios: true
    },
    orderBy: { data_resgate: 'desc' },
    take: limit
  });

  return resgates.map(r => ({
    id_resgate: r.id_resgates,
    usuario: r.usuarios ? r.usuarios.nome_completo : null,
    valor: r.valor_resgatado,
    codigo: r.id_resgates ? r.id_resgates.slice(0, 6).toUpperCase() : null,
    data_resgate: r.data_resgate,
    recompensa: r.recompensas ? {
      id: r.recompensas.id_recompensas,
      nome: r.recompensas.nome,
      imagem: buildImageUrl(r.recompensas.imagem_path)
    } : null
  }));
}

async function getRecompensasPorEmpresa(id_empresa) {
  const recompensas = await prisma.recompensas.findMany({
    where: { id_empresa },
    include: {
      _count: {
        select: { resgates: true }
      }
    }
  });

  return recompensas.map(r => ({
    id: r.id_recompensas,
    nome: r.nome,
    quantidade_disponivel: r.quantidade_disponivel ?? 0,
    preco_moedas: r.preco_moedas ?? 0,
    imagem: buildImageUrl(r.imagem_path),
    total_resgates: r._count ? r._count.resgates : 0
  }));
}

export default {
  getDashboardEmpresa,
  getResgatesRecentes,
  getRecompensasPorEmpresa
};
