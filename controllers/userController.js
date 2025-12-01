import pontosService from "../services/pontos_turisticosService.js";

async function listarPublico(req, res) {
  try {
    const pontos = await pontosService.listarPublico();
    return res.status(200).json(pontos);

  } catch (error) {
    return res.status(500).json({ message: "Erro ao listar pontos turísticos", error });
  }
}

async function criarPonto(req, res) {
  try {
    const ponto = await pontosService.criar(req.body);
    return res.status(201).json(ponto);

  } catch (error) {
    return res.status(500).json({ message: "Erro ao criar ponto turístico", error });
  }
}

async function atualizarPonto(req, res) {
  try {
    const ponto = await pontosService.atualizar(req.params.id, req.body);
    return res.status(200).json(ponto);

  } catch (error) {
    return res.status(500).json({ message: "Erro ao atualizar ponto turístico", error });
  }
}

async function deletarPonto(req, res) {
  try {
    const resposta = await pontosService.deletar(req.params.id);
    return res.status(200).json(resposta);

  } catch (error) {
    return res.status(500).json({ message: "Erro ao deletar ponto turístico", error });
  }
}

export default {
  listarPublico,
  criarPonto,
  atualizarPonto,
  deletarPonto
};
