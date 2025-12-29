import repo from '../../repositories/enderecosRepository.js';
import prisma from '../../database/prismaClient.js';

jest.mock('../../database/prismaClient.js', () => ({ __esModule: true, default: { enderecos: { create: jest.fn(), findUnique: jest.fn() } } }));

afterEach(() => jest.clearAllMocks());

test('create calls prisma.enderecos.create', async () => {
  prisma.enderecos.create.mockResolvedValue({ id_endereco: '1' });
  const res = await repo.create({});
  expect(prisma.enderecos.create).toHaveBeenCalled();
  expect(res).toEqual({ id_endereco: '1' });
});

test('findById calls prisma.enderecos.findUnique with string id', async () => {
  prisma.enderecos.findUnique.mockResolvedValue({ id_endereco: '2' });
  const res = await repo.findById(2);
  expect(prisma.enderecos.findUnique).toHaveBeenCalledWith(expect.objectContaining({ where: { id_endereco: '2' } }));
  expect(res).toEqual({ id_endereco: '2' });
});
