import resgatesController from '../../controllers/resgatesController.js';
import resgatesService from '../../services/resgatesService.js';

jest.mock('../../services/resgatesService.js', () => ({ __esModule: true, default: { resgatarRecompensa: jest.fn(), listarMeusResgates: jest.fn() } }));

describe('resgatesController', () => {
  afterEach(() => jest.clearAllMocks());

  it('resgatar returns 201 on success', async () => {
    const req = { params: { id: '5' }, userId: 2, role: 'comum' };
    resgatesService.resgatarRecompensa.mockResolvedValue({ ok: true });
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await resgatesController.resgatar(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
  });

  it('meusResgates returns 200 with message when empty', async () => {
    const req = { userId: 2 };
    resgatesService.listarMeusResgates.mockResolvedValue([]);
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await resgatesController.meusResgates(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: expect.any(String) }));
  });
});
