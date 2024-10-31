import Genre from '../models/genreModel.js'; // Adjust the path based on your project structure

// Get all genres
export const getGenres = async (req, res) => {
  try {
    const genres = await Genre.getAll();
    res.status(200).json(genres); // Respond with all genres
  } catch (error) {
    console.error('Error retrieving genres:', error);
    res.status(500).json({ error: 'Failed to retrieve genres' }); // Handle errors
  }
};

// Get genre by ID
export const getGenreById = async (req, res) => {
  const genreId = parseInt(req.params.id, 10); // Ensure genreId is an integer

  if (isNaN(genreId)) {
    return res.status(400).json({ message: 'Invalid genre ID' }); // Handle invalid ID
  }

  try {
    const genre = await Genre.getById(genreId); // Fetch genre by ID
    if (genre) {
      res.status(200).json(genre); // Send the genre data as a response
    } else {
      res.status(404).json({ message: 'Genre not found' }); // Genre not found
    }
  } catch (error) {
    console.error('Error retrieving genre:', error); // Log error for debugging
    res.status(500).json({ message: 'Server error' }); // Handle server error
  }
};

// Add a new genre
export const addGenre = async (req, res) => {
  const { genre_name } = req.body; // Destructure request body
  try {
    const newGenre = await Genre.create(genre_name); // Create new genre
    res.status(201).json(newGenre); // Respond with the created genre
  } catch (error) {
    console.error('Error adding genre:', error);
    res.status(500).json({ error: 'Failed to add genre' }); // Handle errors
  }
};

// Delete genre by ID
export const deleteGenre = async (req, res) => {
  const { id } = req.params; // Extract genre ID from request parameters
  try {
    const deletedGenre = await Genre.deleteById(id); // Delete genre by ID
    if (deletedGenre) {
      res.status(200).json({ message: 'Genre deleted successfully', deletedGenre }); // Success response
    } else {
      res.status(404).json({ error: 'Genre not found' }); // Genre not found
    }
  } catch (error) {
    console.error('Error deleting genre:', error);
    res.status(500).json({ error: 'Failed to delete genre' });
  }
};

// Update genre by ID
export const updateGenre = async (req, res) => {
  const { id } = req.params; // Extract genre ID from request parameters
  const { genre_name } = req.body; // Destructure request body
  try {
    const updatedGenre = await Genre.updateById(id, genre_name); // Update genre
    if (updatedGenre) {
      res.status(200).json({ message: 'Genre updated successfully', updatedGenre }); // Success response
    } else {
      res.status(404).json({ error: 'Genre not found' }); // Genre not found
    }
  } catch (error) {
    console.error('Error updating genre:', error);
    res.status(500).json({ error: 'Failed to update genre' }); // Handle errors
  }
};
