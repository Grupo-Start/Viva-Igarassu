import minhasFigurinhasService from '../../services/minhasFigurinhasService.js';

jest.mock('../../repositories/figurinhasRepository.js', () => ({ findAllFigurinha: jest.fn().mockResolvedValue([{ id_figurinha: '1', nome: 'A' }]) }));

jest.mock('../../repositories/userFigurinhaRepository.js', () => ({ findAllByUsuario: jest.fn().mockResolvedValue([{ id_figurinha: '1' }]) }));

describe('minhasFigurinhasService', () => {
  test('listarPorUsuario returns totals and conquistadas', async () => {
    const res = await minhasFigurinhasService.listarPorUsuario('u1');
    expect(res).toHaveProperty('total');
    expect(res).toHaveProperty('conquistadas');
    expect(Array.isArray(res.figurinhas)).toBe(true);
  });
});
