import Artist from '../models/artistModel.js';

// Get all artists
export const getArtists = async (req, res) => {
  try {
    const artists = await Artist.getAll();
    res.status(200).json(artists);
  } catch (error) {
    console.error('Error retrieving artists:', error);
    res.status(500).json({ error: 'Failed to retrieve artists' });
  }
};

export const getArtistById = async (req, res) => {
    const artistId = parseInt(req.params.id, 10); // Ensure artistId is an integer
  
    if (isNaN(artistId)) {
      return res.status(400).json({ message: 'Invalid artist ID' }); // Handle invalid ID
    }
  
    try {
      const artist = await Artist.getById(artistId); // Fetch artist by ID
      if (artist) {
        res.status(200).json(artist); // Send the artist data as a response
      } else {
        res.status(404).json({ message: 'Artist not found' }); // Artist not found
      }
    } catch (error) {
      console.error('Error retrieving artist:', error); // Log error for debugging
      res.status(500).json({ message: 'Server error' }); // Handle server error
    }
  };
  

// Add a new artist
export const addArtist = async (req, res) => {
  const { art_name, genre, dob, country, albums_released } = req.body; // Destructure request body
  try {
    const newArtist = await Artist.create(art_name, genre, dob, country, albums_released); // Create new artist
    res.status(201).json(newArtist); // Respond with the created artist
  } catch (error) {
    console.error('Error adding artist:', error);
    res.status(500).json({ error: 'Failed to add artist' }); // Handle errors
  }
};

// Delete artist by ID
export const deleteArtist = async (req, res) => {
  const { id } = req.params; // Extract artist ID from request parameters
  try {
    const deletedArtist = await Artist.deleteById(id); // Delete artist by ID
    if (deletedArtist) {
      res.status(200).json({ message: 'Artist deleted successfully', deletedArtist }); // Success response
    } else {
      res.status(404).json({ error: 'Artist not found' }); // Artist not found
    }
  } catch (error) {
    console.error('Error deleting artist:', error);
    res.status(500).json({ error: 'Failed to delete artist' }); // Handle errors
  }
};

// Update artist by ID
export const updateArtist = async (req, res) => {
  const { id } = req.params; // Extract artist ID from request parameters
  const { art_name, genre, dob, country, albums_released } = req.body; // Destructure request body
  try {
    const updatedArtist = await Artist.updateById(id, art_name, genre, dob, country, albums_released); // Update artist
    if (updatedArtist) {
      res.status(200).json({ message: 'Artist updated successfully', updatedArtist }); // Success response
    } else {
      res.status(404).json({ error: 'Artist not found' }); // Artist not found
    }
  } catch (error) {
    console.error('Error updating artist:', error);
    res.status(500).json({ error: 'Failed to update artist' }); // Handle errors
  }
};
