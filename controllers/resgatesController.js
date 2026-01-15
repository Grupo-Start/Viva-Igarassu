import resgatesService from "../services/resgatesService.js";
import { wrap } from "./baseController.js";

async function resgatar(req, res) {
  const { id } = req.params;

  const result = await resgatesService.resgatarRecompensa({
    id_usuario: req.userId,
    role: req.userRole,
    id_recompensa: id
  });

  return res.status(201).json(result);
}

async function meusResgates(req, res) {
  const resgates = await resgatesService.listarMeusResgates(req.userId);

  if (resgates.length === 0) {
    return res.status(200).json({
      message: "Nenhum resgate encontrado",
      resgates: []
    });
  }

  return res.status(200).json(resgates);
}

export default {
  resgatar: wrap(resgatar),
  meusResgates: wrap(meusResgates)
};
