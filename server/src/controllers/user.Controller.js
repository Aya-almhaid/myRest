import {
  getUserByID,
  getAllUsers,
  updateUserById,
  deleteUserById,
} from "../models/userModel.js"; // adjust path to your actual model file

export const getUser = async (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ message: "Invalid user id" });
  }

  try {
    const user = await getUserByID(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res
      .status(500)
      .json({ message: "Internal server error failed to fetch user" });
  }
};

export const getAllUsersController = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ message: "Invalid user id" });
  }
  if (!name && !email) {
    return res
      .status(400)
      .json({ message: "At least one field (name or email) is required" });
  }

  try {
    const updatedUser = await updateUserById(id, name, email);
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res
      .status(500)
      .json({ message: "Internal server error failed to update user" });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ message: "Invalid user id" });
  }

  try {
    const deletedUser = await deleteUserById(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res
      .status(500)
      .json({ message: "Internal server error failed to delete user" });
  }
};

export default { getUser, getAllUsersController, updateUser, deleteUser };
