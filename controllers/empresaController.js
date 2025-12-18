import empresaService from "../services/empresaService.js";

async function getAll(req, res) {
  try {
    const empresas = await empresaService.getAll();
    return res.status(200).json(empresas);
  } catch (error) {
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
}

async function getById(req, res) {
  try {
    const { id } = req.params;
    const empresa = await empresaService.getById(id);
    return res.status(200).json(empresa);
  } catch (error) {
    if (error.message === "Empresa não encontrada") {
      return res.status(404).json({ message: error.message });
    }
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
}

async function create(req, res) {
  try {
    const data = {
      ...req.body,
      id_usuario: req.userId
    };
    const empresa = await empresaService.create(data);
    return res.status(201).json(empresa);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

async function update(req, res) {
  try {
    const { id } = req.params;
    const empresa = await empresaService.update(id, req.body);
    return res.status(200).json(empresa);
  } catch (error) {
    if (error.message === "Empresa não encontrada") {
      return res.status(404).json({ message: error.message });
    }
    return res.status(400).json({ message: error.message });
  }
}

async function deleteEmpresa(req, res) {
  try {
    const { id } = req.params;
    await empresaService.delete(id);
    return res.status(200).json({ message: "Empresa excluída com sucesso" });
  } catch (error) {
    if (error.message === "Empresa não encontrada") {
      return res.status(404).json({ message: error.message });
    }
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
}

export default {
  getAll,
  getById,
  create,
  update,
  delete: deleteEmpresa
};



