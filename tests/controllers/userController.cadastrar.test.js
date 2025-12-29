import userController from '../../controllers/userController.js';
import userService from '../../services/userService.js';

jest.mock('../../services/userService.js', () => ({
  __esModule: true,
  default: {
    cadastrar: jest.fn()
  }
}));

describe('userController.cadastrar', () => {
  afterEach(() => jest.clearAllMocks());

  it('returns 201 and created user on success', async () => {
    const req = { body: { nome_completo: 'X', email: 'x@x.com', senha: '123', role: 'comum' } };
    const novo = { id_usuario: 10, nome_completo: 'X', email: 'x@x.com', role: 'comum' };
    userService.cadastrar.mockResolvedValue(novo);

    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await userController.cadastrar(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(novo);
  });

  it('returns error status from service when it throws', async () => {
    const req = { body: { nome_completo: 'X' } };
    userService.cadastrar.mockRejectedValue({ status: 400, message: 'Erro' });

    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await userController.cadastrar(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Erro' });
  });
});
