jest.mock('../../repositories/qrCodepdfRepository.js', () => ({
  findByPontoId: jest.fn().mockResolvedValue({ id_qr_code: 'q1', id_ponto: 'p', token: 't' }),
  updateArquivos: jest.fn().mockResolvedValue({})
}));

jest.mock('../../database/prismaClient.js', () => ({
  pontos_turisticos: { findUnique: jest.fn().mockResolvedValue({ nome: 'Ponto Teste' }) }
}));

jest.mock('qrcode', () => ({ toFile: jest.fn().mockResolvedValue() }));
jest.mock('pdfkit', () => {
  return jest.fn().mockImplementation(() => ({
    pipe: jest.fn(),
    rect: jest.fn().mockReturnThis(),
    stroke: jest.fn().mockReturnThis(),
    fill: jest.fn().mockReturnThis(),
    fontSize: jest.fn().mockReturnThis(),
    text: jest.fn().mockReturnThis(),
    moveDown: jest.fn().mockReturnThis(),
    image: jest.fn().mockReturnThis(),
    end: jest.fn(),
    page: { width: 600 }
  }));
});

jest.mock('fs', () => ({
  mkdirSync: jest.fn(),
  createWriteStream: jest.fn()
}));

import qrService from '../../services/qrCodePDFService.js';

describe('qrCodePDFService (stub)', () => {
  test('gerarArquivosQr returns paths when dependencies succeed', async () => {
    const res = await qrService.gerarArquivosQr('p');
    expect(res).toHaveProperty('imagem');
    expect(res).toHaveProperty('pdf');
  });
});

