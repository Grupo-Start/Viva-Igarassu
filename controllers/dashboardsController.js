import dashboardUsuarioService from "../services/dashboardUsuarioService.js";
import dashboardAdmService from "../services/dashboardAdmService.js";
import dashboardEmpresaService from "../services/dashboardEmpresaService.js";
import empresaService from "../services/empresaService.js";

async function dashboardUsuario(req, res) {
  try {
    const role = req.userRole || req.role;
    if (role !== "comum") {
      return res.status(403).json({ message: "Acesso permitido apenas para usuários comuns" });
    }

    const data = await dashboardUsuarioService.getDashboardUsuario(req.userId);
    return res.status(200).json(data);

  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || "Erro ao carregar dashboard"
    });
  }
}

async function dashboardAdmin(req, res) {
  try {
  const role = req.userRole || req.role;
  if (role !== "adm") {
    return res.status(403).json({ message: "Acesso permitido apenas para usuários administrador" });
    }

  const data = await dashboardAdmService.dashboardAdmin(req.userId);
  return res.status(200).json(data);

  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || "Erro ao carregar dashboard"
    });
  }
}

async function getVisitasPorPonto(req, res) {
  try {
    const role = req.userRole || req.role;
    if (role !== "adm") {
      return res.status(403).json({ message: "Acesso permitido apenas para administradores" });
    }

    const data = await dashboardAdmService.getVisitasPorPonto();
    return res.status(200).json(data);

  } catch (error) {
    return res.status(500).json({
      message: error.message || "Erro ao buscar visitas por ponto"
    });
  }
}

async function getVisitasPorPeriodo(req, res) {
  try {
    const role = req.userRole || req.role;
    if (role !== "adm") {
      return res.status(403).json({ message: "Acesso permitido apenas para administradores" });
    }

    const { dias } = req.query;
    const data = await dashboardAdmService.getVisitasPorPeriodo(dias ? parseInt(dias) : 30);
    return res.status(200).json(data);

  } catch (error) {
    return res.status(500).json({
      message: error.message || "Erro ao buscar visitas por período"
    });
  }
}

async function dashboardEmpresa(req, res) {
  try {
    const role = req.userRole || req.role;
    if (!["empreendedor", "adm"].includes(role)) {
      return res.status(403).json({ message: "Acesso permitido apenas para empreendedores ou administradores" });
    }

    const { id } = req.params;
      const empresa = await empresaService.getById(id);

      if (role === "empreendedor" && empresa.id_usuario !== req.userId) {
        return res.status(403).json({ message: "Acesso negado à empresa" });
      }

      const data = await dashboardEmpresaService.getDashboardEmpresa(id);
    return res.status(200).json(data);

  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || "Erro ao carregar dashboard da empresa"
    });
  }
}

async function getResgatesEmpresa(req, res) {
  try {
    const role = req.userRole || req.role;
    if (!["empreendedor", "adm"].includes(role)) {
      return res.status(403).json({ message: "Acesso permitido apenas para empreendedores ou administradores" });
    }

    const { id } = req.params;
    const { limit } = req.query;
      const empresa = await empresaService.getById(id);

      if (role === "empreendedor" && empresa.id_usuario !== req.userId) {
        return res.status(403).json({ message: "Acesso negado à empresa" });
      }

      const data = await dashboardEmpresaService.getResgatesRecentes(id, limit ? parseInt(limit) : 10);
    return res.status(200).json(data);

  } catch (error) {
    return res.status(500).json({
      message: error.message || "Erro ao buscar resgates da empresa"
    });
  }
}

async function getRecompensasEmpresa(req, res) {
  try {
    const role = req.userRole || req.role;
    if (!["empreendedor", "adm"].includes(role)) {
      return res.status(403).json({ message: "Acesso permitido apenas para empreendedores ou administradores" });
    }

    const { id } = req.params;
      const empresa = await empresaService.getById(id);

      if (role === "empreendedor" && empresa.id_usuario !== req.userId) {
        return res.status(403).json({ message: "Acesso negado à empresa" });
      }

      const data = await dashboardEmpresaService.getRecompensasPorEmpresa(id);
    return res.status(200).json(data);

  } catch (error) {
    return res.status(500).json({
      message: error.message || "Erro ao buscar recompensas da empresa"
    });
  }
}

 

export default { 
  dashboardUsuario,
  dashboardAdmin,
  getVisitasPorPonto,
  getVisitasPorPeriodo,
  dashboardEmpresa,
  getResgatesEmpresa,
  getRecompensasEmpresa
};

