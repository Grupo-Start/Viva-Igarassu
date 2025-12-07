import pontosRepo from "../repositories/pontos_turisticosRepository.js";

async function listarPublico() {
  return await pontosRepo.listarTodos();
}

async function criarPonto(dados) {
  return await pontosRepo.criarPonto(dados);
}

async function atualizarPonto(id, dados) {
  return await pontosRepo.atualizarPonto(id, dados);
}

async function deletarPonto(id) {
  const resultado = await pontosRepo.deletarPonto(id);
  if (!resultado) {
    return { notFound: true };
  }
  return resultado;
}


export default {
  listarPublico,
  criarPonto,
  atualizarPonto,
  deletarPonto
};
