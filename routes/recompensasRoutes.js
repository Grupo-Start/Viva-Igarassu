import { Router } from "express";
import recompensasController from "../controllers/recompensasController.js";
import auth from "../middleware/auth.js";
import roles from "../middleware/roles.js";

const router = Router();

router.use(auth);

// Somente empreendedor cria/edita/deleta
router.post("/", roles(["empreendedor"]), recompensasController.create);
router.put("/:id", roles(["empreendedor"]), recompensasController.update);
router.delete("/:id", roles(["empreendedor"]), recompensasController.delete);

// Qualquer usuário autenticado pode listar
router.get("/", recompensasController.getAll);
router.get("/:id", recompensasController.getById);

export default router;
