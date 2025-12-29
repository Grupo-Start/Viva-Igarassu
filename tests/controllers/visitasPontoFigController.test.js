import visitasPontoFigController from '../../controllers/visitasPontoFigController.js';
import visitasPontoFigService from '../../services/visitasPontoFigService.js';

jest.mock('../../services/visitasPontoFigService.js', () => ({ __esModule: true, default: { visitarViaQr: jest.fn() } }));

describe('visitasPontoFigController', () => {
  afterEach(() => jest.clearAllMocks());

  it('visitarViaQr returns 201 on success', async () => {
    const req = { query: { token: 'abc' }, userId: 1, role: 'comum' };
    visitasPontoFigService.visitarViaQr.mockResolvedValue({ ok: true });
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await visitasPontoFigController.visitarViaQr(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
  });

  it('visitarViaQr returns 400 when token missing', async () => {
    const req = { query: {} };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await visitasPontoFigController.visitarViaQr(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });
});
