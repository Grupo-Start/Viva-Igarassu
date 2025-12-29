import service from '../../services/resgatesService.js';

describe('resgatesService smoke', () => {
  it('exports an object', () => {
    expect(typeof service).toBe('object');
  });
});
