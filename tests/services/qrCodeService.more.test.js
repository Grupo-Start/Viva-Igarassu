import service from '../../services/qrCodeService.js';
import prisma from '../../database/prismaClient.js';
import fs from 'fs';
import QRCode from 'qrcode';
import PDFDocument from 'pdfkit';

jest.mock('../../database/prismaClient.js', () => ({ __esModule: true, default: { pontos_turisticos: { findUnique: jest.fn() }, qr_codes_pontos: { findFirst: jest.fn(), update: jest.fn(), create: jest.fn() } } }));
jest.mock('fs', () => ({ existsSync: jest.fn(), mkdirSync: jest.fn(), createWriteStream: jest.fn(() => ({ on: (e,cb)=>{ if(e==='finish') cb(); } })) }));
jest.mock('qrcode', () => ({ toFile: jest.fn() }));
jest.mock('pdfkit', () => jest.fn().mockImplementation(() => ({ pipe: jest.fn(), rect: jest.fn().mockReturnThis(), stroke: jest.fn().mockReturnThis(), fill: jest.fn().mockReturnThis(), fontSize: jest.fn().mockReturnThis(), font: jest.fn().mockReturnThis(), text: jest.fn().mockReturnThis(), moveDown: jest.fn().mockReturnThis(), image: jest.fn().mockReturnThis(), end: jest.fn(), page: { width: 595.28 }, fillColor: jest.fn().mockReturnThis() })));

afterEach(() => jest.clearAllMocks());

test('when qr exists, service updates and returns payload', async () => {
  prisma.pontos_turisticos.findUnique.mockResolvedValue({ id_ponto: '1', nome: 'P' });
  prisma.qr_codes_pontos.findFirst.mockResolvedValue({ id_qr_code: '10', token: 'tok', imagem_path: '/uploads/qrcodes/ponto-1.png', pdf_path: '/uploads/pdfs/qr-ponto-1.pdf' });
  prisma.qr_codes_pontos.update.mockResolvedValue({ id_qr_code: '10', imagem_path: '/uploads/qrcodes/ponto-1.png', pdf_path: '/uploads/pdfs/qr-ponto-1.pdf' });
  process.env.API_URL = 'http://localhost';
  const res = await service.criarQrCode('1');
  expect(prisma.qr_codes_pontos.update).toHaveBeenCalled();
  expect(res).toHaveProperty('id_qr_code');
});
