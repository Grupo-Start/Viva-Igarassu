import empresaService from "../services/empresaService.js";
import { wrap, crud } from "./baseController.js";

const handlers = crud(empresaService, { idParam: "id" });

async function create(req, res) {
  const data = {
    ...req.body,
    id_usuario: req.userId
  };
  const empresa = await empresaService.create(data);
  return res.status(201).json(empresa);
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
  getAll: handlers.findAll,
  getById: handlers.getById,
  create: wrap(create),
  update: handlers.update,
  delete: handlers.remove,
  getEventosCount: wrap(getEventosCount),
  getMeEventosCount: wrap(getMeEventosCount),
  getEventosCountByMonth: wrap(getEventosCountByMonth),
  getMeEventosCountByMonth: wrap(getMeEventosCountByMonth),
  getMeEventos: wrap(getMeEventos)
};



