import userFigurinhaController from '../../controllers/userFigurinhaController.js';
import visitaPontoService from '../../services/visitasPontoFigService.js';

jest.mock('../../services/visitasPontoFigService.js', () => ({ __esModule: true, default: { visitarPonto: jest.fn() } }));

describe('userFigurinhaController', () => {
  afterEach(() => jest.clearAllMocks());

  it('visitar returns json on success', async () => {
    const req = { userId: 4, body: { pontoTuristicoId: 2 } };
    visitaPontoService.visitarPonto.mockResolvedValue({ ok: true });
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

    await userFigurinhaController.visitar(req, res);

    expect(res.json).toHaveBeenCalledWith({ ok: true });
  });

  it('visitar returns 400 on error', async () => {
    const req = { userId: 4, body: { pontoTuristicoId: 2 } };
    visitaPontoService.visitarPonto.mockRejectedValue(new Error('bad'));
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

    await userFigurinhaController.visitar(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });
});
