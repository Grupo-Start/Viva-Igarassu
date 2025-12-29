import userService from '../../services/userService.js';
import prisma from '../../database/prismaClient.js';
import bcrypt from 'bcryptjs';

jest.mock('../../database/prismaClient.js', () => ({
  __esModule: true,
  default: {
    usuarios: {
      findUnique: jest.fn(),
      create: jest.fn()
    }
  }
}));

jest.mock('bcryptjs', () => ({
  hash: jest.fn(),
  compare: jest.fn()
}));

describe('userService.cadastrar', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('throws when required fields are missing', async () => {
    await expect(userService.cadastrar({ nome_completo: 'Apenas nome' })).rejects.toMatchObject({ status: 400 });
  });

  it('throws when role is invalid', async () => {
    const dados = { nome_completo: 'Teste', email: 't@t.com', senha: '123', role: 'invalido' };
    await expect(userService.cadastrar(dados)).rejects.toMatchObject({ status: 400 });
  });

  it('throws when email already exists', async () => {
    prisma.usuarios.findUnique.mockResolvedValue({ id_usuario: 1, email: 't@t.com' });
    const dados = { nome_completo: 'Teste', email: 't@t.com', senha: '123', role: 'comum' };
    await expect(userService.cadastrar(dados)).rejects.toMatchObject({ status: 400 });
    expect(prisma.usuarios.findUnique).toHaveBeenCalledWith({ where: { email: 't@t.com' } });
  });

  it('creates user successfully and removes senha from returned object', async () => {
    prisma.usuarios.findUnique.mockResolvedValue(null);
    bcrypt.hash.mockResolvedValue('hashed-pass');

    const created = { id_usuario: 5, nome_completo: 'OK', email: 'ok@ok.com', senha: 'hashed-pass', role: 'comum' };
    prisma.usuarios.create.mockResolvedValue(created);

    const dados = { nome_completo: 'OK', email: 'ok@ok.com', senha: 'plain', role: 'comum' };

    const res = await userService.cadastrar(dados);

    expect(prisma.usuarios.create).toHaveBeenCalled();
    expect(res).toEqual({ id_usuario: 5, nome_completo: 'OK', email: 'ok@ok.com', role: 'comum' });
  });
});
