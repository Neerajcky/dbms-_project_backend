import { query } from '../config/db.js'; // Adjust the path based on your DB configuration

const resetGenreIdSequence = async () => {
  const sql = `
    SELECT setval(pg_get_serial_sequence('genre', 'id'), COALESCE(MAX(id), 0) + 1, false) FROM genre;
  `;
  await query(sql);
};

const Genre = {
  getAll: async () => {
    const sql = 'SELECT * FROM genre';
    const { rows } = await query(sql);
    return rows;
  },

  create: async (genre_name) => {
    await resetGenreIdSequence(); // Reset sequence before insertion

    const sql = `
      INSERT INTO genre (genre_name)
      VALUES ($1) RETURNING *;
    `;

    const { rows } = await query(sql, [genre_name]);
    return rows[0];
  },

  getById: async (id) => {
    const sql = 'SELECT * FROM genre WHERE id = $1::bigint'; 
    const { rows } = await query(sql, [id]);
    return rows[0]; // Return the genre object if found
  },

  deleteById: async (id) => {
    const sql = 'DELETE FROM genre WHERE id = $1 RETURNING *';
    const { rows } = await query(sql, [id]);
    return rows[0];
  },

  updateById: async (id, genre_name) => {
    const sql = `
      UPDATE genre
      SET genre_name = $1
      WHERE id = $2
      RETURNING *;
    `;
    const { rows } = await query(sql, [genre_name, id]);
    return rows[0];
  }
};

export default Genre;
