import { Router } from "express";
import recompensasController from "../controllers/recompensasController.js";
import auth from "../middleware/auth.js";
import { permitir } from "../middleware/roles.js";
import { uploadRecompensaImagem } from "../middleware/upload.js";

const router = Router();

router.post(
	"/",
	auth,
	permitir("empreendedor", "adm"),
	uploadRecompensaImagem,
	recompensasController.create
);

router.put(
	"/:id",
	auth,
	permitir("empreendedor", "adm"),
	uploadRecompensaImagem,
	recompensasController.update
);

router.post(
	"/:id/imagem",
	auth,
	permitir("empreendedor", "adm"),
	uploadRecompensaImagem,
	recompensasController.uploadImagem
);

router.delete(
	"/:id",
	auth,
	permitir("empreendedor", "adm"),
	recompensasController.delete
);


router.get("/", recompensasController.getAll);
router.get("/:id", recompensasController.getById);

export default router;


