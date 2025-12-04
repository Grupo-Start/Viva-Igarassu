import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class EventosRepository {
  async findAll() {
    return await prisma.eventos.findMany({
      include: {
        empresa: true,
        enderecos: true,
      },
    });
  }

  async findById(id) {
    return await prisma.eventos.findUnique({
      where: { id_evento: Number(id) },
      include: {
        empresa: true,
        enderecos: true,
      },
    });
  }

  async create(data) {
    return await prisma.eventos.create({
      data,
    });
  }

  async update(id, data) {
    return await prisma.eventos.update({
      where: { id_evento: Number(id) },
      data,
    });
  }

  async delete(id) {
    return await prisma.eventos.delete({
      where: { id_evento: Number(id) },
      include: {
        empresa: true,
        enderecos: true,
      },
    });
  }
}

export default new EventosRepository();