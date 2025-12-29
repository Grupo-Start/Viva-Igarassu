import userController from '../../controllers/userController.js';
import userService from '../../services/userService.js';

jest.mock('../../services/userService.js', () => ({
  __esModule: true,
  default: {
    getById: jest.fn()
  }
}));

describe('userController.getMe', () => {
  afterEach(() => jest.clearAllMocks());

  it('returns 200 and user when found', async () => {
    const req = { userId: 7 };
    const user = { id_usuario: 7, nome_completo: 'Teste' };
    userService.getById.mockResolvedValue(user);

    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await userController.getMe(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(user);
  });

  it('returns 404 when user not found', async () => {
    const req = { userId: 8 };
    userService.getById.mockResolvedValue(null);

    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await userController.getMe(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Usuário não encontrado' });
  });
});
