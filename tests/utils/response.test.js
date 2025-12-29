import * as response from '../../utils/response.js';

describe('utils/response', () => {
  test('success calls res.status and json', () => {
    const json = jest.fn().mockReturnValue({ ok: true });
    const status = jest.fn().mockReturnValue({ json });
    const res = { status };
    const out = response.success(res, { a: 1 }, 201);
    expect(status).toHaveBeenCalledWith(201);
    expect(json).toHaveBeenCalledWith({ success: true, data: { a: 1 } });
    expect(out).toEqual({ ok: true });
  });

  test('error calls res.status and json', () => {
    const json = jest.fn().mockReturnValue({ ok: false });
    const status = jest.fn().mockReturnValue({ json });
    const res = { status };
    const out = response.error(res, 'msg', 400, { e: 1 });
    expect(status).toHaveBeenCalledWith(400);
    expect(json).toHaveBeenCalledWith({ success: false, message: 'msg', meta: { e: 1 } });
    expect(out).toEqual({ ok: false });
  });
});
