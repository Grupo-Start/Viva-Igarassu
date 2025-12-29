import visitasPontoFigService from '../../services/visitasPontoFigService.js';

jest.mock('../../database/prismaClient.js', () => ({
  qr_codes_pontos: { findFirst: jest.fn().mockResolvedValue(null) },
  usuario_figurinhas: { findFirst: jest.fn(), create: jest.fn() },
  usuarios: { update: jest.fn() }
}));

describe('visitasPontoFigService', () => {
  test('visitarViaQr forbids non-comum roles', async () => {
    await expect(visitasPontoFigService.visitarViaQr({ token: 't', usuarioId: 'u', role: 'admin' }))
      .rejects.toMatchObject({ status: 403 });
  });

  test('visitarViaQr throws when qr invalid', async () => {
    await expect(visitasPontoFigService.visitarViaQr({ token: 'nope', usuarioId: 'u', role: 'comum' }))
      .rejects.toMatchObject({ status: 404 });
  });
});
