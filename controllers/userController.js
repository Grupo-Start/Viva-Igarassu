import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const login = async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ message: "Email e senha são obrigatórios" });
  }

  try {
    const usuario = await prisma.usuarios.findUnique({
      where: { email },
    });

    if (!usuario) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(401).json({ message: "Senha incorreta" });
    }

    const token = jwt.sign(
      { id: usuario.id_usuario },
      process.env.JWT_SECRET || "segredo-super-seguro",
      { expiresIn: "1d" }
    );

    return res.json({
      message: "Login realizado com sucesso",
      token,
      usuario: {
        id: usuario.id_usuario,
        nome: usuario.nome_completo,
        email: usuario.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro no servidor", error });
  }
};


export const cadastrar = async (req, res) => {
  try {
    const { nome_completo, email, senha } = req.body;

    if (!nome_completo || !email || !senha) {
      return res.status(400).json({ message: "Preencha todos os campos" });
    }
    const rolesPermitidas = ["comum", "adm", "empreendedor"]
    const {role} = req.body;

    if (!rolesPermitidas.includes(role)){
      return res.status(400).json({
        message: "Tipo de usuário inválido. As roles permitidas são: comum, adm, empreendedor"
      });
    }

    const existeEmail = await prisma.usuarios.findUnique({
      where: { email }
    });

    if (existeEmail) {
      return res.status(400).json({ message: "Já existe um usuário com esse e-mail" });
    }

    const hash = await bcrypt.hash(senha, 10);

    const novoUsuario = await prisma.usuarios.create({
      data: {
        nome_completo,
        email,
        senha: hash,
        role: role
      }
    });

    return res.status(201).json({
      message: "Usuário criado com sucesso!",
      usuario: {
      id: novoUsuario.id_usuario,
      nome: novoUsuario.nome_completo,
      email: novoUsuario.email
      }
    });

  } catch (error) {
      console.error("Erro ao cadastrar:", error);
      return res.status(500).json({ message: "Erro no servidor", error });
      error: String(error)
    }
  };

