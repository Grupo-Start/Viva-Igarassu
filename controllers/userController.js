import userService from "../services/userService.js";

async function login(req, res) {
  try {
    const { email, senha } = req.body;

    const result = await userService.login(email, senha);

    return res.status(200).json(result);

  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

async function cadastrar(req, res) {
  try {
    const novo = await userService.cadastrar(req.body);
    return res.status(201).json(novo);

  } catch (error) {
    const status = error.status || 400;
    return res.status(status).json({ message: error.message });
  }
}

async function getMe(req, res) {
  try {
    const userId = req.userId; 

    const user = await userService.getById(userId);

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    return res.status(200).json(user);

  } catch (error) {
    return res.status(500).json({ message: "Erro ao buscar perfil" });
  }
}

async function updateMe(req, res) {
  try {
    const userId = req.userId;
    const dados = req.body;

    const atualizado = await userService.updateMe(userId, dados);

    return res.status(200).json(atualizado);

  } catch (error) {
    const status = error.status || 500;
    return res.status(status).json({ message: error.message });
  }
}

async function logout(req, res) {
  try {
    const token = req.token;
    const result = await userService.logout(token);
    return res.status(200).json(result);
  } catch (error) {
    console.error("Erro no logout:", error);
    return res.status(500).json({ message: "Erro ao realizar logout" });
  }
}

async function getAllUsers(req, res) {
  try {
    const usuarios = await userService.getAllUsers();
    return res.status(200).json(usuarios);
  } catch (error) {
    console.error("Erro ao listar usuários:", error);
    return res.status(500).json({ message: "Erro ao listar usuários" });
  }
}

async function forgotPassword(req, res) {
  try {
    const { email } = req.body;
    const result = await userService.forgotPassword(email);
    return res.status(200).json(result);
  } catch (error) {
    const status = error.status || 500;
    return res.status(status).json({ message: error.message });
  }
}

async function resetPassword(req, res) {
  try {
    const { token, novaSenha } = req.body;
    const result = await userService.resetPassword(token, novaSenha);
    return res.status(200).json(result);
  } catch (error) {
    const status = error.status || 500;
    return res.status(status).json({ message: error.message });
  }
}

async function changePassword(req, res) {
  try {
    const userId = req.userId;
    const { senhaAtual, novaSenha } = req.body;
    const result = await userService.changePassword(userId, senhaAtual, novaSenha);
    return res.status(200).json(result);
  } catch (error) {
    const status = error.status || 500;
    return res.status(status).json({ message: error.message });
  }
}

export default {
  login,
  cadastrar,
  getMe,
  updateMe,
  logout,
  getAllUsers,
  forgotPassword,
  resetPassword,
  changePassword
};
