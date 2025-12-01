import pontosRepo from "../repositories/pontos_turisticosRepository.js";

async function listarPublico() {
  return await pontosRepo.listarTodos();
}

async function criarPonto(dados) {
  return await pontosRepo.criar(dados);
}

async function atualizarPonto(id, dados) {
  return await pontosRepo.atualizar(id, dados);
}

async function deletarPonto(id) {
  return await pontosRepo.deletar(id);
}

export default {
  listarPublico,
  criarPonto,
  atualizarPonto,
  deletarPonto
};
