import service from '../../services/pontosTuristicosService.js';
import pontosRepository from '../../repositories/pontosTuristicosRepository.js';
import qrCodeService from '../../services/qrCodeService.js';

jest.mock('../../repositories/pontosTuristicosRepository.js', () => ({
  __esModule: true,
  default: {
    listarTodos: jest.fn(),
    criarPonto: jest.fn(),
    atualizarPonto: jest.fn(),
    deletarPonto: jest.fn()
  }
}));

jest.mock('../../services/qrCodeService.js', () => ({
  __esModule: true,
  default: { gerarQrCodeParaPonto: jest.fn() }
}));

describe('pontosTuristicosService', () => {
  afterEach(() => jest.clearAllMocks());

  it('listarPublico calls repository', async () => {
    pontosRepository.listarTodos.mockResolvedValue([{ id: 1 }]);
    const res = await service.listarPublico();
    expect(res).toEqual([{ id: 1 }]);
    expect(pontosRepository.listarTodos).toHaveBeenCalled();
  });

  it('criarPonto returns ponto with qr when qrCodeService works', async () => {
    const ponto = { id_ponto: 10, nome: 'P' };
    pontosRepository.criarPonto.mockResolvedValue(ponto);
    qrCodeService.gerarQrCodeParaPonto.mockResolvedValue({ qrCodeBase64: 'b64' });

    const res = await service.criarPonto({ nome: 'P' });
    expect(res.qr_code).toBe('b64');
  });

  it('criarPonto returns ponto without qr when qr generation fails', async () => {
    const ponto = { id_ponto: 11, nome: 'Q' };
    pontosRepository.criarPonto.mockResolvedValue(ponto);
    qrCodeService.gerarQrCodeParaPonto.mockRejectedValue(new Error('fail'));

    const res = await service.criarPonto({ nome: 'Q' });
    expect(res).toEqual(ponto);
  });

  it('deletarPonto returns notFound when repository returns falsy', async () => {
    pontosRepository.deletarPonto.mockResolvedValue(null);
    const res = await service.deletarPonto('x');
    expect(res).toEqual({ notFound: true });
  });

  it('deletarPonto returns result when repository returns value', async () => {
    pontosRepository.deletarPonto.mockResolvedValue({ ok: true });
    const res = await service.deletarPonto('x');
    expect(res).toEqual({ ok: true });
  });
});
