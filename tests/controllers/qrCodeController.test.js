import qrCodeController from '../../controllers/qrCodeController.js';
import qrCodeService from '../../services/qrCodeService.js';

jest.mock('../../services/qrCodeService.js', () => ({ __esModule: true, default: { criarQrCode: jest.fn(), criarQrCodesParaTodosPontos: jest.fn() } }));

describe('qrCodeController', () => {
  afterEach(() => jest.clearAllMocks());

  it('gerarParaPonto returns 201', async () => {
    const req = { params: { id: '1' } };
    qrCodeService.criarQrCode.mockResolvedValue({ ok: true });
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await qrCodeController.gerarParaPonto(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
  });

  it('gerarParaTodosPontos returns 201', async () => {
    const req = {};
    qrCodeService.criarQrCodesParaTodosPontos.mockResolvedValue({ ok: true });
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await qrCodeController.gerarParaTodosPontos(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
  });
});
