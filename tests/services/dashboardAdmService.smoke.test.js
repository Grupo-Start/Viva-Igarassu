import service from '../../services/dashboardAdmService.js';

describe('dashboardAdmService smoke', () => {
  it('exports an object', () => {
    expect(typeof service).toBe('object');
  });
});
