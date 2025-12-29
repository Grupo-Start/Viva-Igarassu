import minhasFigurinhasController from '../../controllers/minhasFigurinhasController.js';
import minhasFigurinhasService from '../../services/minhasFigurinhasService.js';

jest.mock('../../services/minhasFigurinhasService.js', () => ({ __esModule: true, default: { listarPorUsuario: jest.fn() } }));

describe('minhasFigurinhasController', () => {
  afterEach(() => jest.clearAllMocks());

  it('listar returns 200 with figurinhas', async () => {
    const req = { userId: 3 };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    minhasFigurinhasService.listarPorUsuario.mockResolvedValue([{ id: 1 }]);

    await minhasFigurinhasController.listar(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([{ id: 1 }]);
  });
});
