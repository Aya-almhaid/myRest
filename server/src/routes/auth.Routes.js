import { registerUser, loginUser } from "../controllers/auth.Controller.js";
import { registerSchema, loginSchema } from "../validation/user.Validaition.js";
import { validate } from "../middleware/Validate.Middleware.js";
import express from "express";

const router = express.Router();

router.post("/register", validate(registerSchema), registerUser);
router.post("/login", validate(loginSchema), loginUser);

export default router;
