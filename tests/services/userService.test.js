import userService from '../../services/userService.js';
import prisma from '../../database/prismaClient.js';

jest.mock('../../database/prismaClient.js', () => ({
  __esModule: true,
  default: {
    usuarios: {
      findUnique: jest.fn()
    }
  }
}));

describe('userService.getById', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('returns null when user not found', async () => {
    prisma.usuarios.findUnique.mockResolvedValue(null);
    const res = await userService.getById(123);
    expect(res).toBeNull();
  });

  it('returns user without senha when found', async () => {
    const user = { id_usuario: 1, nome_completo: 'Teste', senha: 'hash' };
    prisma.usuarios.findUnique.mockResolvedValue(user);

    const res = await userService.getById(1);

    expect(res).toEqual({ id_usuario: 1, nome_completo: 'Teste' });
    expect(prisma.usuarios.findUnique).toHaveBeenCalledWith({ where: { id_usuario: 1 } });
  });
});
