import Playlist from '../models/playlistModel.js';

// Get all playlists
export const getPlaylists = async (req, res) => {
  try {
    const playlists = await Playlist.getAll();
    res.status(200).json(playlists);
  } catch (error) {
    console.error('Error retrieving playlists:', error);
    res.status(500).json({ error: 'Failed to retrieve playlists' });
  }
};

// Get a playlist by ID
export const getPlaylistById = async (req, res) => {
  const playlistId = parseInt(req.params.id, 10);

  if (isNaN(playlistId)) {
    return res.status(400).json({ message: 'Invalid playlist ID' });
  }

  try {
    const playlist = await Playlist.getById(playlistId);
    if (playlist) {
      res.status(200).json(playlist);
    } else {
      res.status(404).json({ message: 'Playlist not found' });
    }
  } catch (error) {
    console.error('Error retrieving playlist:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Add a new playlist
export const addPlaylist = async (req, res) => {
  const { playlists_name, user_id, creation_date, ispublic } = req.body;

  try {
    const newPlaylist = await Playlist.create({ playlists_name, user_id, creation_date, ispublic });
    res.status(201).json(newPlaylist);
  } catch (error) {
    console.error('Error adding playlist:', error);
    res.status(500).json({ error: 'Failed to add playlist' });
  }
};

// Delete playlist by ID
export const deletePlaylist = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPlaylist = await Playlist.deleteById(id);
    if (deletedPlaylist) {
      res.status(200).json({ message: 'Playlist deleted successfully', deletedPlaylist });
    } else {
      res.status(404).json({ error: 'Playlist not found' });
    }
  } catch (error) {
    console.error('Error deleting playlist:', error);
    res.status(500).json({ error: 'Failed to delete playlist' });
  }
};

// Update playlist by ID
export const updatePlaylist = async (req, res) => {
  const { id } = req.params;
  const { playlists_name, user_id, creation_date, ispublic } = req.body;

  try {
    const updatedPlaylist = await Playlist.updateById(id, { playlists_name, user_id, creation_date, ispublic });
    if (updatedPlaylist) {
      res.status(200).json({ message: 'Playlist updated successfully', updatedPlaylist });
    } else {
      res.status(404).json({ error: 'Playlist not found' });
    }
  } catch (error) {
    console.error('Error updating playlist:', error);
    res.status(500).json({ error: 'Failed to update playlist' });
  }
};
