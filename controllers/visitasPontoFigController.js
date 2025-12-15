import visitasService from "../services/visitasPontoFigService.js";

async function visitarViaQr(req, res) {
  try {
    const { token } = req.query;
    const usuarioId = req.userId; 

    const resultado = await visitasService.visitarViaQr({
      token,
      usuarioId
    });

    return res.status(201).json(resultado);

  } catch (error) {
    return res.status(400).json({
      message: error.message || "Erro ao registrar visita"
    });
  }
}

export default {
  visitarViaQr
};
