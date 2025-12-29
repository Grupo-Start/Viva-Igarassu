import userFigurinhaRepository from '../../repositories/userFigurinhaRepository.js';

jest.mock('../../database/prismaClient.js', () => ({
  usuario_figurinhas: {
    create: jest.fn().mockResolvedValue({ id: 'u1' }),
    findFirst: jest.fn().mockResolvedValue(null),
    findMany: jest.fn().mockResolvedValue([{ id_figurinha: '1' }])
  }
}));

describe('userFigurinhaRepository', () => {
  test('create proxies to prisma', async () => {
    const r = await userFigurinhaRepository.create('u','f');
    expect(r).toHaveProperty('id');
  });

  test('findByUsuarioEFigurinha returns null when not found', async () => {
    const f = await userFigurinhaRepository.findByUsuarioEFigurinha('u','f');
    expect(f).toBeNull();
  });
});

