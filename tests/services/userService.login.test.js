import userService from '../../services/userService.js';
import prisma from '../../database/prismaClient.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

jest.mock('../../database/prismaClient.js', () => ({
  __esModule: true,
  default: {
    usuarios: { findUnique: jest.fn() },
    token_blacklist: { create: jest.fn() }
  }
}));

jest.mock('bcryptjs', () => ({
  compare: jest.fn(),
  hash: jest.fn()
}));

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
  decode: jest.fn()
}));

describe('userService.login', () => {
  afterEach(() => jest.clearAllMocks());

  it('throws when user not found', async () => {
    prisma.usuarios.findUnique.mockResolvedValue(null);
    await expect(userService.login('nao@existe.com', '123')).rejects.toMatchObject({ message: 'Email ou senha inválidos' });
  });

  it('throws when senha is incorrect', async () => {
    const user = { id_usuario: 1, email: 'a@a.com', senha: 'hash' };
    prisma.usuarios.findUnique.mockResolvedValue(user);
    bcrypt.compare.mockResolvedValue(false);

    await expect(userService.login('a@a.com', 'wrong')).rejects.toMatchObject({ message: 'Email ou senha inválidos' });
  });

  it('returns user without senha and token on success', async () => {
    const user = { id_usuario: 2, email: 'b@b.com', senha: 'hash', role: 'comum', nome_completo: 'Usu' };
    prisma.usuarios.findUnique.mockResolvedValue({ ...user });
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue('tokentest');

    const res = await userService.login('b@b.com', 'pass');

    expect(res.token).toBe('tokentest');
    expect(res.user.senha).toBeUndefined();
    expect(jwt.sign).toHaveBeenCalledWith(
      expect.objectContaining({ id_usuario: user.id_usuario, role: user.role }),
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
  });
});
