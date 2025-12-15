import eventosService from "../services/eventosService.js";

// Listar todos os eventos
async function getAll(req, res) {
  try {
    const eventos = await eventosService.getAll();
    return res.status(200).json(eventos);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

// Buscar evento por ID
async function getById(req, res) {
  try {
    const { id } = req.params;
    const evento = await eventosService.getById(id);

    if (!evento) {
      return res.status(404).json({ message: "Evento não encontrado" });
    }

    return res.status(200).json(evento);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

// Criar evento
async function create(req, res) {
  try {
    const data = {
      ...req.body,
      id_usuario: req.userId
    };

    const evento = await eventosService.create(data);
    return res.status(201).json(evento);
  } catch (error) {
    const status = error.status || 400;
    return res.status(status).json({ message: error.message });
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

    if (!evento) {
      return res.status(404).json({ message: "Evento não encontrado" });
    }

    return res.status(200).json(evento);
  } catch (error) {
    const status = error.status || 400;
    return res.status(status).json({ message: error.message });
  }
}

async function deleteEvento(req, res) {
  try {
    const { id } = req.params;

    const deleted = await eventosService.delete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Evento não encontrado" });
    }

    return res.status(200).json({
      message: "Evento excluído com sucesso"
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export default {
  getAll,
  getById,
  create,
  update,
  delete: deleteEvento
};
