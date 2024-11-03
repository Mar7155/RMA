import express from "express";
import morgan from "morgan";
import { PORT } from "./config.js";
import userRoutes from "./routes/users.routes.js";
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(morgan('dev'))
app.use(express.json())
app.use('/backend', userRoutes);
app.listen(PORT);

console.log("server on port ", PORT);

