import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class EmpresaRepository {

  async findAll() {
    return await prisma.empresa.findMany({
      include: {
        usuarios: true, 
      }
    });
  }

  async findById(id) {
    return await prisma.empresa.findUnique({
      where: { id_empresa: String(id) },
      include: {
        usuarios: true,
      }
    });
  }

  async create(data) {
    return await prisma.empresa.create({
      data
    });
  }

  async update(id, data) {
    return await prisma.empresa.update({
      where: { id_empresa: String(id) },
      data
    });
  }

  async delete(id) {
    return await prisma.empresa.delete({
      where: { id_empresa: String(id) }
    });
  }
}

export default new EmpresaRepository();
