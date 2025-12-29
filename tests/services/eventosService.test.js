import service from '../../services/eventosService.js';
import eventosRepository from '../../repositories/eventosRepository.js';
import enderecosRepository from '../../repositories/enderecosRepository.js';

jest.mock('../../repositories/eventosRepository.js', () => ({
  __esModule: true,
  default: {
    findAll: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn()
  }
}));

jest.mock('../../repositories/enderecosRepository.js', () => ({
  __esModule: true,
  default: { create: jest.fn() }
}));

describe('eventosService', () => {
  afterEach(() => jest.clearAllMocks());

  it('getById throws 404 when not found', async () => {
    eventosRepository.findById.mockResolvedValue(null);
    await expect(service.getById('x')).rejects.toMatchObject({ status: 404 });
  });

  it('create throws when required fields missing', async () => {
    await expect(service.create({ nome: 'n' })).rejects.toMatchObject({ status: 400 });
  });

  it('create with endereco_completo parses and calls endereco repository', async () => {
    const data = {
      nome: 'E',
      data: '2025-12-31',
      id_empresa: '5',
      endereco_completo: 'Rua A 1, Bairro, Cidade, ST, 12345-678'
    };

    enderecosRepository.create.mockResolvedValue({ id_endereco: '99' });
    eventosRepository.create.mockResolvedValue({ id_evento: 2 });

    const res = await service.create(data);
    expect(enderecosRepository.create).toHaveBeenCalled();
    expect(eventosRepository.create).toHaveBeenCalled();
    expect(res).toEqual({ id_evento: 2 });
  });

  it('deleteEvento allows adm to delete', async () => {
    const evento = { id_evento: '1', id_empresa: '2' };
    eventosRepository.findById.mockResolvedValue(evento);
    eventosRepository.delete.mockResolvedValue({ ok: true });

    const res = await service.delete('1', { role: 'adm' });
    expect(res).toEqual({ ok: true });
  });

  it('deleteEvento forbids user without same empresa', async () => {
    const evento = { id_evento: '1', id_empresa: '2' };
    eventosRepository.findById.mockResolvedValue(evento);

    await expect(service.delete('1', { role: 'comum', id_empresa: '3' })).rejects.toMatchObject({ status: 403 });
  });
});
