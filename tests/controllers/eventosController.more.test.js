jest.mock('../../services/eventosService.js', () => ({ __esModule: true, default: { getAll: jest.fn(), getById: jest.fn(), create: jest.fn(), update: jest.fn(), delete: jest.fn() } }));
jest.mock('../../repositories/empresaRepository.js', () => ({ __esModule: true, default: { findById: jest.fn(), findByName: jest.fn(), create: jest.fn(), findByUserId: jest.fn() } }));

import controller from '../../controllers/eventosController.js';
import eventosService from '../../services/eventosService.js';
import empresaRepository from '../../repositories/empresaRepository.js';

function resMock() { const r = {}; r.status = jest.fn().mockReturnValue(r); r.json = jest.fn().mockReturnValue(r); return r; }

describe('eventosController deeper', () => {
  afterEach(() => jest.clearAllMocks());

  test('create creates empresa when adm and none exists', async () => {
    const req = { body: {}, userId: 'u1', role: 'adm' };
    const res = resMock();

    empresaRepository.findById.mockResolvedValue(null);
    empresaRepository.findByName.mockResolvedValue(null);
    empresaRepository.create.mockResolvedValue({ id_empresa: 'e1' });
    eventosService.create.mockResolvedValue({ id: 'ev1' });

    await controller.create(req, res);

    expect(empresaRepository.create).toHaveBeenCalled();
    expect(eventosService.create).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
  });

  test('delete returns 400 when id missing', async () => {
    const req = { params: {} };
    const res = resMock();
    await controller.delete(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });
});
