import express from 'express';
import { getPlaylists, getPlaylistById, addPlaylist, deletePlaylist, updatePlaylist } from '../controllers/playlistController.js';

const router = express.Router();

// To locally run, check out this URL: http://localhost:3000/api/playlists
router.get('/playlists', getPlaylists); // Get all playlists
router.get('/playlists/:id', getPlaylistById); // Get a specific playlist by ID
router.post('/playlists', addPlaylist); // Add a new playlist
router.delete('/playlists/:id', deletePlaylist); // Delete a playlist by ID
router.put('/playlists/:id', updatePlaylist); // Update a playlist by ID

export default router;
