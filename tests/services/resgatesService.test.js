jest.mock('../../database/prismaClient.js', () => ({
  recompensas: { findUnique: jest.fn() },
  usuarios: { findUnique: jest.fn() },
  $transaction: jest.fn()
}));

jest.mock('../../repositories/resgatesRepository.js', () => ({ findByUsuario: jest.fn().mockResolvedValue([]) }));

import resgatesService from '../../services/resgatesService.js';
import prisma from '../../database/prismaClient.js';

describe('resgatesService', () => {
  afterEach(() => jest.clearAllMocks());

  test('resgatarRecompensa throws 403 for non-comum role', async () => {
    await expect(resgatesService.resgatarRecompensa({ id_usuario: 'u', role: 'adm', id_recompensa: 'r' })).rejects.toHaveProperty('status', 403);
  });

  test('resgatarRecompensa throws 404 when recompensa not found', async () => {
    prisma.recompensas.findUnique.mockResolvedValue(null);
    await expect(resgatesService.resgatarRecompensa({ id_usuario: 'u', role: 'comum', id_recompensa: 'r' })).rejects.toHaveProperty('status', 404);
  });

  test('resgatarRecompensa throws 400 when quantidade_disponivel <= 0', async () => {
    prisma.recompensas.findUnique.mockResolvedValue({ id_recompensas: 'r', quantidade_disponivel: 0, preco_moedas: 10 });
    await expect(resgatesService.resgatarRecompensa({ id_usuario: 'u', role: 'comum', id_recompensa: 'r' })).rejects.toHaveProperty('status', 400);
  });

  test('resgatarRecompensa throws 404 when usuario not found', async () => {
    prisma.recompensas.findUnique.mockResolvedValue({ id_recompensas: 'r', quantidade_disponivel: 2, preco_moedas: 10 });
    prisma.usuarios.findUnique.mockResolvedValue(null);
    await expect(resgatesService.resgatarRecompensa({ id_usuario: 'u', role: 'comum', id_recompensa: 'r' })).rejects.toHaveProperty('status', 404);
  });

  test('resgatarRecompensa throws 400 when saldo insuficiente', async () => {
    prisma.recompensas.findUnique.mockResolvedValue({ id_recompensas: 'r', quantidade_disponivel: 2, preco_moedas: 50 });
    prisma.usuarios.findUnique.mockResolvedValue({ id_usuario: 'u', saldo_moedas: 10 });
    await expect(resgatesService.resgatarRecompensa({ id_usuario: 'u', role: 'comum', id_recompensa: 'r' })).rejects.toHaveProperty('status', 400);
  });

  test('resgatarRecompensa succeeds and returns resgate', async () => {
    prisma.recompensas.findUnique.mockResolvedValue({ id_recompensas: '1', quantidade_disponivel: 2, preco_moedas: 10 });
    prisma.usuarios.findUnique.mockResolvedValue({ id_usuario: 'u1', saldo_moedas: 20 });

    prisma.$transaction.mockImplementation(async (fn) => {
      const tx = {
        usuarios: { update: jest.fn().mockResolvedValue(true) },
        recompensas: { update: jest.fn().mockResolvedValue(true) },
        resgates: { create: jest.fn().mockResolvedValue({ id_resgates: 'r1' }) }
      };
      return await fn(tx);
    });

    const result = await resgatesService.resgatarRecompensa({ id_usuario: 'u1', role: 'comum', id_recompensa: '1' });

    expect(result).toHaveProperty('message', 'Recompensa resgatada com sucesso');
    expect(result).toHaveProperty('resgate');
  });

  test('listarMeusResgates proxies to repository', async () => {
    const list = await resgatesService.listarMeusResgates('u');
    expect(Array.isArray(list)).toBe(true);
  });
});

