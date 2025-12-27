import prisma from "../database/prismaClient.js";

async function dashboardAdmin() {
  const [
    totalUsuarios,
    totalEmpresas,
    totalEventos,
    totalPontos,
    totalFigurinhas,
    totalRecompensas,
    totalResgates,
    sumResgates,
    totalVisitas
  ] = await Promise.all([
    prisma.usuarios.count(),
    prisma.empresa.count(),
    prisma.eventos.count(),
    prisma.pontos_turisticos.count(),
    prisma.figurinhas.count(),
    prisma.recompensas.count(),
    prisma.resgates.count(),
    prisma.resgates.aggregate({ _sum: { valor_resgatado: true } }),
    prisma.usuario_figurinhas.count()
  ]);

  return {
    usuarios: totalUsuarios,
    empresas: totalEmpresas,
    eventos: totalEventos,
    pontos_turisticos: totalPontos,
    figurinhas: totalFigurinhas,
    recompensas_disponiveis: totalRecompensas,
    recompensas_resgatadas: totalResgates,
    total_moedas_resgatadas: sumResgates._sum.valor_resgatado || 0,
    total_visitas: totalVisitas
  };
}

async function getVisitasPorPonto() {
  const pontos = await prisma.pontos_turisticos.findMany({
    include: {
      figurinhas: {
        include: {
          usuario_figurinhas: {
            select: {
              id_usuario_figurinha: true
            }
          }
        }
      }
    }
  });

  const visitasPorPonto = pontos.map(ponto => ({
    ponto_id: ponto.id_ponto,
    ponto_nome: ponto.nome,
    figurinha_nome: ponto.figurinhas?.nome || 'Sem figurinha',
    total_visitas: ponto.figurinhas?.usuario_figurinhas?.length || 0
  }));

  return visitasPorPonto.sort((a, b) => b.total_visitas - a.total_visitas);
}

async function getVisitasPorPeriodo(dias = 30) {
  const dataInicio = new Date();
  dataInicio.setDate(dataInicio.getDate() - (dias - 1));
  dataInicio.setHours(0, 0, 0, 0);

  const dataFim = new Date();
  dataFim.setHours(23, 59, 59, 999);

  const visitas = await prisma.usuario_figurinhas.findMany({
    where: {
      conquistada_em: {
        gte: dataInicio,
        lte: dataFim
      }
    },
    select: {
      conquistada_em: true
    },
    orderBy: {
      conquistada_em: 'asc'
    }
  });

  const visitasPorDia = {};
  for (let i = 0; i < dias; i++) {
    const data = new Date(dataInicio);
    data.setDate(data.getDate() + i);
    const dataStr = data.toISOString().split('T')[0];
    visitasPorDia[dataStr] = 0;
  }
  visitas.forEach(v => {
    if (v.conquistada_em) {
      const data = v.conquistada_em.toISOString().split('T')[0];
      if (visitasPorDia.hasOwnProperty(data)) {
        visitasPorDia[data]++;
      }
    }
  });

  return Object.entries(visitasPorDia)
    .map(([data, total]) => ({
      data,
      total_visitas: total
    }))
    .sort((a, b) => a.data.localeCompare(b.data));
}

export default {
  dashboardAdmin,
  getVisitasPorPonto,
  getVisitasPorPeriodo
};
