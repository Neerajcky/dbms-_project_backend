import { query } from '../config/db.js';

const User = {
  // Get all users
  getAll: async () => {
    const sql = 'SELECT * FROM users';
    const { rows } = await query(sql);
    return rows;
  },

  // Get a user by ID
  getById: async (id) => {
    const sql = 'SELECT * FROM users WHERE id = $1';
    const { rows } = await query(sql, [id]);
    return rows[0];
  },

  // Create a new user
  create: async ({ name, email, subscription_plan, join_date, dob, country }) => {
    const sql = `
      INSERT INTO users (name, email, subscription_plan, join_date, dob, country)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
    const { rows } = await query(sql, [name, email, subscription_plan, join_date, dob, country]);
    return rows[0];
  },

  // Delete a user by ID
  deleteById: async (id) => {
    const sql = 'DELETE FROM users WHERE id = $1 RETURNING *';
    const { rows } = await query(sql, [id]);
    return rows[0];
  },

  // Update a user by ID
  updateById: async (id, { name, email, subscription_plan, join_date, dob, country }) => {
    const sql = `
      UPDATE users
      SET name = $1, email = $2, subscription_plan = $3, join_date = $4, dob = $5, country = $6
      WHERE id = $7
      RETURNING *;
    `;
    const { rows } = await query(sql, [name, email, subscription_plan, join_date, dob, country, id]);
    return rows[0];
  }
};

export default User;
