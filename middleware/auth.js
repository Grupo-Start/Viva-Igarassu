import jwt from "jsonwebtoken";

export default function auth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Token não fornecido" });
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.id;
    req.role = decoded.role;

    return next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido" });
    console.log("AUTH HEADER:", req.headers.authorization);

  }
}
