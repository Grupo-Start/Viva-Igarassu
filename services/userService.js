import prisma from "../database/prismaClient.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";
import resetTokens from "../utils/resetTokens.js";
import emailUtil from "../utils/email.js";


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

async function logout(token) {
  const decoded = jwt.decode(token);
  const expiraEm = new Date(decoded.exp * 1000);

  await prisma.token_blacklist.create({
    data: {
      token,
      expira_em: expiraEm
    }
  });

  return { message: "Logout realizado com sucesso" };
}

async function getAllUsers() {
  const usuarios = await prisma.usuarios.findMany({
    select: {
      id_usuario: true,
      nome_completo: true,
      email: true,
      role: true,
      preferencia: true,
      data_cadastro: true,
      saldo_moedas: true
    },
    orderBy: {
      data_cadastro: 'desc'
    }
  });

  return usuarios;
}

async function forgotPassword(email) {
  if (!email) throw { status: 400, message: "Email é obrigatório" };

  const user = await prisma.usuarios.findUnique({ where: { email } });
  if (!user) {
    // Não vazar informação: responder OK mesmo se não existir
    return { message: "Se o e-mail existir, instruções serão enviadas" };
  }

  const token = await resetTokens.createToken(user.id_usuario);

  // Enviar token por e-mail
  try {
    await emailUtil.sendResetPasswordEmail(user.email, token);
  } catch (err) {
    console.error("Erro ao enviar e-mail de reset:", err);
  }

  // Não retornar o token na resposta em produção
  return { message: "Se o e-mail existir, instruções foram enviadas" };
}

async function resetPassword(token, novaSenha) {
  if (!token || !novaSenha) throw { status: 400, message: "Token e nova senha são obrigatórios" };

  const data = await resetTokens.findToken(token);
  if (!data) throw { status: 400, message: "Token inválido ou expirado" };

  const hash = await bcrypt.hash(novaSenha, 10);

  await prisma.usuarios.update({
    where: { id_usuario: data.userId },
    data: { senha: hash }
  });

  await resetTokens.removeToken(token);

  return { message: "Senha redefinida com sucesso" };
}

export default {
  login,
  cadastrar,
  getById,
  updateMe,
  logout,
  getAllUsers
  ,forgotPassword, resetPassword
};

