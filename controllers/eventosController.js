import eventosService from "../services/eventosService.js";

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
    const data = {
      ...req.body,
      id_usuario: req.userId
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

    const data = {
      ...req.body,
      id_usuario: req.userId
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
    await eventosService.delete(id);
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

