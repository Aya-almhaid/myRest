import Joi from "joi";

export const registerValidation = Joi.object({
  name: Joi.string().min(3).max(100).required().messages({
    "string.min": "Name must be between 3 and 100 characters",
    "string.max": "Name must be between 3 and 100 characters",
    "string.empty": "Name cannot be empty",
  }),

  email: Joi.string().email().required().messages({
    "string.email": "Please provide a valid email",
    "string.empty": "Email cannot be empty",
  }),

  // Validate the raw password BEFORE hashing it — hash it after validation passes
  password: Joi.string()
    .min(6)
    .max(100)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .required()
    .messages({
      "string.min": "Password must be between 6 and 100 characters",
      "string.max": "Password must be between 6 and 100 characters",
      "string.pattern.base":
        "Password must contain at least one uppercase letter, one lowercase letter, and one number",
      "string.empty": "Password is required",
    }),

  role: Joi.string().valid("user", "admin").default("user").messages({
    "any.only": "Role must be either 'user' or 'admin'",
  }),
});

export default { registerValidation };
