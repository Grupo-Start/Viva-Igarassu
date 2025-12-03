
import express from "express";
import pontosController from "../controllers/pontos_turisticosController.js";
import { auth } from "../middleware/auth.js";
import { isAdm } from "../middleware/roles.js";

const router = express.Router();

router.get("/", pontosController.listarPublico);

router.post("/", auth, isAdm, pontosController.criarPonto);
router.put("/:id", auth, isAdm, pontosController.atualizarPonto);
router.delete("/:id", auth, isAdm, pontosController.deletarPonto);

export default router;
 