import empresaService from "../services/empresaService.js";
import { wrap, crud } from "./baseController.js";
import { buildImageUrl } from "../utils/imageUrl.js";

const handlers = crud(empresaService, { idParam: "id" });

async function getAll(req, res) {
  try {
    const empresas = await empresaService.getAll();
    const mapped = (empresas || []).map(e => ({
      ...e,
      imagem: buildImageUrl(e.imagem_path)
    }));
    return res.status(200).json(mapped);
  } catch (err) {
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
}

async function getById(req, res) {
  try {
    const { id } = req.params;
    const empresa = await empresaService.getById(id);
    if (empresa) empresa.imagem = buildImageUrl(empresa.imagem_path);
    return res.status(200).json(empresa);
  } catch (err) {
    if (err && err.message === 'Empresa não encontrada') return res.status(404).json({ message: err.message });
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
}

async function create(req, res) {
  try {
    const data = {
      ...req.body,
      id_usuario: req.userId
    };

    const file = req.file || (Array.isArray(req.files) && req.files[0]);
    if (file) {
      data.imagem_path = file.path || file.secure_url || file.url || file.location || (file.filename ? `/uploads/empresas/${file.filename}` : null);
    }

    const empresa = await empresaService.create(data);
    return res.status(201).json(empresa);
  } catch (err) {
    return res.status(400).json({ message: err && err.message ? err.message : 'Erro ao criar empresa' });
  }
}

async function getEventosCount(req, res) {
  const { id } = req.params;
  const result = await empresaService.countEventos(id);
  return res.status(200).json(result);
}

async function getMeEventosCount(req, res) {
  const userId = req.userId;
  const result = await empresaService.countEventosByUser(userId);
  return res.status(200).json(result);
}

async function getMeEventos(req, res) {
  const userId = req.userId;
  const eventos = await empresaService.getMeEventos(userId);
  return res.status(200).json(eventos);
}

async function getEventosCountByMonth(req, res) {
  const { id } = req.params;
  const { year } = req.query;
  if (year !== undefined && isNaN(Number(year))) {
    return res.status(400).json({ message: "Ano inválido" });
  }
  const result = await empresaService.countEventosByMonth(id, year);
  return res.status(200).json(result);
}

async function getMeEventosCountByMonth(req, res) {
  const userId = req.userId;
  const { year } = req.query;
  if (year !== undefined && isNaN(Number(year))) {
    return res.status(400).json({ message: "Ano inválido" });
  }
  const result = await empresaService.countMeEventosByMonth(userId, year);
  return res.status(200).json(result);
}

export default {
  getAll: wrap(getAll),
  getById: wrap(getById),
  create: wrap(create),
  update: wrap(async (req, res) => {
    try {
      const { id } = req.params;
      const data = {
        ...req.body,
        id_usuario: req.userId
      };
      const file = req.file || (Array.isArray(req.files) && req.files[0]);
      if (file) {
        data.imagem_path = file.path || file.secure_url || file.url || file.location || (file.filename ? `/uploads/empresas/${file.filename}` : null);
      }
      const updated = await empresaService.update(id, data);
      return res.status(200).json(updated);
    } catch (err) {
      if (err && err.message === 'Empresa não encontrada') return res.status(404).json({ message: err.message });
      return res.status(400).json({ message: err && err.message ? err.message : 'Erro ao atualizar empresa' });
    }
  }),
  delete: wrap(async (req, res) => {
    try {
      const id = req.params.id;
      await empresaService.delete(id);
      return res.status(204).send();
    } catch (err) {
      if (err && err.message === 'Empresa não encontrada') return res.status(404).json({ message: err.message });
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }),
  getEventosCount: wrap(getEventosCount),
  getMeEventosCount: wrap(getMeEventosCount),
  getEventosCountByMonth: wrap(getEventosCountByMonth),
  getMeEventosCountByMonth: wrap(getMeEventosCountByMonth),
  getMeEventos: wrap(getMeEventos)
};



