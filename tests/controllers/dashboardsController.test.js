import dashboardsController from '../../controllers/dashboardsController.js';
import dashboardUsuarioService from '../../services/dashboardUsuarioService.js';
import dashboardAdmService from '../../services/dashboardAdmService.js';
import dashboardEmpresaService from '../../services/dashboardEmpresaService.js';
import empresaService from '../../services/empresaService.js';

jest.mock('../../services/dashboardUsuarioService.js', () => ({ __esModule: true, default: { getDashboardUsuario: jest.fn() } }));
jest.mock('../../services/dashboardAdmService.js', () => ({ __esModule: true, default: { dashboardAdmin: jest.fn(), getVisitasPorPonto: jest.fn(), getVisitasPorPeriodo: jest.fn() } }));
jest.mock('../../services/dashboardEmpresaService.js', () => ({ __esModule: true, default: { getDashboardEmpresa: jest.fn(), getResgatesRecentes: jest.fn(), getRecompensasPorEmpresa: jest.fn() } }));
jest.mock('../../services/empresaService.js', () => ({ __esModule: true, default: { getById: jest.fn() } }));

describe('dashboardsController', () => {
  afterEach(() => jest.clearAllMocks());

  it('dashboardUsuario returns 200 for comum role', async () => {
    const req = { role: 'comum', userId: 1 };
    const data = { foo: 'bar' };
    dashboardUsuarioService.getDashboardUsuario.mockResolvedValue(data);
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await dashboardsController.dashboardUsuario(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(data);
  });

  it('dashboardUsuario returns 403 for non-comum role', async () => {
    const req = { role: 'adm' };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await dashboardsController.dashboardUsuario(req, res);

    expect(res.status).toHaveBeenCalledWith(403);
  });

  it('dashboardAdmin returns 200 for adm role', async () => {
    const req = { role: 'adm', userId: 2 };
    const data = { a: 1 };
    dashboardAdmService.dashboardAdmin.mockResolvedValue(data);
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await dashboardsController.dashboardAdmin(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(data);
  });

  it('dashboardEmpresa denies access when empresa owner mismatch for empreendedor', async () => {
    const req = { role: 'empreendedor', userId: 10, params: { id: '5' } };
    empresaService.getById.mockResolvedValue({ id_empresa: 5, id_usuario: 99 });
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await dashboardsController.dashboardEmpresa(req, res);

    expect(res.status).toHaveBeenCalledWith(403);
  });

  it('getVisitasPorPeriodo returns data for adm role', async () => {
    const req = { role: 'adm', query: { dias: '7' } };
    const out = [{ x: 1 }];
    dashboardAdmService.getVisitasPorPeriodo.mockResolvedValue(out);
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await dashboardsController.getVisitasPorPeriodo(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(out);
  });
});
