
import bcrypt from 'bcryptjs';

const DEFAULT_SALT_ROUNDS = 10;
const DEFAULT_MIN_PASSWORD_LENGTH = 8;

const parsedRounds = Number(process.env.BCRYPT_ROUNDS);
export const SALT_ROUNDS = Number.isInteger(parsedRounds) && parsedRounds > 0 ? parsedRounds : DEFAULT_SALT_ROUNDS;

const parsedMin = Number(process.env.MIN_PASSWORD_LENGTH);
export const MIN_PASSWORD_LENGTH = Number.isInteger(parsedMin) && parsedMin > 0 ? parsedMin : DEFAULT_MIN_PASSWORD_LENGTH;

/**
 * Gera o hash de uma senha.
 * @param {string} password Senha em texto claro
 * @returns {Promise<string>} Hash da senha
 */
export async function hashPassword(password) {
  if (typeof password !== 'string') throw new TypeError('A senha deve ser uma string');
  if (password.length < MIN_PASSWORD_LENGTH) throw new Error(`A senha deve ter ao menos ${MIN_PASSWORD_LENGTH} caracteres`);
  return await bcrypt.hash(password, SALT_ROUNDS);
}

/**
 * Compara uma senha em texto com um hash.
 * @param {string} password Senha em texto claro
 * @param {string} hash Hash salvo
 * @returns {Promise<boolean>} Resultado da comparação
 */
export async function comparePassword(password, hash) {
  if (typeof password !== 'string') throw new TypeError('A senha deve ser uma string');
  if (typeof hash !== 'string') throw new TypeError('Hash deve ser uma string');
  return await bcrypt.compare(password, hash);
}




