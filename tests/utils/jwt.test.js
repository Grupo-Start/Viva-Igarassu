import * as jwtUtil from '../../utils/jwt.js';

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(() => 'tok'),
  verify: jest.fn(() => ({ ok: true })),
  decode: jest.fn(() => ({ d: true }))
}));

describe('utils/jwt', () => {
  test('sign returns token', () => {
    const token = jwtUtil.sign({ sub: '1' });
    expect(token).toBe('tok');
  });

  test('verify throws on missing token', () => {
    expect(() => jwtUtil.verify()).toThrow('Token is required');
  });
});
