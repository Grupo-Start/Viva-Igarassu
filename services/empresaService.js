import empresaRepository from "../repositories/empresaRepository.js";
import eventosRepository from "../repositories/eventosRepository.js";

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
    imagem_path,
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
    imagem_path,
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
    imagem_path,
    id_usuario
  } = data;

  return await empresaRepository.update(id, {
    nome_empresa,
    cnpj,
    tipo_servico,
    imagem_path,
    id_usuario: id_usuario !== undefined ? String(id_usuario) : undefined
  });
}

async function deleteEmpresa(id) {
  await getById(id);
  return await empresaRepository.delete(id);
}

async function countEventos(id) {
  await getById(id); 
  const total = await empresaRepository.countEventosByEmpresaId(id);
  return { total };
}

async function countEventosByUser(userId) {
  const empresa = await empresaRepository.findByUserId(userId);
  if (!empresa) {
    const error = new Error("Empresa não encontrada");
    error.status = 404;
    throw error;
  }

  const total = await empresaRepository.countEventosByEmpresaId(empresa.id_empresa);
  return { total };
}

async function countEventosByMonth(id, year = new Date().getFullYear()) {
  await getById(id);
  const counts = await empresaRepository.countEventosByEmpresaByMonth(id, year);
  return { year: Number(year), counts };
}

async function countMeEventosByMonth(userId, year = new Date().getFullYear()) {
  const empresa = await empresaRepository.findByUserId(userId);
  if (!empresa) {
    const error = new Error("Empresa não encontrada");
    error.status = 404;
    throw error;
  }

  const counts = await empresaRepository.countEventosByEmpresaByMonth(empresa.id_empresa, year);
  return { year: Number(year), counts };
}

async function getMeEventos(userId) {
  const empresa = await empresaRepository.findByUserId(userId);
  if (!empresa) {
    const error = new Error("Empresa não encontrada");
    error.status = 404;
    throw error;
  }

  const eventos = await eventosRepository.findByEmpresaId(empresa.id_empresa);
  return eventos;
}

export default {
  getAll,
  getById,
  create,
  update,
  delete: deleteEmpresa,
  countEventos
  ,countEventosByUser
  ,countEventosByMonth, countMeEventosByMonth
  ,getMeEventos
};


