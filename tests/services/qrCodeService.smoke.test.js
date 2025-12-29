import service from '../../services/qrCodeService.js';

describe('qrCodeService smoke', () => {
  it('exports an object', () => {
    expect(typeof service).toBe('object');
  });
});
