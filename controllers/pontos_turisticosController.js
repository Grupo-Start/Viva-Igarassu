import pontosService from "../services/pontos_turisticosService.js";

async function listarPublico(req, res) {
  try {
    const pontos = await pontosService.listarPublico();
    return res.status(200).json(pontos);

  } catch (error) {
    const status = error.status || 500;
    return res.status(status).json({ message: "Erro ao listar pontos turísticos" });
  }
}

async function criarPonto(req, res) {
  try {
    const novoPonto = await pontosService.criar(req.body);
    return res.status(201).json(novoPonto);

  } catch (error) {
    const status = error.status || 500;
    return res.status(status).json({ message: "Erro ao criar ponto turístico" });
  }
}

async function atualizarPonto(req, res) {
  try {
    const id = req.params.id;
    const pontoAtualizado = await pontosService.atualizar(id, req.body);

    return res.status(200).json(pontoAtualizado);

  } catch (error) {
    const status = error.status || 500;
    return res.status(status).json({ message: "Erro ao atualizar ponto turístico" });
  }
}

async function deletarPonto(req, res) {
  try {
    const id = req.params.id;
    const resultado = await pontosService.deletar(id);

    return res.status(200).json(resultado);

  } catch (error) {
    const status = error.status || 500;
    return res.status(status).json({ message: "Erro ao remover ponto turístico" });
  }
}

export default {
  listarPublico,
  criarPonto,
  atualizarPonto,
  deletarPonto
};
