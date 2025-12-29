jest.mock('fs', () => ({ existsSync: jest.fn().mockReturnValue(false), createReadStream: jest.fn() }));
jest.mock('../../services/qrCodeService.js', () => ({ criarQrCode: jest.fn().mockResolvedValue({}) }));

import controller from '../../controllers/qrCodePdfController.js';
import fs from 'fs';

describe('qrCodePdfController (stubs)', () => {
  test('gerarArquivosQr returns 201 when service succeeds', async () => {
    const req = { params: { id: 'p1' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    await controller.gerarArquivosQr(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
  });

  test('downloadPdf returns 404 when file missing', async () => {
    fs.existsSync.mockReturnValue(false);
    const req = { params: { id: 'p1' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn(), setHeader: jest.fn() };
    await controller.downloadPdf(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
  });
});

