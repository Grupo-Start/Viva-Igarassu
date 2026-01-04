import { Router } from "express";
import eventosController from "../controllers/eventosController.js";
import auth  from "../middleware/auth.js";
import { PermitirEvento } from "../middleware/roles.js";
import { uploadEventoImagem } from "../middleware/upload.js";

const router = Router();

router.get('/', eventosController.getAll);


router.get('/:id', eventosController.getById);


router.post(
    '/',
    auth,
    PermitirEvento,
    uploadEventoImagem,
    eventosController.create
);


router.put(
    '/:id',
    auth,
    PermitirEvento,
    uploadEventoImagem,
    eventosController.update
);

router.patch(
    '/:id',
    auth,
    PermitirEvento,
    uploadEventoImagem,
    eventosController.update
);

router.post(
    '/:id',
    auth,
    PermitirEvento,
    uploadEventoImagem,
    eventosController.update
);


router.delete(
    '/:id',
    auth,
    PermitirEvento,
    eventosController.delete
);

export default router;

