import empresaRepository from "../repositories/empresaRepository.js";

class EmpresaService {

  async getAll() {
    return await empresaRepository.findAll();
  }

  async getById(id) {
    const empresa = await empresaRepository.findById(id);

    if (!empresa) {
      throw new Error("Empresa não encontrada");
    }

    return empresa;
  }

  async create(data) {
  const {
    nome_empresa,
    cnpj,
    tipo_servico,
    id_usuario
  } = data;

  // validações básicas
  if (!nome_empresa || !cnpj || !tipo_servico || !id_usuario) {
    throw new Error("Campos obrigatórios não preenchidos");
  }

  return await empresaRepository.create({
    nome_empresa,
    cnpj,
    tipo_servico,
    id_usuario: String(id_usuario),
    data_cadastro: new Date()
  });
}


  async update(id, data) {
    await this.getById(id);

    const {
      nome_empresa,
      cnpj,
      tipo_servico,
      id_usuario
    } = data;

    return await empresaRepository.update(id, {
      nome_empresa,
      cnpj,
      tipo_servico,
      id_usuario: id_usuario !== undefined ? String(id_usuario) : undefined
    });
  }

  async delete(id) {
    await this.getById(id);
    return await empresaRepository.delete(id);
  }
}

export default new EmpresaService();
