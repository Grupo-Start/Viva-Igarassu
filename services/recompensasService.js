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
    id_empresa,
    imagem_path
  } = data;

  if (!nome || preco_moedas === undefined || !id_empresa) {
    throw new Error("Campos obrigatórios não preenchidos");
  }

  const quantidadeNum = quantidade_disponivel !== undefined ? Number(quantidade_disponivel) : undefined;
  const precoNum = preco_moedas !== undefined ? Number(preco_moedas) : undefined;

  if (quantidade_disponivel !== undefined && Number.isNaN(quantidadeNum)) {
    throw new Error("Campo 'quantidade_disponivel' inválido");
  }
  if (preco_moedas !== undefined && Number.isNaN(precoNum)) {
    throw new Error("Campo 'preco_moedas' inválido");
  }

  const createData = {
    nome,
    descricao,
    quantidade_disponivel: quantidadeNum,
    preco_moedas: precoNum,
    id_empresa: String(id_empresa)
  };

  if (imagem_path) createData.imagem_path = imagem_path;

  return await recompensasRepository.create(createData);
}

async function update(id, data) {
  await getById(id);

  const {
    nome,
    descricao,
    quantidade_disponivel,
    preco_moedas
  } = data;

  const quantidadeNum = quantidade_disponivel !== undefined ? Number(quantidade_disponivel) : undefined;
  const precoNum = preco_moedas !== undefined ? Number(preco_moedas) : undefined;

  if (quantidade_disponivel !== undefined && Number.isNaN(quantidadeNum)) {
    throw new Error("Campo 'quantidade_disponivel' inválido");
  }
  if (preco_moedas !== undefined && Number.isNaN(precoNum)) {
    throw new Error("Campo 'preco_moedas' inválido");
  }

  return await recompensasRepository.update(id, {
    nome,
    descricao,
    quantidade_disponivel: quantidadeNum,
    preco_moedas: precoNum
  });
}

async function deleteRecompensa(id) {
  await getById(id);
  return await recompensasRepository.delete(id);
}

async function updateImagem(id, imagemPath) {
  await getById(id);
  return await recompensasRepository.updateImagem(id, imagemPath);
}

export default {
  getAllByEmpresa,
  getById,
  create,
  update,
  delete: deleteRecompensa,
  updateImagem
};
