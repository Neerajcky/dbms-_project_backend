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
  const songId = req.params.id; // No need to parse as integer if using varchar ID

  try {
    const song = await Song.getById(songId); // Fetch song by ID
    if (song) {
      res.status(200).json(song); // Send the song data as a response
    } else {
      res.status(404).json({ message: 'Song not found' }); // Song not found
    }
  } catch (error) {
    console.error('Error retrieving song:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Add a new song
export const addSong = async (req, res) => {
  const { id, song_name, duration, artist_id, genre_id, release_date, no_of_times_played } = req.body; // Destructure request body

  try {
    const newSong = await Song.create({ id, song_name, duration, artist_id, genre_id, release_date, no_of_times_played }); // Create new song
    res.status(201).json(newSong); // Respond with the created song
  } catch (error) {
    console.error('Error adding song:', error);
    res.status(500).json({ error: 'Failed to add song' });
  }
};

// Delete song by ID
export const deleteSong = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedSong = await Song.deleteById(id); // Delete song by ID
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
    const updatedSong = await Song.updateById(id, { song_name, duration, artist_id, genre_id, release_date, no_of_times_played }); // Update song
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
