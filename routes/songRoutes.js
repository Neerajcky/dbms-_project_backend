import express from 'express';
import { getSongs, addSong, deleteSong, updateSong, getSongById } from '../controllers/songController.js';

const router = express.Router();

// To locally run, check out this URL: http://localhost:3000/api/songs
router.get('/songs', getSongs); // Get all songs
router.get('/songs/:id', getSongById); // Get a specific song by ID
router.post('/songs', addSong); // Add a new song
router.delete('/songs/:id', deleteSong); // Delete a song by ID
router.put('/songs/:id', updateSong); // Update a song by ID

export default router;
