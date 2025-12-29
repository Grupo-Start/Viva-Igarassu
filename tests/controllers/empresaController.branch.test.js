jest.mock('../../services/empresaService.js', () => ({ __esModule: true, default: {
  getAll: jest.fn(),
  getById: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  countEventos: jest.fn(),
  countEventosByUser: jest.fn(),
  getMeEventos: jest.fn(),
  countEventosByMonth: jest.fn(),
  countMeEventosByMonth: jest.fn()
}}));

import controller from '../../controllers/empresaController.js';
import empresaService from '../../services/empresaService.js';

function resMock() {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
}

describe('empresaController branch coverage', () => {
  afterEach(() => jest.clearAllMocks());

  test('getById returns 404 when service throws Empresa não encontrada', async () => {
    const req = { params: { id: 'e1' } };
    const res = resMock();

    empresaService.getById.mockRejectedValue(new Error('Empresa não encontrada'));

    await controller.getById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Empresa não encontrada' });
  });

  test('create returns 400 when service throws with message', async () => {
    const req = { body: { nome_empresa: 'X' }, userId: 'u1' };
    const res = resMock();

    empresaService.create.mockRejectedValue(new Error('dados inválidos'));

    await controller.create(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'dados inválidos' });
  });

  test('update returns 404 when empresa não encontrada', async () => {
    const req = { params: { id: 'e2' }, body: {} };
    const res = resMock();

    empresaService.update.mockRejectedValue(new Error('Empresa não encontrada'));

    await controller.update(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Empresa não encontrada' });
  });

  test('delete returns 500 when service throws generic error', async () => {
    const req = { params: { id: 'e3' } };
    const res = resMock();

    empresaService.delete.mockRejectedValue(new Error('boom'));

    await controller.delete(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Erro interno do servidor' });
  });

  test('getEventosCountByMonth returns 400 for invalid year', async () => {
    const req = { params: { id: 'e4' }, query: { year: 'abc' } };
    const res = resMock();

    await controller.getEventosCountByMonth(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Ano inválido' });
    expect(empresaService.countEventosByMonth).not.toHaveBeenCalled();
  });

  test('getMeEventosCountByMonth returns 400 for invalid year', async () => {
    const req = { userId: 'u5', query: { year: 'not-a-year' } };
    const res = resMock();

    await controller.getMeEventosCountByMonth(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Ano inválido' });
    expect(empresaService.countMeEventosByMonth).not.toHaveBeenCalled();
  });
});
