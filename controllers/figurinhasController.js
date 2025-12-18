import figurinhasService from "../services/figurinhasService.js";

async function createFigurinha(req, res) {
  const figurinha = await figurinhasService.create(req.body);
  return res.status(201).json(figurinha);
}

async function findAllFigurinha(req, res) {
  const figurinhas = await figurinhasService.findAll();
  return res.json(figurinhas);
}

async function findById(req, res) {
  try {
    const figurinha = await figurinhasService.findById(req.params.id);
    return res.json(figurinha);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
}

async function updateFigurinha(req, res) {
  const figurinha = await figurinhasService.update(
    req.params.id,
    req.body
  );
  return res.json(figurinha);
}

async function removeFigurinha(req, res) {
  await figurinhasService.remove(req.params.id);
  return res.status(204).send();
}

export default {
  createFigurinha,
  findAllFigurinha,
  findById,
  updateFigurinha,
  removeFigurinha
};
