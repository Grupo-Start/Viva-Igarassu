import empresaService from "../services/empresaService.js";

async function getAll(req, res) {
  try {
    const empresas = await empresaService.getAll();
    return res.status(200).json(empresas);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function getById(req, res) {
  try {
    const { id } = req.params;

    const empresa = await empresaService.getById(id);

    if (!empresa) {
      return res.status(404).json({ message: "Empresa não encontrada" });
    }

    return res.status(200).json(empresa);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function create(req, res) {
  try {
    const empresa = await empresaService.create(req.body);
    return res.status(201).json(empresa);
  } catch (error) {
    const status = error.status || 400;
    return res.status(status).json({ message: error.message });
  }
}

async function update(req, res) {
  try {
    const { id } = req.params;
    const dados = req.body;

    const empresa = await empresaService.update(id, dados);

    if (!empresa) {
      return res.status(404).json({ message: "Empresa não encontrada" });
    }

    return res.status(200).json(empresa);
  } catch (error) {
    const status = error.status || 400;
    return res.status(status).json({ message: error.message });
  }
}

async function deleteEmpresa(req, res) {
  try {
    const { id } = req.params;

    const deleted = await empresaService.delete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Empresa não encontrada" });
    }

    return res.status(200).json({
  message: "Empresa excluída com sucesso"
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
  delete: deleteEmpresa
};


