import { Router } from "express";
import empresaController from "../controllers/empresaController.js";

const router = Router();

router.get('/', empresaController.getAll); 

router.get('/:id', empresaController.getById);

router.post('/', empresaController.create);

router.put('/:id', empresaController.update);

router.delete('/:id', empresaController.delete);

export default router;
