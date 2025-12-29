import service from '../../services/figurinhasService.js';

describe('figurinhasService smoke', () => {
  it('exports an object', () => {
    expect(typeof service).toBe('object');
  });
});
