jest.mock('../../database/prismaClient.js', () => ({
  qr_codes_pontos: {
    create: jest.fn().mockResolvedValue({ id_qr_code: 'q1' }),
    findUnique: jest.fn().mockResolvedValue({ token: 't' }),
    findFirst: jest.fn().mockResolvedValue(null)
  }
}));

describe('qrCodeRepository', () => {
  beforeEach(() => jest.resetModules());

  test('criar returns created object', async () => {
    const mod = await import('../../repositories/qrCodeRepository.js');
    const repo = mod.default;
    const r = await repo.criar({ token: 't', id_ponto: 'p' });
    expect(r).toHaveProperty('id_qr_code');
  });

  test('findByToken and findByPontoId', async () => {
    const mod = await import('../../repositories/qrCodeRepository.js');
    const repo = mod.default;
    const t = await repo.findByToken('t');
    expect(t).toHaveProperty('token');
    const p = await repo.findByPontoId('p');
    expect(p).toBeNull();
  });
});

