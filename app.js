import express from "express";
import cors from "cors";

import userRoutes from "./routes/userRoutes.js";
import empresaRoutes from "./routes/empresaRoutes.js";
import eventosRoutes from "./routes/eventosRoutes.js";
import figurinhasRoutes from "./routes/figurinhasRoutes.js";
import recompensasRoutes from "./routes/recompensasRoutes.js";
import resgatesRoutes from "./routes/resgatesRoutes.js";
import pontos_turisticosRoutes from "./routes/pontos_turisticosRoutes.js";

import dotenv from "dotenv";
dotenv.config();




const app = express();

app.use(cors());
app.use(express.json());


app.use("/usuarios", userRoutes);
app.use("/empresa", empresaRoutes);
app.use("/eventos", eventosRoutes);
app.use("/figurinhas", figurinhasRoutes);
app.use("/recompensas", recompensasRoutes);
app.use("/resgates", resgatesRoutes);
app.use("/pontos-turisticos", pontos_turisticosRoutes);

//app.listen(3001, () => console.log("Rodando...")); 

export default app;
