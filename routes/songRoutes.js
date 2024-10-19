import express from 'express';
import { getSongs, addSong } from '../controllers/songController.js'; // Use .js extension for ES modules

const router = express.Router();

// To locally run, check out this URL: http://localhost:3000/api/songs
router.get('/songs', getSongs);
router.post('/songs', addSong);

export default router;
