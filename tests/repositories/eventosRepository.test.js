jest.mock('../../database/prismaClient.js', () => ({
  eventos: {
    findMany: jest.fn().mockResolvedValue(['e1','e2']),
    findUnique: jest.fn().mockResolvedValue({ id_evento: '1' }),
    create: jest.fn().mockResolvedValue({ id_evento: 'created' }),
    update: jest.fn().mockResolvedValue({ id_evento: 'updated' }),
    delete: jest.fn().mockResolvedValue({ id_evento: 'deleted' })
  }
}));

describe('eventosRepository', () => {
  beforeEach(() => jest.resetModules());

  test('findAll returns list', async () => {
    const mod = await import('../../repositories/eventosRepository.js');
    const repo = mod.default;
    const res = await repo.findAll();
    expect(Array.isArray(res)).toBe(true);
  });

  test('findByEmpresaId throws when missing id', async () => {
    const mod = await import('../../repositories/eventosRepository.js');
    const repo = mod.default;
    await expect(repo.findByEmpresaId()).rejects.toThrow("Parâmetro 'id_empresa'");
  });

  test('findById throws when missing id', async () => {
    const mod = await import('../../repositories/eventosRepository.js');
    const repo = mod.default;
    await expect(repo.findById()).rejects.toThrow("Parâmetro 'id'");
  });

  test('create, update and delete proxy to prisma', async () => {
    const mod = await import('../../repositories/eventosRepository.js');
    const repo = mod.default;
    const created = await repo.create({ nome: 'x' });
    expect(created).toEqual({ id_evento: 'created' });
    const updated = await repo.update('1', { nome: 'y' });
    expect(updated).toEqual({ id_evento: 'updated' });
    const deleted = await repo.delete('1');
    expect(deleted).toEqual({ id_evento: 'deleted' });
  });
});
