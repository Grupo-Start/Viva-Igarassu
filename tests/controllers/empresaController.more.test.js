jest.mock('../../services/empresaService.js', () => ({ __esModule: true, default: { getAll: jest.fn(), getById: jest.fn(), create: jest.fn(), update: jest.fn(), delete: jest.fn(), countEventos: jest.fn(), countEventosByUser: jest.fn(), getMeEventos: jest.fn(), countEventosByMonth: jest.fn(), countMeEventosByMonth: jest.fn() } }));

import controller from '../../controllers/empresaController.js';
import empresaService from '../../services/empresaService.js';

function resMock() { const r = {}; r.status = jest.fn().mockReturnValue(r); r.json = jest.fn().mockReturnValue(r); return r; }

describe('empresaController deeper', () => {
  afterEach(() => jest.clearAllMocks());

  test('getById returns 404 when service throws Empresa não encontrada', async () => {
    empresaService.getById.mockRejectedValue(new Error('Empresa não encontrada'));
    const req = { params: { id: 'x' } };
    const res = resMock();
    await controller.getById(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
  });

  test('getEventosCountByMonth validates year param', async () => {
    const req = { params: { id: '1' }, query: { year: 'not-a-number' } };
    const res = resMock();
    await controller.getEventosCountByMonth(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  test('create returns 201 with created empresa', async () => {
    empresaService.create.mockResolvedValue({ id_empresa: 'e1' });
    const req = { body: { nome_empresa: 'X' }, userId: 'u1' };
    const res = resMock();
    await controller.create(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
  });
});
