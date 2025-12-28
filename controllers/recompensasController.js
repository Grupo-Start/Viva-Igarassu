import recompensasService from "../services/recompensasService.js";
import empresaRepository from "../repositories/empresaRepository.js";
import { uploadRecompensaImagem } from "../middleware/upload.js";

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

    console.log("[DEBUG] Recompensas.create - userId:", req.userId, "role:", req.role);
    console.log("[DEBUG] Recompensas.create - body:", req.body);

    // Priorizar id da empresa automático fornecido pelo middleware `auth`
    // Se `req.id_empresa` existir, usá-lo. Se não existir e o usuário for `adm`,
    // iremos procurar/usar a empresa compartilhada `Empresa Admin` ou criá-la.
    const empresaIdAutomatico = req.id_empresa;
    let empresaIdToUse = empresaIdAutomatico;

    if (!empresaIdToUse && req.role === "adm" && req.body && req.body.id_empresa) {
      empresaIdToUse = req.body.id_empresa;
    }

    let empresa = null;
    if (empresaIdToUse) {
      empresa = await empresaRepository.findById(empresaIdToUse);
    }

    // Se for admin e ainda não houver empresa, usar/criar a empresa compartilhada "Empresa Admin"
    if (!empresa && req.role === "adm") {
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

    // se veio arquivo, adiciona o caminho da imagem
    if (req.file) {
      data.imagem_path = `/uploads/recompensas/${req.file.filename}`;
    }

    const recompensa = await recompensasService.create(data);
    return res.status(201).json(recompensa);
  } catch (error) {
    console.error("[ERROR] Recompensas.create -", error);
    const status = error.status || 400;
    return res.status(status).json({ message: error.message });
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

async function uploadImagem(req, res) {
  try {
    const { id } = req.params;

    if (!req.file) {
      return res.status(400).json({ message: "Nenhuma imagem foi enviada" });
    }

    const imagemPath = `/uploads/recompensas/${req.file.filename}`;
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
