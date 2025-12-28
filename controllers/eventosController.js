import eventosService from "../services/eventosService.js";
import empresaRepository from "../repositories/empresaRepository.js";

async function getAll(req, res) {
  try {
    const eventos = await eventosService.getAll();
    return res.status(200).json(eventos);
  } catch (error) {
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
}

async function getById(req, res) {
  try {
    const { id } = req.params;
    const evento = await eventosService.getById(id);
    return res.status(200).json(evento);
  } catch (error) {
    return res
      .status(error.status || 500)
      .json({ message: error.message });
  }
}

async function create(req, res) {
  try {
    console.log("[DEBUG] Eventos.create - userId:", req.userId, "role:", req.role);
    console.log("[DEBUG] Eventos.create - body:", req.body);

    // Determinar id_empresa automaticamente
    let id_empresa = req.id_empresa;
    if (!id_empresa && req.body && req.body.id_empresa) {
      id_empresa = req.body.id_empresa;
    }

    let empresa = null;
    if (id_empresa) {
      empresa = await empresaRepository.findById(id_empresa);
    }

    // Se não houver empresa e for admin, usar/criar Empresa Admin
    if (!empresa && req.role === "adm") {
      empresa = (empresaRepository.findByName) ? await empresaRepository.findByName("Empresa Admin") : null;
      if (!empresa) {
        const adminEmpresaData = {
          nome_empresa: "Empresa Admin",
          cnpj: "00.000.000/0001-00",
          tipo_servico: "outros",
          id_usuario: req.userId
        };
        empresa = await empresaRepository.create(adminEmpresaData);
      }
      id_empresa = empresa.id_empresa;
    }

    // Se ainda não houver empresa, para usuários não-admin tentamos buscar por userId
    if (!empresa && req.userId) {
      empresa = await empresaRepository.findByUserId(req.userId);
      if (empresa) id_empresa = empresa.id_empresa;
    }

    const data = {
      ...req.body,
      id_usuario: req.userId,
      id_empresa: id_empresa
    };

    const evento = await eventosService.create(data);
    return res.status(201).json(evento);
  } catch (error) {
    return res
      .status(error.status || 400)
      .json({ message: error.message });
  }
}

async function update(req, res) {
  try {
    const { id } = req.params;

    // Preencher id_empresa automaticamente similar à criação
    let id_empresa = req.body && req.body.id_empresa ? req.body.id_empresa : req.id_empresa;
    let empresa = null;
    if (id_empresa) empresa = await empresaRepository.findById(id_empresa);
    if (!empresa && req.role === "adm") {
      empresa = (empresaRepository.findByName) ? await empresaRepository.findByName("Empresa Admin") : null;
      if (!empresa) {
        const adminEmpresaData = {
          nome_empresa: "Empresa Admin",
          cnpj: "00.000.000/0001-00",
          tipo_servico: "outros",
          id_usuario: req.userId
        };
        empresa = await empresaRepository.create(adminEmpresaData);
      }
      id_empresa = empresa.id_empresa;
    }

    if (!empresa && req.userId) {
      empresa = await empresaRepository.findByUserId(req.userId);
      if (empresa) id_empresa = empresa.id_empresa;
    }

    const data = {
      ...req.body,
      id_usuario: req.userId,
      id_empresa: id_empresa
    };

    const evento = await eventosService.update(id, data);
    return res.status(200).json(evento);
  } catch (error) {
    return res
      .status(error.status || 400)
      .json({ message: error.message });
  }
}

async function deleteEvento(req, res) {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Parâmetro 'id' do evento é obrigatório." });
    }
    // Recupera dados do usuário autenticado
    const usuario = {
      id_usuario: req.userId,
      role: req.userRole,
      id_empresa: req.id_empresa // precisa ser setado no auth.js
    };
    await eventosService.delete(id, usuario);
    return res.status(200).json({
      message: "Evento excluído com sucesso"
    });
  } catch (error) {
    return res
      .status(error.status || 500)
      .json({ message: error.message });
  }
}

export default {
  getAll,
  getById,
  create,
  update,
  delete: deleteEvento
};

