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
import dashboardsRoutes from "./routes/dashboardsRoutes.js";
import visitasPontoFigRoutes from "./routes/visitasPontoFigRoutes.js";
import enderecosRoutes from "./routes/enderecosRoutes.js";
import auth from "./middleware/auth.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.resolve("uploads")));


app.use("/usuarios", userRoutes);
app.use("/enderecos", enderecosRoutes);
app.use("/endereco", enderecosRoutes);


app.use("/eventos", eventosRoutes);
app.use("/recompensas", recompensasRoutes);
app.use("/pontos-turisticos", pontosTuristicosRoutes);

app.use(auth);

app.use("/empresa", empresaRoutes);
app.use("/figurinhas", figurinhasRoutes);
app.use("/resgates", resgatesRoutes);
app.use("/meu-album-de-figurinhas", minhasFigurinhasRoutes);
app.use("/qrcodes", qrCodeRoutes);
app.use("/visitas", visitasPontoFigRoutes);
app.use("/dashboard", dashboardsRoutes);

app.use((err, req, res, next) => {
	if (err && err.type === 'entity.parse.failed') {
		return res.status(400).json({ message: 'Payload JSON inválido ou Content-Type incorreto' });
	}
	next(err);
});

app.use((err, req, res, next) => {
	if (!err) return next();
	console.error('[ERROR] Unhandled error:', err && err.stack ? err.stack : err);
	const status = err && err.status ? err.status : 500;
	res.status(status).send(err && err.message ? err.message : 'Internal Server Error');
});


export default app;
