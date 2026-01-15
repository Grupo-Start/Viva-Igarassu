import visitaPontoService from "../services/visitasPontoFigService.js";
import { wrap } from "./baseController.js";

async function visitar(req, res) {
  const usuarioId = req.userId;
  const { pontoTuristicoId } = req.body;

  const resultado = await visitaPontoService.visitarPonto({
    usuarioId,
    pontoTuristicoId
  });

  return res.json(resultado);
}

export default {
  visitar: wrap(visitar)
};
