import userService from '../../services/userService.js';
import prisma from '../../database/prismaClient.js';

jest.mock('../../database/prismaClient.js', () => ({
  __esModule: true,
  default: {
    usuarios: { findMany: jest.fn() }
  }
}));

describe('userService.getAllUsers', () => {
  afterEach(() => jest.clearAllMocks());

  it('returns list of users', async () => {
    const users = [
      { id_usuario: 1, nome_completo: 'A', email: 'a@a.com', role: 'comum' },
      { id_usuario: 2, nome_completo: 'B', email: 'b@b.com', role: 'adm' }
    ];

    prisma.usuarios.findMany.mockResolvedValue(users);

    const res = await userService.getAllUsers();

    expect(res).toEqual(users);
    expect(prisma.usuarios.findMany).toHaveBeenCalledWith({
      select: {
        id_usuario: true,
        nome_completo: true,
        email: true,
        role: true,
        preferencia: true,
        data_cadastro: true,
        saldo_moedas: true
      },
      orderBy: { data_cadastro: 'desc' }
    });
  });
});
