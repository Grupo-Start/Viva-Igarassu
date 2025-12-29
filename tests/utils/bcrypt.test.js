import * as bcryptUtil from '../../utils/bcrypt.js';

jest.mock('bcryptjs', () => ({ hash: jest.fn().mockResolvedValue('hashed'), compare: jest.fn().mockResolvedValue(true) }));

describe('utils/bcrypt', () => {
  test('hashPassword throws on non-string', async () => {
    await expect(bcryptUtil.hashPassword(123)).rejects.toThrow(TypeError);
  });

  test('hashPassword and comparePassword work', async () => {
    const h = await bcryptUtil.hashPassword('pass');
    expect(h).toBe('hashed');
    const ok = await bcryptUtil.comparePassword('pass', 'hashed');
    expect(ok).toBe(true);
  });
});
