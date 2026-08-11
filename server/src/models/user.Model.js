import { pool } from "../config/db.js";

export const getUserByID = async (user_id) => {
  const result = await pool.query(
    "SELECT user_id, name, email, hashedPassword, role FROM users WHERE user_id = $1",
    [user_id],
  );
  return result.rows[0];
};

export const findUserByEmail = async (email) => {
  const result = await pool.query(
    "SELECT user_id, name, email, hashedPassword, role FROM users WHERE email = $1",
    [email],
  );
  return result.rows[0];
};

export const getAllUsers = async () => {
  const result = await pool.query(
    "SELECT user_id, name, email, role FROM users",
  );
  return result.rows;
};

export const updateUserById = async (user_id, name, email) => {
  const result = await pool.query(
    "UPDATE users SET name = $1, email = $2 WHERE user_id = $3 RETURNING user_id, name, email",
    [name, email, user_id],
  );
  return result.rows[0];
};

export const deleteUserById = async (user_id) => {
  const result = await pool.query("DELETE FROM users WHERE user_id = $1", [
    user_id,
  ]);
  return result.rowCount > 0;
};

export default {
  getUserByID,
  findUserByEmail,
  getAllUsers,
  updateUserById,
  deleteUserById,
};
