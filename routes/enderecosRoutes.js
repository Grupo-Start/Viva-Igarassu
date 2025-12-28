import { Router } from "express";
import enderecosController from "../controllers/enderecosController.js";

const router = Router();

router.get('/:id', enderecosController.getById);

export default router;
