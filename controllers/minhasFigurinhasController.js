import minhasFigurinhasService from "../services/minhasFigurinhasService.js";
import { wrap } from "./baseController.js";

async function listar(req, res) {
  const usuarioId = req.userId;
  const figurinhas = await minhasFigurinhasService.listarPorUsuario(usuarioId);
  return res.status(200).json(figurinhas);
}

export default {
  listar: wrap(listar)
};

