import prisma from "../database/prismaClient.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";


async function login(email, senha) {
  const user = await prisma.usuarios.findUnique({
    where: { email }
  });

  if (!user) {
    throw { message: "Email ou senha inválidos" };
  }

  const senhaOk = await bcrypt.compare(senha, user.senha);

  if (!senhaOk) {
    throw { message: "Email ou senha inválidos" };
  }

 const token = jwt.sign(
  {
    id_usuario: user.id_usuario,
    role: user.role
  },
  process.env.JWT_SECRET,
  { expiresIn: "1h" }
);

  delete user.senha;

  return { user, token };
};

async function cadastrar(dados) {
  const { nome_completo, email, senha, role } = dados;

  if (!nome_completo || !email || !senha) {
    throw { status: 400, message: "Preencha todos os campos." };
  }

  const rolesPermitidas = ["comum", "adm", "empreendedor"];
  if (!rolesPermitidas.includes(role)) {
    throw {
      status: 400,
      message: "Tipo de usuário inválido. Permitidos: comum, adm, empreendedor"
    };
  }

  const existeEmail = await prisma.usuarios.findUnique({
    where: { email }
  });

  if (existeEmail) {
    throw { status: 400, message: "Já existe um usuário com esse e-mail." };
  }

  const hash = await bcrypt.hash(senha, 10);

  const novoUsuario = await prisma.usuarios.create({
    data: {
      nome_completo,
      email,
      senha: hash,
      role
    }
  });

  delete novoUsuario.senha;
  return novoUsuario;
};


async function getById(id) {
  const user = await prisma.usuarios.findUnique({
    where: { id_usuario: id },
  });

  if (!user) return null;

  delete user.senha;
  return user;
};


async function updateMe(id, dados) {

  delete dados.id_usuario;
  delete dados.role
  delete dados.email;

  if (dados.senha) {
    dados.senha = await bcrypt.hash(dados.senha, 10);
  };

  try {
  const user = await prisma.usuarios.update({
    where: { id_usuario: id },
    data: dados
  });

  delete user.senha; 
  return user;

} catch (error){
  if (error.code === "P2002"){
    throw { status: 400, message: "Email já está sendo utilizado por outro usuário." }
  }
  throw {status: 500, message: "Erro ao atualizar o perfil", error };

}
};

export default {
  login,
  cadastrar,
  getById,
  updateMe  
};
