import visitasPontoFigService from "../services/visitasPontoFigService.js";

async function visitarViaQr(req, res) {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({ message: "Token do QR não informado" });
    }

    const resultado = await visitasPontoFigService.visitarViaQr({
      token,
      usuarioId: req.userId,
      role: req.role
    });

    return res.status(201).json(resultado);

  } catch (error) {
    return res.status(error.status || 400).json({
      message: error.message || "Erro ao ganhar figurinha"
    });
  }
}

export default {
  visitarViaQr
};
