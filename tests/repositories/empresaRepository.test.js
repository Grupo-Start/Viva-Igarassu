import repo from '../../repositories/empresaRepository.js';
import prisma from '../../database/prismaClient.js';

jest.mock('../../database/prismaClient.js', () => ({
  __esModule: true,
  default: {
    empresa: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      findFirst: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn()
    },
    eventos: {
      count: jest.fn(),
      findMany: jest.fn()
    }
  }
}));

afterEach(() => jest.clearAllMocks());

test('findAll calls prisma.empresa.findMany and returns result', async () => {
  prisma.empresa.findMany.mockResolvedValue([{ id_empresa: '1' }]);
  const res = await repo.findAll();
  expect(prisma.empresa.findMany).toHaveBeenCalled();
  expect(res).toEqual([{ id_empresa: '1' }]);
});

test('findById calls prisma.empresa.findUnique with string id', async () => {
  prisma.empresa.findUnique.mockResolvedValue({ id_empresa: '2' });
  const res = await repo.findById(2);
  expect(prisma.empresa.findUnique).toHaveBeenCalledWith(expect.objectContaining({ where: { id_empresa: '2' } }));
  expect(res).toEqual({ id_empresa: '2' });
});

test('countEventosByEmpresaByMonth aggregates months correctly', async () => {
  const d1 = new Date(2025, 0, 5);
  const d2 = new Date(2025, 1, 10);
  prisma.eventos.findMany.mockResolvedValue([{ data: d1 }, { data: d2 }, { data: d2 }]);
  const counts = await repo.countEventosByEmpresaByMonth('1', 2025);
  expect(counts[0]).toBe(1);
  expect(counts[1]).toBe(2);
});
