import figurinhasService from "../services/figurinhasService.js";
import { crud } from "./baseController.js";

const handlers = crud(figurinhasService, { idParam: "id" });

export default {
  createFigurinha: handlers.create,
  findAllFigurinha: handlers.findAll,
  findById: handlers.getById,
  updateFigurinha: handlers.update,
  removeFigurinha: handlers.remove
};
