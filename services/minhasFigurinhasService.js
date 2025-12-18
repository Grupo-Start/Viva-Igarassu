import figurinhasRepository from "../repositories/figurinhasRepository.js";
import userFigurinhaRepository from "../repositories/userFigurinhaRepository.js";

async function listarPorUsuario(usuarioId) {

  const todasFigurinhas = await figurinhasRepository.findAllFigurinha();

  const figurinhasUsuario =
    await userFigurinhaRepository.findAllByUsuario(usuarioId);

  const conquistadasSet = new Set(
    figurinhasUsuario.map(f => f.id_figurinha)
  );

  const figurinhas = todasFigurinhas.map(fig => ({
    ...fig,
    conquistada: conquistadasSet.has(fig.id_figurinha)
  }));

  return {
    total: todasFigurinhas.length,
    conquistadas: figurinhasUsuario.length,
    figurinhas
  };
}

export default {
  listarPorUsuario
};
