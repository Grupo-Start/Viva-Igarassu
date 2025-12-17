import recompensasRepository from "../repositories/recompensasRepository.js";

async function getAllByEmpresa(id_empresa) {
  return await recompensasRepository.findAllByEmpresa(id_empresa);
}

async function getById(id) {
  const recompensa = await recompensasRepository.findById(id);

  if (!recompensa) {
    throw new Error("Recompensa não encontrada");
  }

  return recompensa;
}

async function create(data) {
  const {
    nome,
    descricao,
    quantidade_disponivel,
    preco_moedas,
    id_empresa
  } = data;

  if (!nome || !preco_moedas || !id_empresa) {
    throw new Error("Campos obrigatórios não preenchidos");
  }

  return await recompensasRepository.create({
    nome,
    descricao,
    quantidade_disponivel,
    preco_moedas,
    id_empresa: String(id_empresa)
  });
}

async function update(id, data) {
  await getById(id);

  const {
    nome,
    descricao,
    quantidade_disponivel,
    preco_moedas
  } = data;

  return await recompensasRepository.update(id, {
    nome,
    descricao,
    quantidade_disponivel,
    preco_moedas
  });
}

async function deleteRecompensa(id) {
  await getById(id);
  return await recompensasRepository.delete(id);
}

export default {
  getAllByEmpresa,
  getById,
  create,
  update,
  delete: deleteRecompensa
};
