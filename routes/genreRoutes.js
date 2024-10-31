import express from 'express';
import { getGenres, addGenre, deleteGenre, updateGenre, getGenreById } from '../controllers/genreController.js';

const router = express.Router();

// To locally run, check out this URL: http://localhost:3000/api/genres
router.get('/genres', getGenres); // Get all genres
router.get('/genres/:id', getGenreById); // Get a specific genre by ID
router.post('/genres', addGenre); // Add a new genre
router.delete('/genres/:id', deleteGenre); // Delete a genre by ID
router.put('/genres/:id', updateGenre); // Update a genre by ID

export default router;
