import jwt from "jsonwebtoken";
import prisma from "../database/prismaClient.js";

export default async function auth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Token não fornecido" });
  }

  const [, token] = authHeader.split(" ");

  try {
    const tokenNaBlacklist = await prisma.token_blacklist.findUnique({
      where: { token }
    });

    if (tokenNaBlacklist) {
      return res.status(401).json({ message: "Token invalidado. Faça login novamente." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.id_usuario;
    req.userRole = decoded.role;
    try {
      const empresa = await prisma.empresa.findFirst({ where: { id_usuario: decoded.id_usuario } });
      req.id_empresa = empresa ? empresa.id_empresa : undefined;
    } catch (e) {
      req.id_empresa = undefined;
    }
    req.token = token;

    return next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido" });
  }
}
