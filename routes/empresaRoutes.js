import { Router } from "express";
import empresaController from "../controllers/empresaController.js";
import auth from "../middleware/auth.js";
import { permitir } from "../middleware/roles.js";

const router = Router();

// lista todos
router.get('/', empresaController.getAll);

// busca por id
router.get('/:id', empresaController.getById);

// cria
router.post('/', auth, permitir("empreendedor"), empresaController.create);

// atualiza
router.put('/:id', empresaController.update);

// deleta
router.delete('/:id', empresaController.delete);

export default router;
