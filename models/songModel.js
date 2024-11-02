import { query } from '../config/db.js'; // Adjust the path based on your DB configuration

const Song = {
  // Get all songs
  getAll: async () => {
    const sql = 'SELECT * FROM songs';
    const { rows } = await query(sql);
    return rows;
  },

  // Create a new song
  create: async ({ id, song_name, duration, artist_id, genre_id, release_date, no_of_times_played }) => {
    const sql = `
      INSERT INTO songs ( song_name, duration, artist_id, genre_id, release_date, no_of_times_played)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;

    const { rows } = await query(sql, [song_name, duration, artist_id, genre_id, release_date, no_of_times_played]);
    return rows[0];
  },

  // Get a song by ID
  getById: async (id) => {
    const sql = 'SELECT * FROM songs WHERE id = $1';
    const { rows } = await query(sql, [id]);
    return rows[0];
  },

  // Delete a song by ID
  deleteById: async (id) => {
    const sql = 'DELETE FROM songs WHERE id = $1 RETURNING *';
    const { rows } = await query(sql, [id]);
    return rows[0];
  },

  // Update a song by ID
  updateById: async (id, { song_name, duration, artist_id, genre_id, release_date, no_of_times_played }) => {
    const sql = `
      UPDATE songs
      SET song_name = $1, duration = $2, artist_id = $3, genre_id = $4, release_date = $5, no_of_times_played = $6
      WHERE id = $7
      RETURNING *;
    `;
    const { rows } = await query(sql, [song_name, duration, artist_id, genre_id, release_date, no_of_times_played, id]);
    return rows[0];
  }
};

export default Song;
