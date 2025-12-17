import { Router } from "express";
import recompensasController from "../controllers/recompensasController.js";
import { auth } from "../middleware/auth.js";
import { permitir } from "../middleware/roles.js";

const router = Router();

router.use(auth);

router.post("/", permitir("empreendedor"), recompensasController.create);
router.put("/:id", permitir("empreendedor"), recompensasController.update);
router.delete("/:id", permitir("empreendedor"), recompensasController.delete);


router.get("/", recompensasController.getAll);
router.get("/:id", recompensasController.getById);

export default router;


