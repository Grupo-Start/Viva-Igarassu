jest.mock('../../database/prismaClient.js', () => ({
  figurinhas: {
    create: jest.fn().mockResolvedValue({ id_figurinha: 'f1' }),
    findMany: jest.fn().mockResolvedValue([{ id_figurinha: 'f1' }]),
    findUnique: jest.fn().mockResolvedValue(null),
    update: jest.fn().mockResolvedValue({}),
    delete: jest.fn().mockResolvedValue({})
  }
}));

describe('figurinhasRepository', () => {
  beforeEach(() => jest.resetModules());

  test('create and findAll', async () => {
    const mod = await import('../../repositories/figurinhasRepository.js');
    const repo = mod.default;
    const c = await repo.createFigurinha({ nome: 'A' });
    expect(c).toHaveProperty('id_figurinha');
    const all = await repo.findAllFigurinha();
    expect(Array.isArray(all)).toBe(true);
  });

  test('findById returns null when not found', async () => {
    const mod = await import('../../repositories/figurinhasRepository.js');
    const repo = mod.default;
    const f = await repo.findById('no');
    expect(f).toBeNull();
  });
});

