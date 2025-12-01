import prisma from "../database/prismaClient.js";

async function listarTodos() {
  return await prisma.pontos_turisticos.findMany();
}

async function criarPonto(data) {
  return await prisma.pontos_turisticos.create({
    data
  });
}

async function atualizarPonto(id, data) {
  return await prisma.pontos_turisticos.update({
    where: { id: Number(id) },
    data
  });
}

async function deletarPonto(id) {
  return await prisma.pontos_turisticos.delete({
    where: { id: Number(id) }
  });
}

export default {
  listarTodos,
  criarPonto,
  atualizarPonto,
  deletarPonto
};
