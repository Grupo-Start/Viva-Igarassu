import { Router } from "express";
import eventosController from "../controllers/eventosController.js";

const router = Router();

// lista todos
router.get('/', eventosController.getAll);

// busca por id
router.get('/:id', eventosController.getById);

// cria
router.post('/', eventosController.create);

// atualiza
router.put('/:id', eventosController.update);

// deleta
router.delete('/:id', eventosController.delete);

export default router;