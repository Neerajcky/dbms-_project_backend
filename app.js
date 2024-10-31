import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import songRoutes from './routes/songRoutes.js';
import artistRoutes from './routes/artistRoutes.js';
import genreRoutes from './routes/genreRoutes.js';
import playlistRoutes from './routes/playlistRoutes.js';
import userRoutes from './routes/userRoutes.js'; 

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Use routes for each entity
app.use('/api', songRoutes);
app.use('/api', artistRoutes);
app.use('/api', genreRoutes);
app.use('/api', playlistRoutes);
app.use('/api', userRoutes); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
