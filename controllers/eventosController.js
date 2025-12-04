import eventosService from "../services/eventosService.js";

class EventosController {

  getAll = async (req, res) => {
    try {
      const eventos = await eventosService.getAll();
      res.status(200).json(eventos);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  getById = async (req, res) => {
    try {
      const { id } = req.params;
      const evento = await eventosService.getById(id);
      res.status(200).json(evento);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  create = async (req, res) => {
    try {
      const data = req.body;
      const evento = await eventosService.create(data);
      res.status(201).json(evento);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  update = async (req, res) => {
    try {
      const { id } = req.params;
      const data = req.body;
      const evento = await eventosService.update(id, data);
      res.status(200).json(evento);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  delete = async (req, res) => {
    try {
      const { id } = req.params;
      await eventosService.delete(id);
      return res.status(200).json({
        message: "Evento excluído com sucesso"
});
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

export default new EventosController();