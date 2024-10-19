import { query } from '../config/db.js';

const Song = {
  getAll: async () => {
    const sql = 'SELECT * FROM songs';
    const { rows } = await query(sql);
    return rows;
  },

  create: async (song_name, duration, artist_id, genre_id, release_date, no_of_times_played) => {
    const sql = `
      INSERT INTO songs (song_name, duration, artist_id, genre_id, release_date, no_of_times_played)
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;
    `;
    const { rows } = await query(sql, [song_name, duration, artist_id, genre_id, release_date, no_of_times_played]);
    return rows[0];
  },
};

export default Song;
