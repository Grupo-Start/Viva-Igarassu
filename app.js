import express from "express";
import cors from "cors";

import userRoutes from "./routes/userRoutes.js";
import empresaRoutes from "./routes/empresaRoutes.js";
import eventosRoutes from "./routes/eventosRoutes.js";
import recompensasRoutes from "./routes/recompensasRoutes.js";
import pontosRoutes from "./routes/pontos_turisticosRoutes.js";
import figurinhasRoutes from "./routes/figurinhasRoutes.js";
import resgatesRoutes from "./routes/resgatesRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

// ROTAS
app.use("/usuarios", userRoutes);
app.use("/empresa", empresaRoutes);
app.use("/eventos", eventosRoutes);
app.use("/recompensas", recompensasRoutes);
app.use("/pontos", pontosRoutes);
app.use("/figurinhas", figurinhasRoutes);
app.use("/resgates", resgatesRoutes);

export default app;
