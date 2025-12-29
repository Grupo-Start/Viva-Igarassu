jest.mock('../../services/figurinhasService.js', () => ({ findAll: jest.fn().mockResolvedValue([]), create: jest.fn().mockResolvedValue({}), findById: jest.fn().mockResolvedValue({}) }));

import controller from '../../controllers/figurinhasController.js';

describe('figurinhasController (stubs)', () => {
  test('findAllFigurinha calls service and returns json', async () => {
    const req = {};
    const res = { json: jest.fn() };
    await controller.findAllFigurinha(req, res);
    expect(res.json).toHaveBeenCalled();
  });

  test('createFigurinha returns 201', async () => {
    const req = { body: {} };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    await controller.createFigurinha(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
  });
});
import figurinhasController from '../../controllers/figurinhasController.js';
import figurinhasService from '../../services/figurinhasService.js';

jest.mock('../../services/figurinhasService.js', () => ({ __esModule: true, default: { create: jest.fn(), findAll: jest.fn(), findById: jest.fn(), update: jest.fn(), remove: jest.fn() } }));

describe('figurinhasController', () => {
  afterEach(() => jest.clearAllMocks());

  it('createFigurinha returns 201', async () => {
    const req = { body: { nome: 'F' } };
    figurinhasService.create.mockResolvedValue({ id_figurinha: 1 });
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await figurinhasController.createFigurinha(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
  });

  it('removeFigurinha returns 204', async () => {
    const req = { params: { id: '1' } };
    figurinhasService.remove.mockResolvedValue();
    const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };

    await figurinhasController.removeFigurinha(req, res);

    expect(res.status).toHaveBeenCalledWith(204);
  });
});
