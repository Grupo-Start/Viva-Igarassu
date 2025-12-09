import eventosService from "../services/eventosService.js";

class EventosController {

  // Listar todos os eventos
  getAll = async (req, res) => {
    try {
      const eventos = await eventosService.getAll();
      res.status(200).json(eventos);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Buscar evento por ID
  getById = async (req, res) => {
    try {
      const { id } = req.params;
      const evento = await eventosService.getById(id);
      res.status(200).json(evento);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  // Criar evento
  create = async (req, res) => {
    try {
      const data = {
        ...req.body,
        id_usuario: req.userId   // garante que o id do usuário venha do token
      };

      const evento = await eventosService.create(data);
      res.status(201).json(evento);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Atualizar evento
  update = async (req, res) => {
    try {
      const { id } = req.params;

      const data = {
        ...req.body,
        id_usuario: req.userId
      };

      const evento = await eventosService.update(id, data);
      res.status(200).json(evento);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Deletar evento
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