import figurinhasService from '../../services/figurinhasService.js';

jest.mock('../../repositories/figurinhasRepository.js', () => ({
  createFigurinha: jest.fn().mockResolvedValue({ id: 'f1' }),
  findAllFigurinha: jest.fn().mockResolvedValue([]),
  findById: jest.fn().mockResolvedValue(null),
  update: jest.fn().mockResolvedValue({}),
  remove: jest.fn().mockResolvedValue({})
}));

describe('figurinhasService', () => {
  test('findById throws when not found', async () => {
    await expect(figurinhasService.findById('nope')).rejects.toThrow('Figurinha não encontrada');
  });

  test('createFigurinha and findAll smoke', async () => {
    const created = await figurinhasService.createFigurinha({ name: 'x' });
    expect(created).toHaveProperty('id');
    const all = await figurinhasService.findAllFigurinha();
    expect(Array.isArray(all)).toBe(true);
  });
});
