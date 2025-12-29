import bcrypt from 'bcryptjs';

const SALT_ROUNDS = Number(process.env.BCRYPT_ROUNDS) || 10;

export async function hashPassword(password) {
  if (typeof password !== 'string') throw new TypeError('Password must be a string');
  return await bcrypt.hash(password, SALT_ROUNDS);
}

export async function comparePassword(password, hash) {
  if (typeof password !== 'string') throw new TypeError('Password must be a string');
  return await bcrypt.compare(password, hash);
}

export default {
  hashPassword,
  comparePassword
};
