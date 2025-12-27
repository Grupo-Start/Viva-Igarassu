import { Router } from "express";
import empresaController from "../controllers/empresaController.js";
import auth from "../middleware/auth.js";
import { permitir} from "../middleware/roles.js";

const router = Router();

router.get('/', auth, permitir("empreendedor", "adm"), empresaController.getAll); 

router.get('/:id', auth, permitir("empreendedor", "adm"), empresaController.getById);

router.post('/', auth, permitir("empreendedor", "adm"), empresaController.create);
router.put('/:id', auth, permitir("empreendedor"), empresaController.update);

router.delete('/:id', empresaController.delete);

export default router;
