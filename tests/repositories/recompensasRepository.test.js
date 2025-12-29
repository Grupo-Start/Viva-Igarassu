jest.mock('../../database/prismaClient.js', () => ({
  recompensas: {
    findMany: jest.fn().mockResolvedValue([]),
    findUnique: jest.fn().mockResolvedValue(null),
    create: jest.fn().mockResolvedValue({ id_recompensas: 'r1' }),
    update: jest.fn().mockResolvedValue({}),
    delete: jest.fn().mockResolvedValue({})
  }
}));

describe('recompensasRepository (stubs)', () => {
  beforeEach(() => jest.resetModules());

  test('findAllByEmpresa returns array', async () => {
    const mod = await import('../../repositories/recompensasRepository.js');
    const repo = mod.default;
    const r = await repo.findAllByEmpresa('e1');
    expect(Array.isArray(r)).toBe(true);
  });

  test('findById throws when id missing', async () => {
    const mod = await import('../../repositories/recompensasRepository.js');
    const repo = mod.default;
    await expect(repo.findById()).rejects.toHaveProperty('status', 400);
  });
});
import recompensasRepository from '../../repositories/recompensasRepository.js';

jest.mock('../../database/prismaClient.js', () => ({
  recompensas: {
    findMany: jest.fn().mockResolvedValue([{ id_recompensas: 'r1' }]),
    findUnique: jest.fn().mockResolvedValue({ id_recompensas: 'r1' }),
    create: jest.fn().mockResolvedValue({ id_recompensas: 'r2' }),
    update: jest.fn().mockResolvedValue({}),
    delete: jest.fn().mockResolvedValue({})
  }
}));

describe('recompensasRepository', () => {
  test('findAllByEmpresa proxies to prisma', async () => {
    const r = await recompensasRepository.findAllByEmpresa('e1');
    expect(Array.isArray(r)).toBe(true);
  });

  test('findById throws when missing id', async () => {
    await expect(recompensasRepository.findById()).rejects.toThrow("Parâmetro 'id'");
  });
});

