import empresaRepository from "../repositories/empresaRepository.js";

async function getAll() {
  return await empresaRepository.findAll();
}

async function getById(id) {
  const empresa = await empresaRepository.findById(id);

  if (!empresa) {
    const error = new Error("Empresa não encontrada");
    error.status = 404;
    throw error;
  }

  return empresa;
}

async function create(data) {
  const {
    nome_empresa,
    cnpj,
    tipo_servico,
    id_usuario
  } = data;

  if (!nome_empresa || !cnpj || !tipo_servico || !id_usuario) {
    const error = new Error("Campos obrigatórios não preenchidos");
    error.status = 400;
    throw error;
  }

  return await empresaRepository.create({
    nome_empresa,
    cnpj,
    tipo_servico,
    id_usuario: String(id_usuario),
    data_cadastro: new Date()
  });
}

async function update(id, data) {
  await getById(id);

  const {
    nome_empresa,
    cnpj,
    tipo_servico,
    id_usuario
  } = data;

  return await empresaRepository.update(id, {
    nome_empresa,
    cnpj,
    tipo_servico,
    id_usuario: id_usuario !== undefined ? String(id_usuario) : undefined
  });
}

async function deleteEmpresa(id) {
  await getById(id);
  return await empresaRepository.delete(id);
}

export default {
  getAll,
  getById,
  create,
  update,
  delete: deleteEmpresa
};


