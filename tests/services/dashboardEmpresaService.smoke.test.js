import service from '../../services/dashboardEmpresaService.js';

describe('dashboardEmpresaService smoke', () => {
  it('exports an object', () => {
    expect(typeof service).toBe('object');
  });
});
