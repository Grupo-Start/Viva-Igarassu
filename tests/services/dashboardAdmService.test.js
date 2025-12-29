import dashboardAdmService from '../../services/dashboardAdmService.js';

jest.mock('../../database/prismaClient.js', () => ({
  usuarios: { count: jest.fn().mockResolvedValue(2) },
  empresa: { count: jest.fn().mockResolvedValue(3) },
  eventos: { count: jest.fn().mockResolvedValue(4) },
  pontos_turisticos: { count: jest.fn().mockResolvedValue(5), findMany: jest.fn().mockResolvedValue([]) },
  figurinhas: { count: jest.fn().mockResolvedValue(6) },
  recompensas: { count: jest.fn().mockResolvedValue(7) },
  resgates: { count: jest.fn().mockResolvedValue(1), aggregate: jest.fn().mockResolvedValue({ _sum: { valor_resgatado: 100 } }) },
  usuario_figurinhas: { count: jest.fn().mockResolvedValue(10), findMany: jest.fn().mockResolvedValue([]) }
}));

describe('dashboardAdmService (smoke)', () => {
  test('dashboardAdmin returns aggregated numbers', async () => {
    const res = await dashboardAdmService.dashboardAdmin();
    expect(res).toHaveProperty('usuarios', 2);
    expect(res).toHaveProperty('empresas', 3);
    expect(res).toHaveProperty('total_moedas_resgatadas', 100);
  });

  test('getVisitasPorPeriodo returns array for period', async () => {
    const arr = await dashboardAdmService.getVisitasPorPeriodo(1);
    expect(Array.isArray(arr)).toBe(true);
  });
});
