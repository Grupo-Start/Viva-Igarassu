import jwt from "jsonwebtoken";
import prisma from "../database/prismaClient.js";

export default async function auth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Token não fornecido" });
  }

  const [, token] = authHeader.split(" ");

  try {
    // Verificar se o token está na blacklist
    const tokenNaBlacklist = await prisma.token_blacklist.findUnique({
      where: { token }
    });

    if (tokenNaBlacklist) {
      return res.status(401).json({ message: "Token invalidado. Faça login novamente." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.id_usuario;
    req.role = decoded.role;
    req.token = token; // Salvar token para usar no logout

    return next();
  } catch (error) {
    console.log("AUTH HEADER:", req.headers.authorization);
    return res.status(401).json({ message: "Token inválido" });
  }
}
