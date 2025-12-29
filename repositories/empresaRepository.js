import prisma from "../database/prismaClient.js";


async function findAll() {
  return await prisma.empresa.findMany({
    include: {
      usuarios: true,
    },
  });
}

async function findById(id) {
  return await prisma.empresa.findUnique({
    where: { id_empresa: String(id) },
    include: {
      usuarios: true,
    },
  });
}

async function findByUserId(userId) {
  return await prisma.empresa.findFirst({
    where: { id_usuario: String(userId) },
  });
}

async function findByName(nome) {
  if (!nome) return null;
  return await prisma.empresa.findFirst({
    where: { nome_empresa: String(nome) }
  });
}

async function create(data) {
  return await prisma.empresa.create({
    data,
  });
}

async function update(id, data) {
  return await prisma.empresa.update({
    where: { id_empresa: String(id) },
    data,
  });
}

async function deleteEmpresa(id) {
  return await prisma.empresa.delete({
    where: { id_empresa: String(id) },
  });
}

async function countEventosByEmpresaId(id) {
  return await prisma.eventos.count({
    where: { id_empresa: String(id) }
  });
}

async function countEventosByEmpresaByMonth(id, year) {
  const y = Number(year) || new Date().getFullYear();
  const start = new Date(y, 0, 1);
  const end = new Date(y, 11, 31, 23, 59, 59, 999);

  const eventos = await prisma.eventos.findMany({
    where: {
      id_empresa: String(id),
      data: {
        gte: start,
        lte: end
      }
    },
    select: {
      data: true
    }
  });

  const counts = Array(12).fill(0);
  eventos.forEach(e => {
    if (e.data instanceof Date) {
      const m = e.data.getMonth(); // 0-11
      counts[m]++;
    } else {
      const d = new Date(e.data);
      if (!isNaN(d)) counts[d.getMonth()]++;
    }
  });

  return counts;
}

export default {
  findAll,
  findById,
  findByUserId,
  findByName,
  create,
  update,
  delete: deleteEmpresa,
  countEventosByEmpresaId
  ,countEventosByEmpresaByMonth
};
