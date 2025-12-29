import service from '../../services/recompensasService.js';

describe('recompensasService smoke', () => {
  it('exports an object', () => {
    expect(typeof service).toBe('object');
  });
});
