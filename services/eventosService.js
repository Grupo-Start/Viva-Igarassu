import eventosRepository from "../repositories/eventosRepository.js";

class EventosService {

  async getAll() {
    return await eventosRepository.findAll();
  }

  async getById(id) {
    const evento = await eventosRepository.findById(id);

    if (!evento) {
      throw new Error('Evento não encontrado');
    }

    return evento;
  }

  async create(data) {
    const {
      nome,
      descricao,
      data: dataRaw,
      horario: horarioRaw,
      id_endereco,
      id_empresa
    } = data;

    // validações simples
    if (!nome || !dataRaw || !id_endereco || !id_empresa) {
      throw new Error('Campos obrigatórios não preenchidos');
    }

    //Conversões importantes para Prisma
    const dataFormatada = new Date(dataRaw);

    const horarioFormatado = horarioRaw
      ? new Date(`1970-01-01T${horarioRaw}Z`)
      : null;

    return await eventosRepository.create({
      nome,
      descricao,
      data: dataFormatada,
      horario: horarioFormatado,
      id_endereco: Number(id_endereco),
      id_empresa: String(id_empresa)
    });
  }

  async update(id, data) {
    await this.getById(id);

    const {
      nome,
      descricao,
      data: dataRaw,
      horario: horarioRaw,
      id_endereco,
      id_empresa
    } = data;

    //Conversões somente dos campos enviados
    const dataFormatada = dataRaw ? new Date(dataRaw) : undefined;

    const horarioFormatado = horarioRaw
      ? new Date(`1970-01-01T${horarioRaw}Z`)
      : undefined;

    return await eventosRepository.update(id, {
      nome,
      descricao,
      data: dataFormatada,
      horario: horarioFormatado,
      id_endereco: id_endereco !== undefined ? Number(id_endereco) : undefined,
      id_empresa: id_empresa !== undefined ? String(id_empresa) : undefined
    });
  }

  async delete(id) {
    await this.getById(id);
    return await eventosRepository.delete(id);
  }
}

export default new EventosService();
