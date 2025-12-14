import { Router } from "express";
import eventosController from "../controllers/eventosController.js";
import { auth } from "../middleware/auth.js";
import { PermitirEvento } from "../middleware/roles.js";

const router = Router();

// lista eventos
router.get('/', eventosController.getAll);

// busca evento por id
router.get('/:id', eventosController.getById);

// cria evento
router.post(
    '/',
    auth,
    PermitirEvento,
    eventosController.create
);

// atualiza evento
router.put(
    '/:id',
    auth,
    PermitirEvento,
    eventosController.update
);

// deleta evento
router.delete(
    '/:id',
    auth,
    PermitirEvento,
    eventosController.delete
);

export default router;

