export const role = (...rolesPermitidos) => {
  return (req, res, next) => {
    if (!rolesPermitidos.includes(req.role)) {
      return res
        .status(403)
        .json({ message: "Acesso negado: permissão insuficiente" });
    }
    next();
  };
};
