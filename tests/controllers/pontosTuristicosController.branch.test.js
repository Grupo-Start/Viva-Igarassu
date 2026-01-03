jest.mock('../../services/pontosTuristicosService.js', () => ({ __esModule: true, default: { criarPonto: jest.fn() } }));
jest.mock('../../repositories/empresaRepository.js', () => ({ __esModule: true, default: { findById: jest.fn(), findByName: jest.fn(), create: jest.fn(), findByUserId: jest.fn() } }));
jest.mock('../../repositories/enderecosRepository.js', () => ({ __esModule: true, default: { create: jest.fn() } }));
jest.mock('../../repositories/figurinhasRepository.js', () => ({ __esModule: true, default: { createFigurinha: jest.fn() } }));

import controller from '../../controllers/pontosTuristicosController.js';
import enderecosRepository from '../../repositories/enderecosRepository.js';

function resMock() { const r = {}; r.status = jest.fn().mockReturnValue(r); r.json = jest.fn().mockReturnValue(r); r.send = jest.fn().mockReturnValue(r); return r; }

describe('pontosTuristicosController branches', () => {
  afterEach(() => jest.clearAllMocks());

  test('criarPonto returns 400 when parsed endereco lacks cidade/estado/logradouro', async () => {
    const body = { endereco_completo: 'Somente Bairro', id_empresa: 'e1' };
    
    const req = { body, userId: 'u', role: 'comum' };
    const empresaRepo = require('../../repositories/empresaRepository.js');
    empresaRepo.default.findById.mockResolvedValue({ id_empresa: 'e1' });
    const res = resMock();

    await controller.criarPonto(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Endereço completo deve conter logradouro, cidade e estado.' });
  });
});
