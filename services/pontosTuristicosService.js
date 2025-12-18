import pontosRepository from "../repositories/pontosTuristicosRepository.js";
import qrCodeService from "./qrCodeService.js";

async function listarPublico() {
  return pontosRepository.listarTodos();
}

async function criarPonto(dados) {
  const ponto = await pontosRepository.criarPonto(dados);

  const qr = await qrCodeService.gerarQrCodeParaPonto(ponto.id_ponto);

  return {
    ...ponto,
    qr_code: qr.qrCodeBase64
  };
}

async function atualizarPonto(id, dados) {
  return pontosRepository.atualizarPonto(id, dados);
}

async function deletarPonto(id) {
  const resultado = await pontosRepository.deletarPonto(id);
  if (!resultado) return { notFound: true };
  return resultado;
}

export default {
  listarPublico,
  criarPonto,
  atualizarPonto,
  deletarPonto
};
