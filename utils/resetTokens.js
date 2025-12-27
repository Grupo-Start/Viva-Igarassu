import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";

const filePath = path.resolve("./database/reset_tokens.json");

async function readStore() {
  try {
    const content = await fs.readFile(filePath, "utf8");
    return JSON.parse(content || "[]");
  } catch (err) {
    return [];
  }
}

async function writeStore(store) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(store, null, 2), "utf8");
}

export async function createToken(userId, expiresInMs = 1000 * 60 * 60) {
  const token = crypto.randomBytes(32).toString("hex");
  const expira_em = Date.now() + expiresInMs;

  const store = await readStore();
  store.push({ token, userId, expira_em });
  await writeStore(store);
  return token;
}

export async function findToken(token) {
  const store = await readStore();
  const item = store.find((t) => t.token === token);
  if (!item) return null;
  if (Date.now() > item.expira_em) return null;
  return { userId: item.userId, expira_em: item.expira_em };
}

export async function removeToken(token) {
  const store = await readStore();
  const filtered = store.filter((t) => t.token !== token);
  await writeStore(filtered);
}

export default { createToken, findToken, removeToken };
