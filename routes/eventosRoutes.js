import { Router } from "express";
import eventosController from "../controllers/eventosController.js";
import auth  from "../middleware/auth.js";
import { PermitirEvento } from "../middleware/roles.js";

const router = Router();

router.get('/', eventosController.getAll);


router.get('/:id', eventosController.getById);


router.post(
    '/',
    auth,
    PermitirEvento,
    eventosController.create
);


router.put(
    '/:id',
    auth,
    PermitirEvento,
    eventosController.update
);


router.delete(
    '/:id',
    auth,
    PermitirEvento,
    eventosController.delete
);

export default router;

