import express from 'express';
import { login, cadastrar } from "../controllers/userController.js";


const router = express.Router();

router.post('/login', login);
router.post('/cadastrar', cadastrar);

export default router;
