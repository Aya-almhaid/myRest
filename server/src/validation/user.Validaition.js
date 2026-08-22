import Joi from "joi";

export const registerSchema = Joi.object({
  name : Joi.string().min(3).max(100).required().messages({
"string.min":"Name  must bw 3 characters ",
"string.max":"Namer must be 100 charecters",
"string.required ":"Name is required",
"string.empyty":"name is required"
}),

email :Joi.string().min(6).max(255).email().required().messages({


})