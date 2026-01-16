import prisma from '../database/prismaClient.js';

async function run() {
  try {
    const cols = await prisma.$queryRawUnsafe("SHOW COLUMNS FROM empresa");
    console.log(JSON.stringify(cols, null, 2));
  } catch (e) {
    console.error('Erro ao consultar colunas:', e.message || e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

run();
