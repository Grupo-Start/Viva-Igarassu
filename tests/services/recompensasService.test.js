import service from '../../services/recompensasService.js';
import recompensasRepository from '../../repositories/recompensasRepository.js';

jest.mock('../../repositories/recompensasRepository.js', () => ({
  __esModule: true,
  default: {
    findAllByEmpresa: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    updateImagem: jest.fn()
  }
}));

describe('recompensasService', () => {
  afterEach(() => jest.clearAllMocks());

  it('getById throws when not found', async () => {
    recompensasRepository.findById.mockResolvedValue(null);
    await expect(service.getById('x')).rejects.toThrow('Recompensa não encontrada');
  });

  it('create validates required fields', async () => {
    await expect(service.create({ nome: 'X' })).rejects.toThrow();
  });

  it('create validates numeric fields and calls repository', async () => {
    const data = { nome: 'R', preco_moedas: '10', id_empresa: '5', quantidade_disponivel: '2' };
    recompensasRepository.create.mockResolvedValue({ id_recompensa: 7 });

    const res = await service.create(data);
    expect(recompensasRepository.create).toHaveBeenCalledWith(expect.objectContaining({ preco_moedas: 10, quantidade_disponivel: 2 }));
    expect(res).toEqual({ id_recompensa: 7 });
  });
});
