import recompensasService from "../services/recompensasService.js";
import empresaRepository from "../repositories/empresaRepository.js";
import { uploadRecompensaImagem } from "../middleware/upload.js";
import { buildImageUrl } from "../utils/imageUrl.js";

async function getAll(req, res) {
  try {
    const { id_empresa } = req.query;

    const recompensas = await recompensasService.getAllByEmpresa(id_empresa);
    const mapped = (recompensas || []).map(r => ({
      ...r,
      imagem: buildImageUrl(r.imagem_path)
    }));
    return res.status(200).json(mapped);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function getById(req, res) {
  try {
    const { id } = req.params;
    const recompensa = await recompensasService.getById(id);
    if (recompensa) {
      recompensa.imagem = buildImageUrl(recompensa.imagem_path);
    }
    return res.status(200).json(recompensa);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
}

async function create(req, res) {
  try {

    

    const empresaIdAutomatico = req.id_empresa;
    let empresaIdToUse = empresaIdAutomatico;

    if (!empresaIdToUse && req.userRole === "adm" && req.body && req.body.id_empresa) {
      empresaIdToUse = req.body.id_empresa;
    }

    let empresa = null;
    if (empresaIdToUse) {
      empresa = await empresaRepository.findById(empresaIdToUse);
    }

    if (!empresa && req.userRole === "adm") {
      empresa = (empresaRepository.findByName) ? await empresaRepository.findByName("Empresa Admin") : null;
      if (!empresa) {
        const adminEmpresaData = {
          nome_empresa: "Empresa Admin",
          cnpj: "00.000.000/0001-00",
          tipo_servico: "outros",
          id_usuario: req.userId
        };
        empresa = await empresaRepository.create(adminEmpresaData);
      }
    }

    if (!empresa) {
      return res.status(404).json({ message: "Usuário não possui empresa cadastrada" });
    }

    const data = {
      ...req.body,
      id_empresa: empresa.id_empresa
    };

    const file = req.file || (Array.isArray(req.files) && req.files[0]);
    if (file) {
      data.imagem_path = file.path || file.secure_url || file.url || file.location || (file.filename ? `/uploads/recompensas/${file.filename}` : null);
    }

    const recompensa = await recompensasService.create(data);
    return res.status(201).json(recompensa);
  } catch (error) {
    const status = error.status || 400;
    return res.status(status).json({ message: error.message });
  }
}

async function update(req, res) {
  try {
    const { id } = req.params;
    const data = { ...req.body };

    const file = req.file || (Array.isArray(req.files) && req.files[0]);
    if (file) {
      data.imagem_path = file.path || file.secure_url || file.url || file.location || (file.filename ? `/uploads/recompensas/${file.filename}` : null);
    }

    const recompensa = await recompensasService.update(id, data);
    return res.status(200).json(recompensa);
  } catch (error) {
    const status = error.status || 500;
    return res.status(status).json({ message: error.message });
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

async function uploadImagem(req, res) {
  try {
    const { id } = req.params;

    const file = req.file || (Array.isArray(req.files) && req.files[0]);
    if (!file) {
      return res.status(400).json({ message: "Nenhuma imagem foi enviada" });
    }

    const imagemPath = file.path || file.secure_url || file.url || file.location || (file.filename ? `/uploads/recompensas/${file.filename}` : null);
    const recompensa = await recompensasService.updateImagem(id, imagemPath);

    return res.status(200).json({
      message: "Imagem da recompensa atualizada com sucesso",
      recompensa: recompensa
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
  delete: deleteRecompensa,
  uploadImagem
};
