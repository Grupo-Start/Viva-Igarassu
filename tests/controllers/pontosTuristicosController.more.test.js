jest.mock('../../services/pontosTuristicosService.js', () => ({ __esModule: true, default: { criarPonto: jest.fn(), listarPublico: jest.fn() } }));
jest.mock('../../repositories/empresaRepository.js', () => ({ __esModule: true, default: { findById: jest.fn(), findByName: jest.fn(), create: jest.fn(), findByUserId: jest.fn() } }));
jest.mock('../../repositories/enderecosRepository.js', () => ({ __esModule: true, default: { create: jest.fn() } }));
jest.mock('../../repositories/figurinhasRepository.js', () => ({ __esModule: true, default: { createFigurinha: jest.fn() } }));

import controller from '../../controllers/pontosTuristicosController.js';
import pontosService from '../../services/pontosTuristicosService.js';
import empresaRepository from '../../repositories/empresaRepository.js';
import enderecosRepository from '../../repositories/enderecosRepository.js';
import figurinhasRepository from '../../repositories/figurinhasRepository.js';

function resMock() {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
}

describe('pontosTuristicosController deeper', () => {
  afterEach(() => jest.clearAllMocks());


  test('criarPonto creates empresa when role adm and no empresa exists', async () => {
    const req = { body: {}, userId: 'u1', role: 'adm' };
    const res = resMock();

    empresaRepository.findById.mockResolvedValue(null);
    empresaRepository.findByName.mockResolvedValue(null);
    empresaRepository.create.mockResolvedValue({ id_empresa: 'e1' });
    figurinhasRepository.createFigurinha.mockResolvedValue({ id_figurinha: 'f1' });
    pontosService.criarPonto.mockResolvedValue({ id: 'p1' });

    await controller.criarPonto(req, res);

    expect(empresaRepository.create).toHaveBeenCalled();
    expect(pontosService.criarPonto).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
  });

  test('criarPonto parses endereco_completo and creates endereco', async () => {
    const body = { endereco_completo: 'Rua Teste 10, Bairro, Cidade, ST, 12345-678' };
    const req = { body, userId: 'u2', role: 'adm' };
    const res = resMock();

    empresaRepository.findById.mockResolvedValue({ id_empresa: 'e2' });
    enderecosRepository.create.mockResolvedValue({ id_endereco: 'end1' });
    figurinhasRepository.createFigurinha.mockResolvedValue({ id_figurinha: 'f2' });
    pontosService.criarPonto.mockResolvedValue({ id: 'p2' });

    await controller.criarPonto(req, res);

    expect(enderecosRepository.create).toHaveBeenCalled();
    expect(pontosService.criarPonto).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
  });
});
