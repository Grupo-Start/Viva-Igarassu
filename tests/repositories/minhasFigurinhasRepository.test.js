import repo from '../../repositories/minhasFigurinhasRepository.js';
import prisma from '../../database/prismaClient.js';

jest.mock('../../database/prismaClient.js', () => ({ __esModule: true, default: { usuario_figurinhas: { findMany: jest.fn() } } }));

afterEach(() => jest.clearAllMocks());

test('listarPorUsuario calls prisma.usuario_figurinhas.findMany', async () => {
  prisma.usuario_figurinhas.findMany.mockResolvedValue([]);
  const res = await repo.listarPorUsuario('u1');
  expect(prisma.usuario_figurinhas.findMany).toHaveBeenCalledWith(expect.objectContaining({ where: { id_usuario: 'u1' } }));
  expect(res).toEqual([]);
});
