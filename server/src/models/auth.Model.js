import { pool } from "../config/db.js";
export const createUser = async (name, email, hashedPassword, role) => {
  "INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING user_id, name, email, role";

  const result = await pool.query(query, [name, email, hashedPassword, role]);
  return result.rows[0];
};
