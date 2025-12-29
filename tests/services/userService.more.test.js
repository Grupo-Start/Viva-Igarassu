import userService from '../../services/userService.js';
import prisma from '../../database/prismaClient.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import resetTokens from '../../utils/resetTokens.js';
import emailUtil from '../../utils/email.js';

jest.mock('../../database/prismaClient.js', () => ({
  __esModule: true,
  default: {
    usuarios: { findUnique: jest.fn(), update: jest.fn(), findMany: jest.fn(), create: jest.fn() },
    token_blacklist: { create: jest.fn() }
  }
}));

jest.mock('bcryptjs', () => ({ hash: jest.fn(), compare: jest.fn() }));
jest.mock('jsonwebtoken', () => ({ sign: jest.fn(), decode: jest.fn() }));
jest.mock('../../utils/resetTokens.js', () => ({ createToken: jest.fn(), findToken: jest.fn(), removeToken: jest.fn() }));
jest.mock('../../utils/email.js', () => ({ sendResetPasswordEmail: jest.fn() }));

describe('userService additional', () => {
  afterEach(() => jest.clearAllMocks());

  it('updateMe hashes new password and updates and strips senha', async () => {
    bcrypt.hash.mockResolvedValue('hashed');
    prisma.usuarios.update.mockResolvedValue({ id_usuario: '1', nome_completo: 'X', senha: 'hashed' });

    const res = await userService.updateMe('1', { senha: 'nova' });
    expect(prisma.usuarios.update).toHaveBeenCalled();
    expect(res).toEqual({ id_usuario: '1', nome_completo: 'X' });
  });

  it('updateMe throws P2002 as handled error', async () => {
    const err = new Error('dup'); err.code = 'P2002';
    prisma.usuarios.update.mockRejectedValueOnce(err);
    await expect(userService.updateMe('1', { email: 'dup@example.com' })).rejects.toHaveProperty('status', 400);
  });

  it('logout stores token in blacklist', async () => {
    jwt.decode.mockReturnValue({ exp: Math.floor(Date.now() / 1000) + 3600 });
    prisma.token_blacklist.create.mockResolvedValue({});
    const res = await userService.logout('token123');
    expect(prisma.token_blacklist.create).toHaveBeenCalled();
    expect(res).toEqual({ message: 'Logout realizado com sucesso' });
  });

  it('forgotPassword returns message even if user not found', async () => {
    prisma.usuarios.findUnique.mockResolvedValue(null);
    const res = await userService.forgotPassword('no@no.com');
    expect(res).toEqual({ message: 'Se o e-mail existir, instruções serão enviadas' });
  });

  it('forgotPassword sends email when user exists', async () => {
    prisma.usuarios.findUnique.mockResolvedValue({ id_usuario: '2', email: 'a@a.com' });
    resetTokens.createToken.mockResolvedValue('tok123');
    emailUtil.sendResetPasswordEmail.mockResolvedValue(true);
    const res = await userService.forgotPassword('a@a.com');
    expect(resetTokens.createToken).toHaveBeenCalled();
    expect(emailUtil.sendResetPasswordEmail).toHaveBeenCalled();
    expect(res).toHaveProperty('message');
  });

  it('resetPassword validates token and updates password', async () => {
    resetTokens.findToken.mockResolvedValue({ userId: '2' });
    bcrypt.hash.mockResolvedValue('hash2');
    prisma.usuarios.update.mockResolvedValue({});
    resetTokens.removeToken.mockResolvedValue();

    const res = await userService.resetPassword('tok', 'nova');
    expect(prisma.usuarios.update).toHaveBeenCalled();
    expect(resetTokens.removeToken).toHaveBeenCalledWith('tok');
    expect(res).toEqual({ message: 'Senha redefinida com sucesso' });
  });
});
