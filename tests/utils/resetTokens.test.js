jest.mock('fs', () => ({
  promises: {
    readFile: jest.fn(),
    writeFile: jest.fn(),
    mkdir: jest.fn()
  }
}));

import resetTokens from '../../utils/resetTokens.js';
import fs from 'fs';

describe('resetTokens util (stubs)', () => {
  afterEach(() => jest.clearAllMocks());

  test('createToken returns a token string and writes file', async () => {
    fs.promises.readFile.mockRejectedValue(new Error('no file'));
    fs.promises.writeFile.mockResolvedValue();
    fs.promises.mkdir.mockResolvedValue();

    const token = await resetTokens.createToken('user1', 1000);
    expect(typeof token).toBe('string');
    expect(fs.promises.writeFile).toHaveBeenCalled();
  });

  test('findToken returns null when not found', async () => {
    fs.promises.readFile.mockResolvedValue(JSON.stringify([]));
    const found = await resetTokens.findToken('nope');
    expect(found).toBeNull();
  });
});
