import repo from '../../repositories/qrCodepdfRepository.js';
import prisma from '../../database/prismaClient.js';

jest.mock('../../database/prismaClient.js', () => ({ __esModule: true, default: { qr_codes_pontos: { findFirst: jest.fn(), update: jest.fn() } } }));

afterEach(() => jest.clearAllMocks());

test('findByPontoId calls prisma.qr_codes_pontos.findFirst', async () => {
  prisma.qr_codes_pontos.findFirst.mockResolvedValue({ id_qr_code: '1' });
  const res = await repo.findByPontoId('p1');
  expect(prisma.qr_codes_pontos.findFirst).toHaveBeenCalledWith(expect.objectContaining({ where: { id_ponto: 'p1' } }));
  expect(res).toEqual({ id_qr_code: '1' });
});
