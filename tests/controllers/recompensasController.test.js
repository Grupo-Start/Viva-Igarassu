jest.mock('../../services/recompensasService.js', () => ({
  getAllByEmpresa: jest.fn().mockResolvedValue([]),
  getById: jest.fn().mockResolvedValue({})
}));

import controller from '../../controllers/recompensasController.js';

describe('recompensasController (stubs)', () => {
  test('getAll returns 200', async () => {
    const req = { query: { id_empresa: 'e1' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    await controller.getAll(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test('getById returns 200 when found', async () => {
    const req = { params: { id: 'r1' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    await controller.getById(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });
});
import recompensasController from '../../controllers/recompensasController.js';
import recompensasService from '../../services/recompensasService.js';
import empresaRepository from '../../repositories/empresaRepository.js';

jest.mock('../../services/recompensasService.js', () => ({ __esModule: true, default: { getAllByEmpresa: jest.fn(), getById: jest.fn(), create: jest.fn(), update: jest.fn(), delete: jest.fn(), updateImagem: jest.fn() } }));
jest.mock('../../repositories/empresaRepository.js', () => ({ __esModule: true, default: { findById: jest.fn(), findByName: jest.fn(), create: jest.fn() } }));

describe('recompensasController', () => {
  afterEach(() => jest.clearAllMocks());

  it('getAll returns 200 with list', async () => {
    const req = { query: {} };
    recompensasService.getAllByEmpresa.mockResolvedValue([]);
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await recompensasController.getAll(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('create returns 404 if no empresa found', async () => {
    const req = { id_empresa: null, role: 'comum', userId: 5, body: {} };
    empresaRepository.findById.mockResolvedValue(null);
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await recompensasController.create(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });
});
