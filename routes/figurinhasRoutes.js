import { Router } from "express";
import figurinhasController from "../controllers/figurinhasController.js";
import { isAdm } from "../middleware/roles.js";

const router = Router();

router.get("/", figurinhasController.findAllFigurinha);
router.get("/:id", figurinhasController.findById);


router.post("/", isAdm, figurinhasController.createFigurinha);
router.put("/:id", isAdm, figurinhasController.updateFigurinha);
router.delete("/:id", isAdm, figurinhasController.removeFigurinha);

export default router;
