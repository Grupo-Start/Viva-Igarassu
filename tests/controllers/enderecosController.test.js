import enderecosController from '../../controllers/enderecosController.js';
import enderecosRepository from '../../repositories/enderecosRepository.js';

jest.mock('../../repositories/enderecosRepository.js', () => ({ __esModule: true, default: { findById: jest.fn(), create: jest.fn() } }));

describe('enderecosController', () => {
  afterEach(() => jest.clearAllMocks());

  it('getById returns 200 when found', async () => {
    const req = { params: { id: '1' } };
    enderecosRepository.findById.mockResolvedValue({ id_endereco: 1 });
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await enderecosController.getById(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('getById returns 404 when not found', async () => {
    const req = { params: { id: '2' } };
    enderecosRepository.findById.mockResolvedValue(null);
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await enderecosController.getById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });

  it('create parses and validates endereco_completo and returns 201 on success', async () => {
    const raw = 'Rua Teste 10, Bairro, Cidade, ST, 12345-678';
    const req = { body: { endereco_completo: raw }, headers: {}, userId: 1 };
    enderecosRepository.create.mockResolvedValue({ id_endereco: 9 });
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await enderecosController.create(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
  });
});
