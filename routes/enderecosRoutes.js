import { Router } from "express";
import enderecosController from "../controllers/enderecosController.js";

const router = Router();

router.get('/:id', enderecosController.getById);
router.post('/', enderecosController.create);

export default router;
