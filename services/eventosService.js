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

  // Se foi enviado um endereço completo, parseia, valida e cria o registro
  if (!idEnderecoFinal && endereco_completo) {
    const parsed = parseEndereco(endereco_completo);

    // Validação mínima dos campos essenciais
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

// Função utilitária simples para separar um endereço completo em campos.
// Estratégia: separa por vírgulas e interpreta os últimos trechos como
// [cep], [estado], [cidade], [bairro], rest => logradouro+numero.
function parseEndereco(completo) {
  const parts = completo.split(",").map(p => p.trim()).filter(Boolean);

  let cep = null;
  let estado = null;
  let cidade = null;
  let bairro = null;
  let restante = [];

  // Identifica CEP no final
  if (parts.length > 0) {
    const last = parts[parts.length - 1];
    if (/\d{5}-?\d{3}/.test(last)) {
      cep = last.match(/\d{5}-?\d{3}/)[0];
      parts.pop();
    }
  }

  // Estado com 2 letras
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

  // Junta o restante em logradouro possivelmente com número
  let logradouro = restante.join(", ") || null;
  let numero = null;

  if (logradouro) {
    // tenta extrair número do final do logradouro
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
  // usuario: { id_usuario, role, id_empresa }
  const evento = await getById(id);
  if (!evento) {
    const error = new Error("Evento não encontrado");
    error.status = 404;
    throw error;
  }

  // Permite se for admin
  if (usuario.role === "adm") {
    return await eventosRepository.delete(id);
  }

  // Permite se o usuário for dono da empresa do evento
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

