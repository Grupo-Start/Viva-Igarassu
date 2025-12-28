import { Router } from "express";
import recompensasController from "../controllers/recompensasController.js";
import auth from "../middleware/auth.js";
import { permitir } from "../middleware/roles.js";
import { uploadRecompensaImagem } from "../middleware/upload.js";

const router = Router();

router.use(auth);

router.post("/", permitir("empreendedor", "adm"), uploadRecompensaImagem, recompensasController.create);
router.put("/:id", permitir("empreendedor", "adm"), recompensasController.update);
router.post("/:id/imagem", permitir("empreendedor", "adm"), uploadRecompensaImagem, recompensasController.uploadImagem);
router.delete("/:id", permitir("empreendedor", "adm"), recompensasController.delete);


router.get("/", recompensasController.getAll);
router.get("/:id", recompensasController.getById);

export default router;


