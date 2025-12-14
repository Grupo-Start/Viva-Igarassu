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
    const novoPonto = await pontosService.criarPonto(req.body);
    return res.status(201).json(novoPonto);

  } 
  catch (error) {
    console.error("ERRO AO CRIAR PONTO TURÍSTICO:", error);

    const status = error.status || 500;
    return res.status(status).json({ message: "Erro ao criar ponto turístico" });
  }
}

async function atualizarPonto(req, res) {
  try {
    const id = req.params.id;
    const pontoAtualizado = await pontosService.atualizarPonto(id, req.body);

    return res.status(200).json(pontoAtualizado);

  } catch (error) {
    console.error("ERRO AO ATUALIZAR PONTO TURÍSTICO:", error);
    const status = error.status || 500;
    return res.status(status).json({ message: "Erro ao atualizar ponto turístico" });
  }
}

async function deletarPonto(req, res) {
  try {
    const id = req.params.id;
    const resultado = await pontosService.deletarPonto(id);

    if (resultado.notFound) {
      return res.status(404).json({ message: "Ponto turístico não encontrado" });
    }

    return res.status(204).send(); 
  } catch (error) {
    console.error("ERRO AO DELETAR PONTO TURÍSTICO:", error);
    return res.status(500).json({ message: "Erro ao remover ponto turístico" });
  }
}

export default {
  listarPublico,
  criarPonto,
  atualizarPonto,
  deletarPonto
};
