import recompensasService from "../services/recompensasService.js";

async function getAll(req, res) {
  try {
    const { id_empresa } = req.query;

    const recompensas = await recompensasService.getAllByEmpresa(id_empresa);
    return res.status(200).json(recompensas);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function getById(req, res) {
  try {
    const { id } = req.params;
    const recompensa = await recompensasService.getById(id);
    return res.status(200).json(recompensa);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
}

async function create(req, res) {
  try {
    const recompensa = await recompensasService.create(req.body);
    return res.status(201).json(recompensa);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

async function update(req, res) {
  try {
    const { id } = req.params;
    const recompensa = await recompensasService.update(id, req.body);
    return res.status(200).json(recompensa);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

async function deleteRecompensa(req, res) {
  try {
    const { id } = req.params;
    await recompensasService.delete(id);
    return res.status(200).json({
      message: "Recompensa excluída com sucesso"
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

export default {
  getAll,
  getById,
  create,
  update,
  delete: deleteRecompensa
};
