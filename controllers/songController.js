import Song from '../models/songModel.js';

export const getSongs = async (req, res) => {
  try {
    const songs = await Song.getAll();
    res.status(200).json(songs);
  } catch (error) {
    console.error('Error retrieving songs:', error); 
    res.status(500).json({ error: 'Failed to retrieve songs' });
  }
};

export const addSong = async (req, res) => {
  const { song_name, duration, artist_id, genre_id, release_date, no_of_times_played } = req.body;
  try {
    const newSong = await Song.create(song_name, duration, artist_id, genre_id, release_date, no_of_times_played);
    res.status(201).json(newSong);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add song' });
  }
};
