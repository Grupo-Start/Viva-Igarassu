import { Router } from "express";
import dashboardUsuarioController from "../controllers/dashboardsController.js";
import auth from "../middleware/auth.js";
import { permitir } from "../middleware/roles.js";

const router = Router();

router.use(auth);

router.get("/usuario", dashboardUsuarioController.dashboardUsuario);
router.get("/admin", dashboardUsuarioController.dashboardAdmin);
router.get("/visitas-por-ponto", dashboardUsuarioController.getVisitasPorPonto);
router.get("/visitas-por-periodo", dashboardUsuarioController.getVisitasPorPeriodo);


router.get('/empresa/:id', permitir('empreendedor', 'adm'), dashboardUsuarioController.dashboardEmpresa);
router.get('/empresa/:id/resgates', permitir('empreendedor', 'adm'), dashboardUsuarioController.getResgatesEmpresa);
router.get('/empresa/:id/recompensas', permitir('empreendedor', 'adm'), dashboardUsuarioController.getRecompensasEmpresa);

export default router;
