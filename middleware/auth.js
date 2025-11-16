import jwt from 'jsonwebtoken';

export const auth = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: "Token não enviado" });
    }

    try {
        const tokenLimpo = token.replace("Bearer ", "");
        const decoded = jwt.verify(tokenLimpo, "segredo-super-seguro");

        req.userId = decoded.id;
        next();

    } catch (error) {
        res.status(401).json({ message: "Token inválido" });
    }
};
