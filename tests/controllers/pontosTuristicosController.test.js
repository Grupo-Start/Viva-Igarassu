jest.mock('../../services/pontosTuristicosService.js', () => ({ listarPublico: jest.fn().mockResolvedValue([]) }));

import controller from '../../controllers/pontosTuristicosController.js';

describe('pontosTuristicosController (stubs)', () => {
  test('listarPublico returns 200 with array', async () => {
    const req = {};
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    await controller.listarPublico(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test('criarPonto returns 400 when no empresa info', async () => {
    const req = { body: {}, userId: 'u', role: 'comum' };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    await controller.criarPonto(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });
});
import pontosController from '../../controllers/pontosTuristicosController.js';
import pontosService from '../../services/pontosTuristicosService.js';
import empresaRepository from '../../repositories/empresaRepository.js';
import enderecosRepository from '../../repositories/enderecosRepository.js';
import figurinhasRepository from '../../repositories/figurinhasRepository.js';

jest.mock('../../services/pontosTuristicosService.js', () => ({ __esModule: true, default: { listarPublico: jest.fn(), criarPonto: jest.fn(), atualizarPonto: jest.fn(), deletarPonto: jest.fn() } }));
jest.mock('../../repositories/empresaRepository.js', () => ({ __esModule: true, default: { findById: jest.fn(), findByName: jest.fn(), create: jest.fn(), findByUserId: jest.fn() } }));
jest.mock('../../repositories/enderecosRepository.js', () => ({ __esModule: true, default: { create: jest.fn() } }));
jest.mock('../../repositories/figurinhasRepository.js', () => ({ __esModule: true, default: { createFigurinha: jest.fn() } }));

describe('pontosTuristicosController', () => {
  afterEach(() => jest.clearAllMocks());

  it('listarPublico returns 200', async () => {
    pontosService.listarPublico.mockResolvedValue([{ id: 1 }]);
    const req = {};
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await pontosController.listarPublico(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('criarPonto returns 400 when no id_empresa and not admin', async () => {
    const req = { body: {}, role: 'comum' };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await pontosController.criarPonto(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });
});
