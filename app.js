import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import userRoutes from "./routes/userRoutes.js";
import empresaRoutes from "./routes/empresaRoutes.js";
import eventosRoutes from "./routes/eventosRoutes.js";
import figurinhasRoutes from "./routes/figurinhasRoutes.js";
import recompensasRoutes from "./routes/recompensasRoutes.js";
import resgatesRoutes from "./routes/resgatesRoutes.js";
import pontosTuristicosRoutes from "./routes/pontosTuristicosRoutes.js";
import minhasFigurinhasRoutes from "./routes/minhasFigurinhasRoutes.js";
import qrCodeRoutes from "./routes/qrCodeRoutes.js";
import qrCodePdfRoutes from "./routes/qrCodePdfRoutes.js";
import dashboardComumRoutes from "./routes/dashboardUsuarioRoutes.js";
import visitasPontoFigRoutes from "./routes/visitasPontoFigRoutes.js";
import auth from "./middleware/auth.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json())

app.use("/uploads", express.static(path.resolve("uploads")));


app.use("/usuarios", userRoutes);


app.use(auth);

app.use("/eventos", eventosRoutes);
app.use("/empresa", empresaRoutes);
app.use("/figurinhas", figurinhasRoutes);
app.use("/recompensas", recompensasRoutes);
app.use("/resgates", resgatesRoutes);
app.use("/pontos-turisticos", pontosTuristicosRoutes);
app.use("/meu-album-de-figurinhas", minhasFigurinhasRoutes);
app.use("/qrcodes", qrCodeRoutes);
app.use("/qrcodes", qrCodePdfRoutes);
app.use("/visitas", visitasPontoFigRoutes);
app.use("/dashboard", dashboardComumRoutes);


export default app;
