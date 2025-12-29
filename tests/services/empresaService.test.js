import service from '../../services/empresaService.js';
import empresaRepository from '../../repositories/empresaRepository.js';
import eventosRepository from '../../repositories/eventosRepository.js';

jest.mock('../../repositories/empresaRepository.js', () => ({
  __esModule: true,
  default: {
    findAll: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    countEventosByEmpresaId: jest.fn(),
    findByUserId: jest.fn(),
    countEventosByEmpresaByMonth: jest.fn()
  }
}));

jest.mock('../../repositories/eventosRepository.js', () => ({ __esModule: true, default: { findByEmpresaId: jest.fn() } }));

describe('empresaService', () => {
  afterEach(() => jest.clearAllMocks());

  it('getById throws 404 when not found', async () => {
    empresaRepository.findById.mockResolvedValue(null);
    await expect(service.getById('x')).rejects.toMatchObject({ status: 404 });
  });

  it('create validates required fields', async () => {
    await expect(service.create({ nome_empresa: 'X' })).rejects.toMatchObject({ status: 400 });
  });

  it('countEventos returns total', async () => {
    empresaRepository.findById.mockResolvedValue({ id_empresa: '1' });
    empresaRepository.countEventosByEmpresaId.mockResolvedValue(5);
    const res = await service.countEventos('1');
    expect(res).toEqual({ total: 5 });
  });

  it('countEventosByUser throws when no empresa for user', async () => {
    empresaRepository.findByUserId.mockResolvedValue(null);
    await expect(service.countEventosByUser('u')).rejects.toMatchObject({ status: 404 });
  });

  it('getMeEventos returns eventos for user empresa', async () => {
    empresaRepository.findByUserId.mockResolvedValue({ id_empresa: '10' });
    eventosRepository.findByEmpresaId.mockResolvedValue([{ id_evento: 2 }]);

    const res = await service.getMeEventos('u');
    expect(res).toEqual([{ id_evento: 2 }]);
  });
});
