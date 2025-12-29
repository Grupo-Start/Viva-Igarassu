jest.mock('../../services/empresaService.js', () => ({
  getAll: jest.fn().mockResolvedValue([]),
  countEventosByMonth: jest.fn().mockResolvedValue({})
}));

import controller from '../../controllers/empresaController.js';

describe('empresaController (stubs)', () => {
  test('getAll returns 200', async () => {
    const req = {};
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    await controller.getAll(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test('getEventosCountByMonth invalid year returns 400', async () => {
    const req = { params: { id: '1' }, query: { year: 'abc' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    await controller.getEventosCountByMonth(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });
});
import empresaController from '../../controllers/empresaController.js';
import empresaService from '../../services/empresaService.js';

jest.mock('../../services/empresaService.js', () => ({ __esModule: true, default: { getAll: jest.fn(), getById: jest.fn(), create: jest.fn(), update: jest.fn(), delete: jest.fn(), countEventos: jest.fn(), countEventosByUser: jest.fn(), getMeEventos: jest.fn(), countEventosByMonth: jest.fn(), countMeEventosByMonth: jest.fn() } }));

describe('empresaController', () => {
  afterEach(() => jest.clearAllMocks());

  it('getAll returns 200 with empresas', async () => {
    const req = {};
    const empresas = [{ id_empresa: 1 }];
    empresaService.getAll.mockResolvedValue(empresas);
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await empresaController.getAll(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(empresas);
  });

  it('getById returns 200 when found', async () => {
    const req = { params: { id: '1' } };
    empresaService.getById.mockResolvedValue({ id_empresa: 1 });
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await empresaController.getById(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('create forwards userId into data and returns 201', async () => {
    const req = { body: { nome_empresa: 'X' }, userId: 5 };
    const created = { id_empresa: 2 };
    empresaService.create.mockResolvedValue(created);
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await empresaController.create(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(created);
  });
});
