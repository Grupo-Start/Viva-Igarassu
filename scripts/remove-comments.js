#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const exts = new Set(['.js', '.cjs', '.mjs', '.jsx', '.ts', '.tsx']);

async function getStripModule() {
  try {
    const mod = await import('strip-comments');
    return mod.default || mod;
  } catch (e) {
    console.warn('[remove-comments] pacote strip-comments não encontrado, usando fallback simples.');
    return null;
  }
}

function fallbackStrip(code) {
  // remove block comments
  let out = code.replace(/\/\*[\s\S]*?\*\//g, '');
  // remove line comments (naive)
  out = out.replace(/(^|\n)\s*\/\/.*(?=\n|$)/g, '\n');
  return out;
}

async function walk(dir, stripper) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const ent of entries) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      if (ent.name === 'node_modules' || ent.name === '.git') continue;
      await walk(full, stripper);
    } else if (ent.isFile()) {
      const ext = path.extname(ent.name).toLowerCase();
      if (exts.has(ext)) {
        try {
          const original = fs.readFileSync(full, 'utf8');
          let stripped;
          if (stripper && typeof stripper.block === 'function') {
            stripped = stripper.block(original).replace(/(^|\n)\s*\/\/.*(?=\n|$)/g, '\n');
          } else if (stripper && typeof stripper === 'function') {
            stripped = stripper(original);
          } else {
            stripped = fallbackStrip(original);
          }
          if (stripped !== original) {
            fs.writeFileSync(full, stripped, 'utf8');
            console.log('Stripped comments:', full);
          }
        } catch (e) {
          console.error('Failed processing', full, e.message);
        }
      }
    }
  }
}

async function main() {
  const root = process.cwd();
  console.log('Removing comments from JS/TS files under', root);
  const stripper = await getStripModule();
  await walk(root, stripper);
  console.log('Done. Review changes and commit if OK.');
}

main();
