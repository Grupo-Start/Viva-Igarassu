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

describe('pontosTuristicosController edge cases', () => {
  afterEach(() => jest.clearAllMocks());

  test('criarPonto returns 400 when user has no empresa and is not adm', async () => {
    const req = { body: {}, userId: 'uX', role: 'comum' };
    const res = resMock();

    empresaRepository.findById.mockResolvedValue(null);

    await controller.criarPonto(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "Usuário não possui empresa cadastrada" });
  });

  test('criarPonto returns 400 when endereco_completo parses to missing fields', async () => {
    const body = { endereco_completo: 'Somente Bairro', id_empresa: 'e2' };
    const req = { body, userId: 'u2', role: 'adm' };
    const res = resMock();

    empresaRepository.findById.mockResolvedValue({ id_empresa: 'e2' });
    figurinhasRepository.createFigurinha.mockResolvedValue({ id_figurinha: 'f2' });

    await controller.criarPonto(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "Endereço completo deve conter logradouro, cidade e estado." });
  });

  test('criarPonto returns 500 when enderecosRepository.create throws', async () => {
    const body = { endereco_completo: 'Rua Teste 10, Bairro, Cidade, ST, 12345-678', id_empresa: 'e3' };
    const req = { body, userId: 'u3', role: 'adm' };
    const res = resMock();

    empresaRepository.findById.mockResolvedValue({ id_empresa: 'e3' });
    enderecosRepository.create.mockRejectedValue(new Error('fail'));

    await controller.criarPonto(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Erro ao criar endereço a partir do texto fornecido' });
  });
});
