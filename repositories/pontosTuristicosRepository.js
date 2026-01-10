import prisma from "../database/prismaClient.js";

async function listarTodos() {
  return await prisma.pontos_turisticos.findMany({
    include: {
      enderecos: {
        select: {
          logradouro: true,
          numero: true,
          bairro: true,
          cidade: true,
          estado: true,
          cep: true
        }
      },
      figurinhas: true
    }
  });
}

async function findById(id) {
  if (!id) {
    const error = new Error("Parâmetro 'id' é obrigatório para buscar ponto turístico.");
    error.status = 400;
    throw error;
  }

  return await prisma.pontos_turisticos.findUnique({
    where: { id_ponto: String(id) },
    include: {
      enderecos: {
        select: {
          logradouro: true,
          numero: true,
          bairro: true,
          cidade: true,
          estado: true,
          cep: true
        }
      },
      figurinhas: true,
      qr_codes: true
    }
  });
}

async function criarPonto(data) {
  return await prisma.pontos_turisticos.create({
    data
  });
}

async function atualizarPonto(id, data) {
  return await prisma.pontos_turisticos.update({
    where: { id_ponto: String(id) },
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
  findById,
  criarPonto,
  atualizarPonto,
  deletarPonto
};
