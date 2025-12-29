import service from '../../services/qrCodeService.js';
import prisma from '../../database/prismaClient.js';
import fs from 'fs';
import QRCode from 'qrcode';
import PDFDocument from 'pdfkit';

jest.mock('../../database/prismaClient.js', () => ({
  __esModule: true,
  default: {
    pontos_turisticos: { findUnique: jest.fn(), findMany: jest.fn() },
    qr_codes_pontos: { findFirst: jest.fn(), create: jest.fn(), update: jest.fn() }
  }
}));

jest.mock('fs', () => ({ existsSync: jest.fn(), mkdirSync: jest.fn(), createWriteStream: jest.fn(() => ({ on: (e,cb)=>{ if(e==='finish') cb(); } })) }));
jest.mock('qrcode', () => ({ toFile: jest.fn() }));
jest.mock('pdfkit', () => jest.fn().mockImplementation(() => ({
  pipe: jest.fn(),
  rect: jest.fn().mockReturnThis(),
  stroke: jest.fn().mockReturnThis(),
  fill: jest.fn().mockReturnThis(),
  fontSize: jest.fn().mockReturnThis(),
  font: jest.fn().mockReturnThis(),
  fillColor: jest.fn().mockReturnThis(),
  text: jest.fn().mockReturnThis(),
  moveDown: jest.fn().mockReturnThis(),
  image: jest.fn().mockReturnThis(),
  end: jest.fn(),
  page: { width: 595.28 }
})));

describe('qrCodeService.criarQrCode', () => {
  afterEach(() => jest.clearAllMocks());

  it('throws when ponto not found', async () => {
    prisma.pontos_turisticos.findUnique.mockResolvedValue(null);
    await expect(service.criarQrCode('1')).rejects.toThrow('Ponto turístico não encontrado');
  });

  it('creates new QR and returns payload when no existing qr', async () => {
    prisma.pontos_turisticos.findUnique.mockResolvedValue({ id_ponto: '1', nome: 'P' });
    prisma.qr_codes_pontos.findFirst.mockResolvedValue(null);
    prisma.qr_codes_pontos.create.mockResolvedValue({ id_qr_code: '9', imagem_path: '/uploads/qrcodes/ponto-1.png', pdf_path: '/uploads/pdfs/qr-ponto-1.pdf' });

    process.env.API_URL = 'http://localhost';

    const res = await service.criarQrCode('1');
    expect(res).toHaveProperty('token');
    expect(res).toHaveProperty('imagem');
    expect(res).toHaveProperty('pdf');
  });
});
