import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Token não enviado" });
  }

  try {
    const tokenLimpo = token.replace("Bearer ", "");
    const decoded = jwt.verify(tokenLimpo, process.env.JWT_SECRET);

    req.userId = decoded.id;     // ID do usuário
    req.role = decoded.role;     // Role do usuário

    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido" });
  }
};
