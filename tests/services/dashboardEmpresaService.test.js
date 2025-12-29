import dashboardEmpresaService from '../../services/dashboardEmpresaService.js';

jest.mock('../../database/prismaClient.js', () => ({
  empresa: { findUnique: jest.fn().mockResolvedValue({ id_empresa: 'e1', nome_empresa: 'E1' }) },
  eventos: { count: jest.fn().mockResolvedValue(2) },
  recompensas: { count: jest.fn().mockResolvedValue(3) },
  resgates: { count: jest.fn().mockResolvedValue(1), aggregate: jest.fn().mockResolvedValue({ _sum: { valor_resgatado: 50 } }), findMany: jest.fn().mockResolvedValue([]) }
}));

describe('dashboardEmpresaService', () => {
  test('getDashboardEmpresa throws when not found', async () => {
    const prisma = await import('../../database/prismaClient.js');
    prisma.default.empresa.findUnique.mockResolvedValueOnce(null);
    await expect(dashboardEmpresaService.getDashboardEmpresa('nope')).rejects.toMatchObject({ status: 404 });
  });

  test('getDashboardEmpresa returns aggregated object', async () => {
    const res = await dashboardEmpresaService.getDashboardEmpresa('e1');
    expect(res).toHaveProperty('empresa');
    expect(res.empresa).toHaveProperty('id', 'e1');
    expect(res).toHaveProperty('eventos');
  });
});
