import { Router } from "express";
import empresaController from "../controllers/empresaController.js";
import auth from "../middleware/auth.js";
import { permitir} from "../middleware/roles.js";

const router = Router();

router.get('/', auth, permitir("empreendedor", "adm"), empresaController.getAll);

router.get('/me/eventos/count', auth, permitir("empreendedor", "adm"), empresaController.getMeEventosCount);
router.get('/me/eventos/count-by-month', auth, permitir("empreendedor", "adm"), empresaController.getMeEventosCountByMonth);
router.get('/me/eventos', auth, permitir("empreendedor", "adm"), empresaController.getMeEventos);

router.get('/:id/eventos/count-by-month', auth, permitir("empreendedor", "adm"), empresaController.getEventosCountByMonth);
router.get('/:id', auth, permitir("empreendedor", "adm"), empresaController.getById);

router.post('/', auth, permitir("empreendedor", "adm"), empresaController.create);
router.put('/:id', auth, permitir("empreendedor"), empresaController.update);

router.delete('/:id', auth, permitir("adm"), empresaController.delete);

export default router;
