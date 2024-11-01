import Song from '../models/songModel.js';

// Get all songs
export const getSongs = async (req, res) => {
  try {
    const songs = await Song.getAll();
    res.status(200).json(songs);
  } catch (error) {
    console.error('Error retrieving songs:', error);
    res.status(500).json({ error: 'Failed to retrieve songs' });
  }
};

// Get a song by ID
export const getSongById = async (req, res) => {
  const songId = req.params.id;

  try {
    const song = await Song.getById(songId);
    if (song) {
      res.status(200).json(song);
    } else {
      res.status(404).json({ message: 'Song not found' });
    }
  } catch (error) {
    console.error('Error retrieving song:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Add a new song without 'id' in the request body
export const addSong = async (req, res) => {
  const { song_name, duration, artist_id, genre_id, release_date, no_of_times_played } = req.body;

  try {
    const newSong = await Song.create({ song_name, duration, artist_id, genre_id, release_date, no_of_times_played });
    res.status(201).json(newSong);
  } catch (error) {
    console.error('Error adding song:', error);
    res.status(500).json({ error: 'Failed to add song' });
  }
};

// Delete song by ID
export const deleteSong = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedSong = await Song.deleteById(id);
    if (deletedSong) {
      res.status(200).json({ message: 'Song deleted successfully', deletedSong });
    } else {
      res.status(404).json({ error: 'Song not found' });
    }
  } catch (error) {
    console.error('Error deleting song:', error);
    res.status(500).json({ error: 'Failed to delete song' });
  }
};

// Update song by ID
export const updateSong = async (req, res) => {
  const { id } = req.params;
  const { song_name, duration, artist_id, genre_id, release_date, no_of_times_played } = req.body;

  try {
    const updatedSong = await Song.updateById(id, { song_name, duration, artist_id, genre_id, release_date, no_of_times_played });
    if (updatedSong) {
      res.status(200).json({ message: 'Song updated successfully', updatedSong });
    } else {
      res.status(404).json({ error: 'Song not found' });
    }
  } catch (error) {
    console.error('Error updating song:', error);
    res.status(500).json({ error: 'Failed to update song' });
  }
};
