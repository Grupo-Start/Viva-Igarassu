import resgatesService from "../services/resgatesService.js";

async function resgatar(req, res) {
  try {
    const { id } = req.params;

    const result = await resgatesService.resgatarRecompensa({
      id_usuario: req.userId,
      role: req.userRole,
      id_recompensa: id
    });

    return res.status(201).json(result);

  } catch (error) {
    return res.status(error.status || 400).json({
      message: error.message || "Erro ao resgatar recompensa"
    });
  }
}

async function meusResgates(req, res) {
  try {
    const resgates = await resgatesService.listarMeusResgates(req.userId);

    if (resgates.length === 0) {
      return res.status(200).json({
        message: "Nenhum resgate encontrado",
        resgates: []
      });
    }

    return res.status(200).json(resgates);

  } catch {
    return res.status(500).json({
      message: "Erro ao buscar resgates"
    });
  }
}

export default {
  resgatar,
  meusResgates
};
