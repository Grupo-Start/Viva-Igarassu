import eventosRepository from "../repositories/eventosRepository.js";
import enderecosRepository from "../repositories/enderecosRepository.js";

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
    endereco_completo,
    id_empresa
  } = data;

  if (!nome || !dataRaw || !id_empresa) {
    const error = new Error("Campos obrigatórios não preenchidos");
    error.status = 400;
    throw error;
  }
  let idEnderecoFinal = id_endereco;

  if (!idEnderecoFinal && endereco_completo) {
    const parsed = parseEndereco(endereco_completo);

    if (!parsed.logradouro || !parsed.cidade || !parsed.estado) {
      const error = new Error("Endereço completo deve conter logradouro, cidade e estado.");
      error.status = 400;
      throw error;
    }

    const enderecoCriado = await enderecosRepository.create(parsed);
    idEnderecoFinal = enderecoCriado.id_endereco;
  }

  if (!idEnderecoFinal) {
    const error = new Error("Endereço não informado");
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
    id_endereco: String(idEnderecoFinal),
    id_empresa: String(id_empresa)
  });
}

function parseEndereco(completo) {
  const parts = completo.split(",").map(p => p.trim()).filter(Boolean);

  let cep = null;
  let estado = null;
  let cidade = null;
  let bairro = null;
  let restante = [];

  if (parts.length > 0) {
    const last = parts[parts.length - 1];
    if (/\d{5}-?\d{3}/.test(last)) {
      cep = last.match(/\d{5}-?\d{3}/)[0];
      parts.pop();
    }
  }

  if (parts.length > 0) {
    const last = parts[parts.length - 1];
    if (/^[A-Za-zÀ-ÖØ-öø-ÿ]{2}$/.test(last)) {
      estado = last.toUpperCase();
      parts.pop();
    }
  }

  if (parts.length > 0) {
    cidade = parts.pop();
  }

  if (parts.length > 0) {
    bairro = parts.pop();
  }

  restante = parts;

  let logradouro = restante.join(", ") || null;
  let numero = null;

  if (logradouro) {
    const m = logradouro.match(/(.*)\s+(\d+[A-Za-z0-9\/-]*)$/);
    if (m) {
      logradouro = m[1].trim();
      numero = m[2].trim();
    }
  }

  return {
    logradouro: logradouro || "",
    numero: numero || "",
    bairro: bairro || "",
    cidade: cidade || "",
    estado: estado || "",
    cep: cep || ""
  };
}

async function update(id, data) {
  await getById(id);

  const {
    nome,
    descricao,
    data: dataRaw,
    horario: horarioRaw,
    id_endereco,
    endereco_completo,
    id_empresa
  } = data;

  const dataFormatada = dataRaw ? new Date(dataRaw) : undefined;

  const horarioFormatado = horarioRaw
    ? new Date(`1970-01-01T${horarioRaw}Z`)
    : undefined;

  let idEnderecoFinal = id_endereco;
  if (!idEnderecoFinal && endereco_completo) {
    const parsed = parseEndereco(endereco_completo);
    const enderecoCriado = await enderecosRepository.create(parsed);
    idEnderecoFinal = enderecoCriado.id_endereco;
  }

  return await eventosRepository.update(id, {
    nome,
    descricao,
    data: dataFormatada,
    horario: horarioFormatado,
    id_endereco: idEnderecoFinal !== undefined ? String(idEnderecoFinal) : undefined,
    id_empresa: id_empresa !== undefined ? String(id_empresa) : undefined
  });
}

async function deleteEvento(id, usuario) {
  const evento = await getById(id);
  if (!evento) {
    const error = new Error("Evento não encontrado");
    error.status = 404;
    throw error;
  }

  if (usuario.role === "adm") {
    return await eventosRepository.delete(id);
  }

  if (usuario.id_empresa && evento.id_empresa === usuario.id_empresa) {
    return await eventosRepository.delete(id);
  }

  const error = new Error("Você não tem permissão para excluir este evento.");
  error.status = 403;
  throw error;
}

export default {
  getAll,
  getById,
  create,
  update,
  delete: deleteEvento
};

