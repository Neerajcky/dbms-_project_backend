import { query } from '../config/db.js';

const Artist = {
  getAll: async () => {
    const sql = 'SELECT * FROM artists';
    const { rows } = await query(sql);
    return rows;
  },

  create: async (art_name, genre, dob, country, albums_released) => {
    const sql = `
     INSERT INTO artists (art_name, genre, dob, country, albums_released)
     VALUES ($1, $2, $3, $4, $5) RETURNING *;
    `;

    const { rows } = await query(sql, [art_name, genre, dob, country, albums_released]);
    return rows[0];
  },

  getById: async (id) => {
    const sql = 'SELECT * FROM artists WHERE id = $1::bigint'; // Explicitly casting to bigint
    const { rows } = await query(sql, [id]);
    return rows[0]; // Return the artist object if found
  },

  deleteById: async (id) => {
    const sql = 'DELETE FROM artists WHERE id = $1 RETURNING *';
    const { rows } = await query(sql, [id]);
    return rows[0];
  },

  updateById: async (id, art_name, genre, dob, country, albums_released) => {
    const sql = `
      UPDATE artists
      SET art_name = $1, genre = $2, dob = $3, country = $4, albums_released = $5
      WHERE id = $6
      RETURNING *;
    `;
    const { rows } = await query(sql, [art_name, genre, dob, country, albums_released, id]);
    return rows[0];
  }
};

export default Artist;
