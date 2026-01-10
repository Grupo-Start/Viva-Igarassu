import pontosRepository from "../repositories/pontosTuristicosRepository.js";
import qrCodeService from "./qrCodeService.js";

async function listarPublico() {
  return pontosRepository.listarTodos();
}

async function getById(id) {
  const ponto = await pontosRepository.findById(id);
  if (!ponto) {
    const error = new Error('Ponto turístico não encontrado');
    error.status = 404;
    throw error;
  }
  return ponto;
}

async function criarPonto(dados) {
  try {
    const ponto = await pontosRepository.criarPonto(dados);
    try {
      const qr = await qrCodeService.gerarQrCodeParaPonto(ponto.id_ponto);
      return {
        ...ponto,
        qr_code: qr.qrCodeBase64
      };
    } catch (qrErr) {
      console.error('Erro ao gerar QR para ponto:', qrErr && qrErr.stack ? qrErr.stack : qrErr);
      return ponto;
    }
  } catch (err) {
    console.error('pontosService.criarPonto - erro ao criar ponto:', err && err.stack ? err.stack : err);
    const e = new Error(err.message || 'Erro ao criar ponto');
    e.code = err.code || null;
    e.meta = err.meta || null;
    throw e;
  }
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
