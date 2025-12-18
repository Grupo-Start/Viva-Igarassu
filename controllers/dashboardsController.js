import dashboardUsuarioService from "../services/dashboardUsuarioService.js";
import dashboardAdmService from "../services/dashboardAdmService.js";

async function dashboardUsuario(req, res) {
  try {
    if (req.role !== "comum") {
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
  if (req.role !== "adm") {
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
    if (req.role !== "adm") {
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
    if (req.role !== "adm") {
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

 

export default { 
  dashboardUsuario,
  dashboardAdmin,
  getVisitasPorPonto,
  getVisitasPorPeriodo
};
