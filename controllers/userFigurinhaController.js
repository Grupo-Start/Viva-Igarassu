import visitaPontoService from "../services/visitasPontoFigService.js";
import { wrap } from "./baseController.js";

async function visitar(req, res) {
  const usuarioId = req.userId;
  const { pontoTuristicoId } = req.body;
  try {
    const resultado = await visitaPontoService.visitarPonto({
      usuarioId,
      pontoTuristicoId
    });
    return res.json(resultado);
  } catch (err) {
    const status = err && err.status ? err.status : 400;
    return res.status(status).json({ message: err && err.message ? err.message : 'Erro ao visitar ponto' });
  }
}

export default {
  visitar: wrap(visitar)
};
