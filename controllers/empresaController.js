import empresaService from "../services/empresaService.js";

class EmpresaController {

  getAll = async (req, res) => {
    try {
      const empresas = await empresaService.getAll();
      res.status(200).json(empresas);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  getById = async (req, res) => {
    try {
      const { id } = req.params;
      const empresa = await empresaService.getById(id);
      res.status(200).json(empresa);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  create = async (req, res) => {
    try {
      const data = req.body;
      const empresa = await empresaService.create(data);
      res.status(201).json(empresa);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  update = async (req, res) => {
    try {
      const { id } = req.params;
      const data = req.body;
      const empresa = await empresaService.update(id, data);
      res.status(200).json(empresa);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  delete = async (req, res) => {
    try {
      const { id } = req.params;
      await empresaService.delete(id);
      return res.status(200).json({
        message: "Empresa excluída com sucesso"
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

export default new EmpresaController();
