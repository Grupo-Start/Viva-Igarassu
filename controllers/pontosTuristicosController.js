import pontosService from "../services/pontosTuristicosService.js";
import empresaRepository from "../repositories/empresaRepository.js";
import enderecosRepository from "../repositories/enderecosRepository.js";
import figurinhasRepository from "../repositories/figurinhasRepository.js";

async function listarPublico(req, res) {
  try {
    const pontos = await pontosService.listarPublico();
    return res.status(200).json(pontos);

  } catch (error) {
    const status = error.status || 500;
    return res.status(status).json({ message: "Erro ao listar pontos turísticos" });
  }
}

async function criarPonto(req, res) {
  try {
    const { body } = req;
    console.log("[DEBUG] Ponto.create - userId:", req.userId, "role:", req.role);
    console.log("[DEBUG] Ponto.create - body:", body);

    // Determinar id_empresa: usar req.id_empresa se existir;
    // se for admin e não houver, usar/criar Empresa Admin
    let id_empresa = req.id_empresa;
    if (!id_empresa && body && body.id_empresa) id_empresa = body.id_empresa;

    let empresa = null;
    if (id_empresa) empresa = await empresaRepository.findById(id_empresa);

    if (!empresa && req.role === "adm") {
      empresa = (empresaRepository.findByName) ? await empresaRepository.findByName("Empresa Admin") : null;
      if (!empresa) {
        empresa = await empresaRepository.create({
          nome_empresa: "Empresa Admin",
          cnpj: "00.000.000/0001-00",
          tipo_servico: "outros",
          id_usuario: req.userId
        });
      }
      id_empresa = empresa.id_empresa;
    }

    // Se não houver empresa para criação, retornar erro
    if (!id_empresa) {
      return res.status(400).json({ message: "Usuário não possui empresa cadastrada" });
    }

    // Se veio endereco_completo, parsear e criar registro em enderecos
    let id_endereco_final = body.id_endereco;
    if (!id_endereco_final && body.endereco_completo) {
      const parsed = parseEndereco(body.endereco_completo);
      if (!parsed.logradouro || !parsed.cidade || !parsed.estado) {
        return res.status(400).json({ message: "Endereço completo deve conter logradouro, cidade e estado." });
      }
      const enderecoCriado = await enderecosRepository.create(parsed);
      id_endereco_final = enderecoCriado.id_endereco;
    }

    // Garantir criação de figurinha mínima se não foi informada
    let id_figurinha_final = body.id_figurinha;
    if (!id_figurinha_final) {
      const nomeFig = (body.nome) ? `${body.nome} - Figurinha` : `Figurinha ${Date.now()}`;
      const dadosFig = {
        nome: nomeFig,
        descricao: body.descricao || "",
        valor_figurinha: 0
      };
      const figurinhaCriada = await figurinhasRepository.createFigurinha(dadosFig);
      id_figurinha_final = figurinhaCriada.id_figurinha;
    }

    const dadosParaCriar = {
      ...body,
      id_empresa,
      id_endereco: id_endereco_final,
      id_figurinha: id_figurinha_final
    };

    const novoPonto = await pontosService.criarPonto(dadosParaCriar);
    return res.status(201).json(novoPonto);

  } catch (error) {
    console.error("ERRO AO CRIAR PONTO TURÍSTICO:", error);

    const status = error.status || 500;
    return res.status(status).json({ message: "Erro ao criar ponto turístico" });
  }
}

// Reuso simples do parser de eventos para dividir endereco_completo
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

  if (parts.length > 0) cidade = parts.pop();
  if (parts.length > 0) bairro = parts.pop();
  restante = parts;

  let logradouro = restante.join(", ") || "";
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

async function atualizarPonto(req, res) {
  try {
    const id = req.params.id;
    const pontoAtualizado = await pontosService.atualizarPonto(id, req.body);

    if (!pontoAtualizado) {
      return res.status(404).json({ message: "Ponto turístico não encontrado" });
    }

    return res.status(200).json(pontoAtualizado);

  } catch (error) {
    console.error("ERRO AO ATUALIZAR PONTO TURÍSTICO:", error);
    return res.status(500).json({ message: "Erro ao atualizar ponto turístico" });
  }
}

async function deletarPonto(req, res) {
  try {
    const id = req.params.id;
    const resultado = await pontosService.deletarPonto(id);

    if (resultado.notFound) {
      return res.status(404).json({ message: "Ponto turístico não encontrado" });
    }

    return res.status(204).send(); 
  } catch (error) {
    console.error("ERRO AO DELETAR PONTO TURÍSTICO:", error);
    return res.status(500).json({ message: "Erro ao remover ponto turístico" });
  }
}

export default {
  listarPublico,
  criarPonto,
  atualizarPonto,
  deletarPonto
};
