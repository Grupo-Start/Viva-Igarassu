import service from '../../services/eventosService.js';

describe('eventosService smoke', () => {
  it('exports an object', () => {
    expect(typeof service).toBe('object');
  });
});
