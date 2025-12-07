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
    where: { id_ponto: Number(id) },
    data
  });
}

async function deletarPonto(id) {
  try {
    return await prisma.pontos_turisticos.delete({
      where: { id_ponto: id }
    });
  } catch (error) {
    if (error.code === 'P2025') {
      return null; 
    }
    throw error;
  }
}



export default {
  listarTodos,
  criarPonto,
  atualizarPonto,
  deletarPonto
};
