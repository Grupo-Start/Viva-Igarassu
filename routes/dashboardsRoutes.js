import { Router } from "express";
import dashboardUsuarioController from "../controllers/dashboardsController.js";
import auth from "../middleware/auth.js";

const router = Router();

router.use(auth);

router.get("/usuario", dashboardUsuarioController.dashboardUsuario);
router.get("/admin", dashboardUsuarioController.dashboardAdmin);
router.get("/visitas-por-ponto", dashboardUsuarioController.getVisitasPorPonto);
router.get("/visitas-por-periodo", dashboardUsuarioController.getVisitasPorPeriodo);

export default router;
