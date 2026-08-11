import connectDB from "./config/db.js";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.Routes.js";
import express from "express";
import { errorHandler } from "./middleware/
errorHandler.Middleware.js";
import cors from "cors";
import {helmet} from "helmet";
dotenv.config();
connectDB();

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use("/api", authRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000; // fallback so it never prints "undefined" again
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
