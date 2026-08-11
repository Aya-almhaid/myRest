import { registerUser } from "../controllers/auth.Controller.js";
import { registerValidation } from "../validation/user.Validaition.js";
import { validate } from "../middleware/Validate.Middleware.js";
import express from "express";

const router = express.Router();
router.post("/auth/register", validate(registerValidation), registerUser);

export default router;
