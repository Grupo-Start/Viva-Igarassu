import userController from '../../controllers/userController.js';
import userService from '../../services/userService.js';

jest.mock('../../services/userService.js', () => ({
  __esModule: true,
  default: {
    login: jest.fn()
  }
}));

describe('userController.login', () => {
  afterEach(() => jest.clearAllMocks());

  it('returns 200 and result when login succeeds', async () => {
    const req = { body: { email: 'x@x.com', senha: '123' } };
    const result = { user: { id_usuario: 1, email: 'x@x.com' }, token: 'tok' };
    userService.login.mockResolvedValue(result);

    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await userController.login(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(result);
  });

  it('returns 400 when service throws', async () => {
    const req = { body: { email: 'x@x.com', senha: '123' } };
    userService.login.mockRejectedValue({ message: 'Email ou senha inválidos' });

    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await userController.login(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Email ou senha inválidos' });
  });
});
