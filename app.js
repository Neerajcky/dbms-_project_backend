import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // Import cors
import songRoutes from './routes/songRoutes.js';
import artistRoutes from './routes/artistRoutes.js';
import genreRoutes from './routes/genreRoutes.js';

dotenv.config();
const app = express();

app.use(cors()); 
app.use(express.json()); 

// Use song routes
app.use('/api', songRoutes);
app.use('/api', artistRoutes);
app.use('/api', genreRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
