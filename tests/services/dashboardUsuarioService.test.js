import dashboardUsuarioService from '../../services/dashboardUsuarioService.js';

jest.mock('../../database/prismaClient.js', () => ({
  usuarios: { findUnique: jest.fn().mockResolvedValue({ nome_completo: 'User', saldo_moedas: 10 }) },
  usuario_figurinhas: { count: jest.fn().mockResolvedValue(2) },
  resgates: { findMany: jest.fn().mockResolvedValue([]) }
}));

describe('dashboardUsuarioService', () => {
  test('getDashboardUsuario throws when user not found', async () => {
    const prisma = await import('../../database/prismaClient.js');
    prisma.default.usuarios.findUnique.mockResolvedValueOnce(null);
    await expect(dashboardUsuarioService.getDashboardUsuario('nope')).rejects.toMatchObject({ status: 404 });
  });

  test('getDashboardUsuario returns structure', async () => {
    const res = await dashboardUsuarioService.getDashboardUsuario('u1');
    expect(res).toHaveProperty('usuario');
    expect(res.figurinhas).toHaveProperty('total_conquistadas');
  });
});
