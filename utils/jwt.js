import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'changeme_secret';
const DEFAULT_EXP = process.env.JWT_EXP || '7d';

export function sign(payload, opts = {}) {
  const options = { expiresIn: opts.expiresIn || DEFAULT_EXP, ...(opts.extra || {}) };
  return jwt.sign(payload, SECRET, options);
}

export function verify(token) {
  if (!token) throw new Error('Token is required');
  return jwt.verify(token, SECRET);
}

export function decode(token) {
  return jwt.decode(token);
}

export default {
  sign,
  verify,
  decode
};
