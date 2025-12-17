import { Router } from "express";
import dashboardUsuarioController from "../controllers/dashboardUsuarioController.js";

const router = Router();

router.get("/usuario", dashboardUsuarioController.dashboardUsuario);

export default router;
