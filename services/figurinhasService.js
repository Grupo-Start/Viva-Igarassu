import figurinhasRepository from "../repositories/figurinhasRepository.js";

async function createFigurinha(data) {
  return figurinhasRepository.createFigurinha(data);
}

async function findAllFigurinha() {
  return figurinhasRepository.findAllFigurinha();
}

async function findById(id) {
  const figurinha = await figurinhasRepository.findById(id);

  if (!figurinha) {
    throw new Error("Figurinha não encontrada");
  }

  return figurinha;
}

async function updateFigurinha(id, dados) {
  return figurinhasRepository.update(id, dados);
}

async function removeFigurinha(id) {
  return figurinhasRepository.remove(id);
}

export default {
  createFigurinha,
  findAllFigurinha,
  findById,
  updateFigurinha,
  removeFigurinha
};
