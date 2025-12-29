import service from '../../services/visitasPontoFigService.js';

describe('visitasPontoFigService smoke', () => {
  it('exports an object', () => {
    expect(typeof service).toBe('object');
  });
});
