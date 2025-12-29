import service from '../../services/dashboardUsuarioService.js';

describe('dashboardUsuarioService smoke', () => {
  it('exports an object', () => {
    expect(typeof service).toBe('object');
  });
});
