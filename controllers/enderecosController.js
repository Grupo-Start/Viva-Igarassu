import enderecosRepository from "../repositories/enderecosRepository.js";

async function getById(req, res) {
  try {
    const { id } = req.params;
    const endereco = await enderecosRepository.findById(id);
    if (!endereco) {
      return res.status(404).json({ message: "Endereço não encontrado" });
    }
    return res.status(200).json(endereco);
  } catch (error) {
    return res.status(500).json({ message: "Erro ao buscar endereço" });
  }
}

export default {
  getById
};
