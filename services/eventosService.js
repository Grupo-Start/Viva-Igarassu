import eventosRepository from "../repositories/eventosRepository.js";

async function getAll() {
  return await eventosRepository.findAll();
}

async function getById(id) {
  const evento = await eventosRepository.findById(id);

  if (!evento) {
    const error = new Error("Evento não encontrado");
    error.status = 404;
    throw error;
  }

  return evento;
}

async function create(data) {
  const {
    nome,
    descricao,
    data: dataRaw,
    horario: horarioRaw,
    id_endereco,
    id_empresa
  } = data;

  if (!nome || !dataRaw || !id_endereco || !id_empresa) {
    const error = new Error("Campos obrigatórios não preenchidos");
    error.status = 400;
    throw error;
  }

  
  const dataFormatada = new Date(dataRaw);

  const horarioFormatado = horarioRaw
    ? new Date(`1970-01-01T${horarioRaw}Z`)
    : null;

  return await eventosRepository.create({
    nome,
    descricao,
    data: dataFormatada,
    horario: horarioFormatado,
    id_endereco: Number(id_endereco),
    id_empresa: String(id_empresa)
  });
}

async function update(id, data) {
  await getById(id);

  const {
    nome,
    descricao,
    data: dataRaw,
    horario: horarioRaw,
    id_endereco,
    id_empresa
  } = data;

  const dataFormatada = dataRaw ? new Date(dataRaw) : undefined;

  const horarioFormatado = horarioRaw
    ? new Date(`1970-01-01T${horarioRaw}Z`)
    : undefined;

  return await eventosRepository.update(id, {
    nome,
    descricao,
    data: dataFormatada,
    horario: horarioFormatado,
    id_endereco: id_endereco !== undefined ? Number(id_endereco) : undefined,
    id_empresa: id_empresa !== undefined ? String(id_empresa) : undefined
  });
}

async function deleteEvento(id) {
  await getById(id);
  return await eventosRepository.delete(id);
}

export default {
  getAll,
  getById,
  create,
  update,
  delete: deleteEvento
};

