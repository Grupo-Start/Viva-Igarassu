import service from '../../services/minhasFigurinhasService.js';

describe('minhasFigurinhasService smoke', () => {
  it('exports an object', () => {
    expect(typeof service).toBe('object');
  });
});
