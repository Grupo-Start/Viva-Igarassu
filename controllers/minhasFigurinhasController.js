import minhasFigurinhasService from "../services/minhasFigurinhasService.js";

async function listar(req, res) {
  try {
    const usuarioId = req.userId;

    const figurinhas = await minhasFigurinhasService.listarPorUsuario(usuarioId);

    return res.status(200).json(figurinhas);
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao buscar figurinhas do usuário",
      error: error.message
    });
  }
}


export default {
  listar
};

