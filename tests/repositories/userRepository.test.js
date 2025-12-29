import repo from '../../repositories/userRepository.js';
import prisma from '../../database/prismaClient.js';

jest.mock('../../database/prismaClient.js', () => ({
  __esModule: true,
  default: {
    usuarios: {
      findUnique: jest.fn(),
      update: jest.fn()
    }
  }
}));

afterEach(() => jest.clearAllMocks());

test('findById calls prisma.usuarios.findUnique and returns selected fields', async () => {
  prisma.usuarios.findUnique.mockResolvedValue({ id_usuario: '1', nome_completo: 'A' });
  const res = await repo.findById('1');
  expect(prisma.usuarios.findUnique).toHaveBeenCalledWith(expect.objectContaining({ where: { id_usuario: '1' } }));
  expect(res).toEqual({ id_usuario: '1', nome_completo: 'A' });
});

test('updateMe calls prisma.usuarios.update and returns updated', async () => {
  prisma.usuarios.update.mockResolvedValue({ id_usuario: '1', nome_completo: 'B' });
  const res = await repo.updateMe('1', { nome_completo: 'B' });
  expect(prisma.usuarios.update).toHaveBeenCalledWith(expect.objectContaining({ where: { id_usuario: '1' } }));
  expect(res).toEqual({ id_usuario: '1', nome_completo: 'B' });
});
