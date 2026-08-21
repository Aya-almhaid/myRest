import { pool } from "../config/db.js";

export const findUserByEmail = async (email) => {
  const query = `SELECT * FROM users WHERE email = $1`;
  const result = await pool.query(query, [email]);
  return result.rows[0];
};

export const createUser = async (name, email, hashedPassword, role) => {
  const query = `
    INSERT INTO users (name, email, hashed_password, role)
    VALUES ($1, $2, $3, $4)
    RETURNING user_id, name, email, role
  `;
  const result = await pool.query(query, [name, email, hashedPassword, role]);
  return result.rows[0];
};

export const updateUserPassword = async (userId, hashedPassword) => {
  const query = `
    UPDATE users
    SET hashed_password = $1
    WHERE user_id = $2
    RETURNING user_id, name, email, role
  `;
  const result = await pool.query(query, [hashedPassword, userId]);
  return result.rows[0];
};
