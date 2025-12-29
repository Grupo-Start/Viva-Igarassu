jest.mock('../../services/eventosService.js', () => ({ __esModule: true, default: { create: jest.fn() } }));
jest.mock('../../repositories/empresaRepository.js', () => ({ __esModule: true, default: { findById: jest.fn(), findByName: jest.fn(), create: jest.fn(), findByUserId: jest.fn() } }));

import controller from '../../controllers/eventosController.js';
import empresaRepository from '../../repositories/empresaRepository.js';

function resMock() { const r = {}; r.status = jest.fn().mockReturnValue(r); r.json = jest.fn().mockReturnValue(r); return r; }

describe('eventosController branches', () => {
  afterEach(() => jest.clearAllMocks());

  test('create uses findByUserId when no empresa and not created via findByName', async () => {
    const req = { body: {}, userId: 'u1', role: 'comum' };
    const res = resMock();

    empresaRepository.findById.mockResolvedValue(null);
    empresaRepository.findByName.mockResolvedValue(null);
    empresaRepository.findByUserId.mockResolvedValue({ id_empresa: 'euser' });

    await controller.create(req, res);

    expect(empresaRepository.findByUserId).toHaveBeenCalledWith('u1');
  });
});
