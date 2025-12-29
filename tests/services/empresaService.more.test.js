import service from '../../services/empresaService.js';
import empresaRepo from '../../repositories/empresaRepository.js';
import eventosRepo from '../../repositories/eventosRepository.js';

jest.mock('../../repositories/empresaRepository.js', () => ({
  __esModule: true,
  default: {
    findAll: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    findByUserId: jest.fn(),
    countEventosByEmpresaId: jest.fn(),
    countEventosByEmpresaByMonth: jest.fn()
  }
}));

jest.mock('../../repositories/eventosRepository.js', () => ({ __esModule: true, default: { findByEmpresaId: jest.fn() } }));

afterEach(() => jest.clearAllMocks());

test('getById throws 404 when not found', async () => {
  empresaRepo.findById.mockResolvedValue(null);
  await expect(service.getById('x')).rejects.toHaveProperty('status', 404);
});

test('create validates required fields', async () => {
  await expect(service.create({})).rejects.toHaveProperty('status', 400);
});

test('countEventos returns total from repository', async () => {
  empresaRepo.findById.mockResolvedValue({ id_empresa: 'e1' });
  empresaRepo.countEventosByEmpresaId.mockResolvedValue(5);
  const res = await service.countEventos('e1');
  expect(res).toEqual({ total: 5 });
});

test('countEventosByUser throws 404 when no empresa for user', async () => {
  empresaRepo.findByUserId.mockResolvedValue(null);
  await expect(service.countEventosByUser('u1')).rejects.toHaveProperty('status', 404);
});

test('getMeEventos returns eventos from eventosRepository', async () => {
  empresaRepo.findByUserId.mockResolvedValue({ id_empresa: 'e2' });
  eventosRepo.findByEmpresaId.mockResolvedValue(['ev1']);
  const res = await service.getMeEventos('u2');
  expect(res).toEqual(['ev1']);
});
