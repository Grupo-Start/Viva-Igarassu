import visitaPontoService from "../services/visitasPontoFigService.js";

async function visitar(req, res) {
  try {
    const usuarioId = req.userId;
    const { pontoTuristicoId } = req.body;

    const resultado = await visitaPontoService.visitarPonto({
      usuarioId,
      pontoTuristicoId
    });

    return res.json(resultado);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

export default {
  visitar
};
