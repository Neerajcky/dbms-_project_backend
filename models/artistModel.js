import { query } from '../config/db.js';

const Artist = {
  // Get all artists
  getAll: async () => {
    const sql = 'SELECT * FROM artists';
    const { rows } = await query(sql);
    return rows;
  },

  // Create a new artist
  create: async (art_name, genre, dob, country, albums_released) => {
    const insertSql = `
      INSERT INTO artists (art_name, genre, dob, country, albums_released)
      VALUES ($1, $2, $3, $4, $5) RETURNING *;
    `;
    const { rows } = await query(insertSql, [art_name, genre, dob, country, albums_released]);

    // Reset the ID sequence to avoid ID conflicts
    const resetSql = `
      SELECT setval(pg_get_serial_sequence('artists', 'id'), COALESCE(MAX(id), 0) + 1, false)
      FROM artists;
    `;
    await query(resetSql);

    return rows[0]; // Return the newly created artist
  },

  // Get an artist by ID
  getById: async (id) => {
    const sql = 'SELECT * FROM artists WHERE id = $1';
    const { rows } = await query(sql, [id]);
    return rows[0]; // Return the artist if found
  },

  // Delete an artist by ID
  deleteById: async (id) => {
    const queryText = 'DELETE FROM artists WHERE id = $1 RETURNING *';
    const { rows } = await query(queryText, [id]);
    return rows[0]; // Return the deleted artist
  },

  // Update an artist by ID
  updateById: async (id, art_name, genre, dob, country, albums_released) => {
    const sql = `
      UPDATE artists
      SET art_name = $1, genre = $2, dob = $3, country = $4, albums_released = $5
      WHERE id = $6
      RETURNING *;
    `;
    const { rows } = await query(sql, [art_name, genre, dob, country, albums_released, id]);
    return rows[0]; // Return the updated artist
  }
};

export default Artist;
