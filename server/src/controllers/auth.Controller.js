import { createUser } from "../models/auth.Model.js";
import { registerValidation } from "../validation/user.Validaition.js";
import bcrypt from "bcryptjs";
import findUserByEmail from "../models/user.Model.js";

export const registerUser = async (req, res) => {
  const { name, email, hashedPassword } = req.body;

  try {
    const existedUser = await findUserByEmail(email);
    if (existedUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(hashedPassword, 10);
    const newUser = await createUser(name, email, hashedPassword, "user");
    if (!newUser) {
      return res.status(500).json({ message: "Failed to create user" });
    }
  } catch (error) {
    console.error("Error registering user:", error);
    return res
      .status(500)
      .json({ message: "Internal server error in register " });
  }
};

export default { registerUser };
