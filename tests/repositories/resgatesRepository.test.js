import repo from '../../repositories/resgatesRepository.js';
import prisma from '../../database/prismaClient.js';

jest.mock('../../database/prismaClient.js', () => ({ __esModule: true, default: { resgates: { create: jest.fn(), findMany: jest.fn() } } }));

afterEach(() => jest.clearAllMocks());

test('create calls prisma.resgates.create', async () => {
  prisma.resgates.create.mockResolvedValue({ id_resgate: '1' });
  const res = await repo.create({});
  expect(prisma.resgates.create).toHaveBeenCalled();
  expect(res).toEqual({ id_resgate: '1' });
});
