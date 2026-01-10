import eventosService from "../services/eventosService.js";
import empresaRepository from "../repositories/empresaRepository.js";
import { buildImageUrl } from "../utils/imageUrl.js";

async function getAll(req, res) {
  try {
    const eventos = await eventosService.getAll();
    const mapped = (eventos || []).map(e => ({
      ...e,
      imagem: buildImageUrl(e.imagem_path)
    }));
    return res.status(200).json(mapped);
  } catch (error) {
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
}

async function getById(req, res) {
  try {
    const { id } = req.params;
    const evento = await eventosService.getById(id);
    if (evento) {
      evento.imagem = buildImageUrl(evento.imagem_path);
    }
    return res.status(200).json(evento);
  } catch (error) {
    return res
      .status(error.status || 500)
      .json({ message: error.message });
  }
}

async function create(req, res) {
  try {
    const role = req.userRole || req.role;
    

    let id_empresa = req.id_empresa;
    if (!id_empresa && req.body && req.body.id_empresa) {
      id_empresa = req.body.id_empresa;
    }

    let empresa = null;
    if (id_empresa) {
      empresa = await empresaRepository.findById(id_empresa);
    }

    if (!empresa && role === "adm") {
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

    const file = req.file || (Array.isArray(req.files) && req.files[0]);
    if (file) {
      data.imagem_path = file.path || file.secure_url || file.url || file.location || (file.filename ? `/uploads/eventos/${file.filename}` : null);
    }

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

    let id_empresa = req.body && req.body.id_empresa ? req.body.id_empresa : req.id_empresa;
    let empresa = null;
    if (id_empresa) empresa = await empresaRepository.findById(id_empresa);
    const role = req.userRole || req.role;
    if (!empresa && role === "adm") {
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

    const file = req.file || (Array.isArray(req.files) && req.files[0]);
    if (file) {
      data.imagem_path = file.path || file.secure_url || file.url || file.location || (file.filename ? `/uploads/eventos/${file.filename}` : null);
    }

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
    const usuario = {
      id_usuario: req.userId,
      role: req.userRole,
      id_empresa: req.id_empresa
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

