import service from '../../services/qrCodePDFService.js';

describe('qrCodePDFService smoke', () => {
  it('exports an object', () => {
    expect(typeof service).toBe('object');
  });
});
