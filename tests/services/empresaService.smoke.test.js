import service from '../../services/empresaService.js';

describe('empresaService smoke', () => {
  it('exports an object', () => {
    expect(typeof service).toBe('object');
  });
});
