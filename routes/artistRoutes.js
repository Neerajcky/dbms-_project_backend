import express from 'express';
import { getArtists, addArtist, deleteArtist, updateArtist, getArtistById } from '../controllers/artistController.js';

const router = express.Router();

// To locally run, check out this URL: http://localhost:3000/api/artists
router.get('/artists', getArtists);
router.get('/artists/:id', getArtistById); // Make sure this exists
router.post('/artists', addArtist);
router.delete('/artists/:id', deleteArtist); // DELETE route for deleting an artist by ID
router.put('/artists/:id', updateArtist); // PUT route for updating an artist by ID

export default router;
