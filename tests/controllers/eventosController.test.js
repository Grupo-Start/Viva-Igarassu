jest.mock('../../services/eventosService.js', () => ({ getAll: jest.fn().mockResolvedValue([]), create: jest.fn().mockResolvedValue({}) }));

import controller from '../../controllers/eventosController.js';

describe('eventosController (stubs)', () => {
  test('getAll returns 200', async () => {
    const req = {};
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    await controller.getAll(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test('deleteEvento without id returns 400', async () => {
    const req = { params: {} , userId: 'u' };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    await controller.delete(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });
});
import eventosController from '../../controllers/eventosController.js';
import eventosService from '../../services/eventosService.js';
import empresaRepository from '../../repositories/empresaRepository.js';

jest.mock('../../services/eventosService.js', () => ({ __esModule: true, default: { getAll: jest.fn(), getById: jest.fn(), create: jest.fn(), update: jest.fn(), delete: jest.fn() } }));
jest.mock('../../repositories/empresaRepository.js', () => ({ __esModule: true, default: { findById: jest.fn(), findByUserId: jest.fn(), findByName: jest.fn(), create: jest.fn() } }));

describe('eventosController', () => {
  afterEach(() => jest.clearAllMocks());

  it('getAll returns eventos', async () => {
    const req = {};
    eventosService.getAll.mockResolvedValue([{ id_evento: 1 }]);
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await eventosController.getAll(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('create will call eventosService.create and return 201', async () => {
    const req = { body: { nome: 'X' }, userId: 1 };
    empresaRepository.findByUserId.mockResolvedValue({ id_empresa: 7 });
    eventosService.create.mockResolvedValue({ id_evento: 2 });
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await eventosController.create(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
  });
});
