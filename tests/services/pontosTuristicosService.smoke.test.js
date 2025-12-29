import service from '../../services/pontosTuristicosService.js';

describe('pontosTuristicosService smoke', () => {
  it('exports an object', () => {
    expect(typeof service).toBe('object');
  });
});
