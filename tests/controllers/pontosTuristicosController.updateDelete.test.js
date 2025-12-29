jest.mock('../../services/pontosTuristicosService.js', () => ({ __esModule: true, default: { atualizarPonto: jest.fn(), deletarPonto: jest.fn() } }));

import controller from '../../controllers/pontosTuristicosController.js';
import pontosService from '../../services/pontosTuristicosService.js';

function resMock() { const r = {}; r.status = jest.fn().mockReturnValue(r); r.json = jest.fn().mockReturnValue(r); r.send = jest.fn().mockReturnValue(r); return r; }

describe('pontosTuristicosController update/delete branches', () => {
  afterEach(() => jest.clearAllMocks());

  test('atualizarPonto returns 200 when service returns updated object', async () => {
    const req = { params: { id: 'p1' }, body: { nome: 'X' } };
    const res = resMock();
    pontosService.atualizarPonto.mockResolvedValue({ id: 'p1', nome: 'X' });

    await controller.atualizarPonto(req, res);

    expect(pontosService.atualizarPonto).toHaveBeenCalledWith('p1', { nome: 'X' });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ id: 'p1', nome: 'X' });
  });

  test('atualizarPonto returns 404 when service returns null', async () => {
    const req = { params: { id: 'notfound' }, body: {} };
    const res = resMock();
    pontosService.atualizarPonto.mockResolvedValue(null);

    await controller.atualizarPonto(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Ponto turístico não encontrado' });
  });

  test('deletarPonto returns 204 when deletion successful', async () => {
    const req = { params: { id: 'p2' } };
    const res = resMock();
    pontosService.deletarPonto.mockResolvedValue({ notFound: false });

    await controller.deletarPonto(req, res);

    expect(pontosService.deletarPonto).toHaveBeenCalledWith('p2');
    expect(res.send).toHaveBeenCalled();
  });

  test('deletarPonto returns 404 when notFound true', async () => {
    const req = { params: { id: 'p3' } };
    const res = resMock();
    pontosService.deletarPonto.mockResolvedValue({ notFound: true });

    await controller.deletarPonto(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Ponto turístico não encontrado' });
  });
});
