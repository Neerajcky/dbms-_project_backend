import { query } from '../config/db.js';

const Playlist = {
  // Get all playlists
  getAll: async () => {
    const sql = 'SELECT * FROM playlists';
    const { rows } = await query(sql);
    return rows;
  },

  // Get a playlist by ID
  getById: async (id) => {
    const sql = 'SELECT * FROM playlists WHERE id = $1';
    const { rows } = await query(sql, [id]);
    return rows[0];
  },

  // Create a new playlist
  create: async ({ playlists_name, user_id, creation_date, ispublic }) => {
    const sql = `
      INSERT INTO playlists (playlists_name, user_id, creation_date, ispublic)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const { rows } = await query(sql, [playlists_name, user_id, creation_date, ispublic]);
    return rows[0];
  },

  // Delete a playlist by ID
  deleteById: async (id) => {
    const sql = 'DELETE FROM playlists WHERE id = $1 RETURNING *';
    const { rows } = await query(sql, [id]);
    return rows[0];
  },

  // Update a playlist by ID
  updateById: async (id, { playlists_name, user_id, creation_date, ispublic }) => {
    const sql = `
      UPDATE playlists
      SET playlists_name = $1, user_id = $2, creation_date = $3, ispublic = $4
      WHERE id = $5
      RETURNING *;
    `;
    const { rows } = await query(sql, [playlists_name, user_id, creation_date, ispublic, id]);
    return rows[0];
  }
};

export default Playlist;
