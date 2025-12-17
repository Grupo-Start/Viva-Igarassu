import dashboardUsuarioService from "../services/dashboardUsuarioService.js";

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

export default { dashboardUsuario };
