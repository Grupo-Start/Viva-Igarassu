import { Router } from "express";
import empresaController from "../controllers/empresaController.js";
import auth from "../middleware/auth.js";
import { permitir } from "../middleware/roles.js";

const router = Router();

router.get('/', empresaController.getAll); 

router.get('/:id', empresaController.getById);

// cria
router.post('/', auth, permitir("empreendedor"), empresaController.create);

router.put('/:id', empresaController.update);

router.delete('/:id', empresaController.delete);

export default router;
