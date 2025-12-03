export function permitir(...rolesPermitidos) {
    return (req, res, next) => {
        if (!rolesPermitidos.includes(req.role)) {
            return res.status(403).json({ message: "Acesso negado." });
        }
        next();
    };
};


export function isAdm(req, res, next) {
    if (req.role !== "adm") {
        return res.status(403).json({ message: "Apenas administradores podem acessar." });
    }
    next();
};

export function isComum(req, res, next) {
    if (req.role !== "comum") {
        return res.status(403).json({ message: "Apenas usuários comuns podem acessar." });
    }
    next();
};

export function isEmpreendedor(req, res, next) {
    if (req.role !== "empreendedor") {
        return res.status(403).json({ message: "Apenas empreendedores podem acessar." });
    }
    next();
};
