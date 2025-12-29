import enderecosRepository from "../repositories/enderecosRepository.js";

async function getById(req, res) {
  try {
    const { id } = req.params;
    const endereco = await enderecosRepository.findById(id);
    if (!endereco) {
      return res.status(404).json({ message: "Endereço não encontrado" });
    }
    return res.status(200).json(endereco);
  } catch (error) {
    return res.status(500).json({ message: "Erro ao buscar endereço" });
  }
}

async function create(req, res) {
  try {
    let data = req.body || {};

    const enderecoCompletoRaw = data.endereco_completo || data.enderecoCompleto || data.endereco || data.address || data.address_full;
    if (enderecoCompletoRaw && (!data.logradouro || !data.cidade || !data.estado)) {
      const parsed = parseEndereco(enderecoCompletoRaw);
      data = { ...data, ...parsed };
    }

    console.log('[DEBUG] Enderecos.create - content-type:', req.headers['content-type']);
    console.log('[DEBUG] Enderecos.create - raw body:', req.body);

    const allowed = {};
    allowed.logradouro = (data.logradouro || "").toString().trim().slice(0,150);
    allowed.numero = data.numero ? data.numero.toString().trim().slice(0,10) : "";
    allowed.bairro = data.bairro ? data.bairro.toString().trim().slice(0,100) : "";
    allowed.cidade = (data.cidade || "").toString().trim().slice(0,100);
    allowed.estado = data.estado ? data.estado.toString().trim().toUpperCase().slice(0,2) : undefined;
    allowed.cep = data.cep ? data.cep.toString().trim().slice(0,9) : "";

    if (data.latitude !== undefined && data.latitude !== null && data.latitude !== "") {
      const lat = parseFloat(String(data.latitude).replace(',', '.'));
      if (Number.isFinite(lat)) allowed.latitude = lat;
    }
    if (data.longitude !== undefined && data.longitude !== null && data.longitude !== "") {
      const lon = parseFloat(String(data.longitude).replace(',', '.'));
      if (Number.isFinite(lon)) allowed.longitude = lon;
    }

    if (!allowed.logradouro || !allowed.cidade || !allowed.estado) {
      return res.status(400).json({ message: "Campos obrigatórios: logradouro, cidade, estado" });
    }

    Object.keys(allowed).forEach(k => allowed[k] === undefined && delete allowed[k]);

    console.log('[DEBUG] Enderecos.create - sanitized data:', allowed);
    try {
      const endereco = await enderecosRepository.create(allowed);
      return res.status(201).json(endereco);
    } catch (err) {
      console.error('Erro ao criar endereco (prisma):', err && err.stack ? err.stack : err);
      return res.status(500).json({ message: 'Erro ao criar endereço', detail: err && err.message ? err.message : String(err) });
    }
  } catch (error) {
    console.error('Erro ao criar endereco:', error);
    return res.status(500).json({ message: "Erro ao criar endereço" });
  }
}

function parseEndereco(completo) {
  const parts = String(completo).split(',').map(p => p.trim()).filter(Boolean);

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

  if (parts.length > 0) cidade = parts.pop();
  if (parts.length > 0) bairro = parts.pop();
  restante = parts;

  let logradouro = restante.join(', ') || "";
  let numero = null;
  if (logradouro) {
    const m = logradouro.match(/(.*)\s+(\d+[A-Za-z0-9\/\-]*)$/);
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

export default {
  getById,
  create
};

