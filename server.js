import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/usuarios", userRoutes);

app.listen(3001, () =>
  console.log("Servidor rodando na porta 3001")
);
