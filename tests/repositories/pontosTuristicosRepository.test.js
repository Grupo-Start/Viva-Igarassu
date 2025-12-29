import repo from '../../repositories/pontosTuristicosRepository.js';
import prisma from '../../database/prismaClient.js';

jest.mock('../../database/prismaClient.js', () => ({
  __esModule: true,
  default: {
    pontos_turisticos: {
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn()
    }
  }
}));

afterEach(() => jest.clearAllMocks());

test('listarTodos calls prisma.pontos_turisticos.findMany', async () => {
  prisma.pontos_turisticos.findMany.mockResolvedValue([]);
  const res = await repo.listarTodos();
  expect(prisma.pontos_turisticos.findMany).toHaveBeenCalled();
  expect(res).toEqual([]);
});

test('deletarPonto returns null when prisma throws P2025', async () => {
  const err = new Error('not found');
  err.code = 'P2025';
  prisma.pontos_turisticos.delete.mockRejectedValue(err);
  const res = await repo.deletarPonto('x');
  expect(res).toBeNull();
});
